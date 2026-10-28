import { Injectable, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Subject,
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  merge,
  of,
  switchMap,
  tap,
} from 'rxjs';

import { SearchCitiesUseCase } from '../../application/use-cases/search-cities.use-case';
import { CityCollection } from '../../domain/collections/city-collection';
import { City } from '../../domain/entities/city';
import { Pagination } from '../../shared/pagination/pagination';
import { LoadStatus } from './load-status';
import { toUserMessage } from './to-user-message';

type SearchOutcome =
  | { kind: 'idle' }
  | { kind: 'success'; cities: City[] }
  | { kind: 'error'; message: string };

/**
 * Estado da tela de busca: texto digitado, resultados, filtro por país e página atual.
 * O fluxo assíncrono usa RxJS (debounce + switchMap); o estado exposto usa Signals.
 */
@Injectable({ providedIn: 'root' })
export class SearchStore {
  static readonly PAGE_SIZE = 6;
  private static readonly DEBOUNCE_MS = 350;

  private readonly searchCities = inject(SearchCitiesUseCase);

  private readonly typed$ = new Subject<string>();
  private readonly retried$ = new Subject<void>();

  private readonly _query = signal('');
  private readonly _status = signal<LoadStatus>('idle');
  private readonly _error = signal<string | null>(null);
  private readonly _results = signal(new CityCollection());
  private readonly _countryFilter = signal<string | null>(null);
  private readonly _page = signal(1);

  readonly query = this._query.asReadonly();
  readonly status = this._status.asReadonly();
  readonly error = this._error.asReadonly();
  readonly countryFilter = this._countryFilter.asReadonly();

  readonly countries = computed(() => this._results().countries());
  readonly filtered = computed(() => this._results().filterByCountry(this._countryFilter()));
  readonly pagination = computed(
    () => new Pagination(this.filtered().items, this._page(), SearchStore.PAGE_SIZE),
  );
  readonly hasNoResults = computed(
    () => this._status() === 'success' && this._results().size === 0,
  );

  constructor() {
    const fromTyping$ = this.typed$.pipe(
      map((text) => text.trim()),
      debounceTime(SearchStore.DEBOUNCE_MS),
      distinctUntilChanged(),
    );
    const fromRetry$ = this.retried$.pipe(map(() => this._query().trim()));

    merge(fromTyping$, fromRetry$)
      .pipe(
        tap((query) => this.beginSearch(query)),
        switchMap((query) => this.runSearch(query)),
        takeUntilDestroyed(),
      )
      .subscribe((outcome) => this.finishSearch(outcome));
  }

  setQuery(text: string): void {
    this._query.set(text);
    this.typed$.next(text);
  }

  retry(): void {
    this.retried$.next();
  }

  setCountryFilter(countryKey: string | null): void {
    this._countryFilter.set(countryKey);
    this._page.set(1);
  }

  goToPage(page: number): void {
    this._page.set(page);
  }

  private isSearchable(query: string): boolean {
    return query.length >= SearchCitiesUseCase.MIN_QUERY_LENGTH;
  }

  private beginSearch(query: string): void {
    this._error.set(null);
    this._status.set(this.isSearchable(query) ? 'loading' : 'idle');
  }

  private runSearch(query: string) {
    if (!this.isSearchable(query)) {
      return of<SearchOutcome>({ kind: 'idle' });
    }

    return this.searchCities.execute(query).pipe(
      map((cities): SearchOutcome => ({ kind: 'success', cities })),
      catchError((error: unknown) =>
        of<SearchOutcome>({ kind: 'error', message: toUserMessage(error) }),
      ),
    );
  }

  private finishSearch(outcome: SearchOutcome): void {
    this._countryFilter.set(null);
    this._page.set(1);

    switch (outcome.kind) {
      case 'idle':
        this._results.set(new CityCollection());
        this._status.set('idle');
        break;
      case 'success':
        this._results.set(new CityCollection(outcome.cities));
        this._status.set('success');
        break;
      case 'error':
        this._results.set(new CityCollection());
        this._error.set(outcome.message);
        this._status.set('error');
        break;
    }
  }
}
