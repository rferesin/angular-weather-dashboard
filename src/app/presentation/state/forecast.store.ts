import { Injectable, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, catchError, map, of, switchMap, tap } from 'rxjs';

import { GetWeatherReportUseCase } from '../../application/use-cases/get-weather-report.use-case';
import { City } from '../../domain/entities/city';
import { WeatherReport } from '../../domain/entities/weather-report';
import { LoadStatus } from './load-status';
import { toUserMessage } from './to-user-message';

type ForecastOutcome =
  | { kind: 'success'; report: WeatherReport }
  | { kind: 'error'; message: string };

/**
 * Estado da tela de previsão. NÃO é `providedIn: 'root'`: cada ForecastPage
 * declara o seu em `providers`, então o estado nasce e morre com a página.
 */
@Injectable()
export class ForecastStore {
  private readonly getWeatherReport = inject(GetWeatherReportUseCase);
  private readonly cityToLoad$ = new Subject<City>();

  private readonly _city = signal<City | null>(null);
  private readonly _report = signal<WeatherReport | null>(null);
  private readonly _status = signal<LoadStatus>('idle');
  private readonly _error = signal<string | null>(null);

  readonly city = this._city.asReadonly();
  readonly report = this._report.asReadonly();
  readonly status = this._status.asReadonly();
  readonly error = this._error.asReadonly();

  constructor() {
    this.cityToLoad$
      .pipe(
        tap((city) => {
          this._city.set(city);
          this._report.set(null);
          this._error.set(null);
          this._status.set('loading');
        }),
        switchMap((city) =>
          this.getWeatherReport.execute(city).pipe(
            map((report): ForecastOutcome => ({ kind: 'success', report })),
            catchError((error: unknown) =>
              of<ForecastOutcome>({ kind: 'error', message: toUserMessage(error) }),
            ),
          ),
        ),
        takeUntilDestroyed(),
      )
      .subscribe((outcome) => {
        if (outcome.kind === 'success') {
          this._report.set(outcome.report);
          this._status.set('success');
        } else {
          this._error.set(outcome.message);
          this._status.set('error');
        }
      });
  }

  load(city: City): void {
    this.cityToLoad$.next(city);
  }

  reload(): void {
    const city = this._city();
    if (city) {
      this.load(city);
    }
  }

  fail(message: string): void {
    this._error.set(message);
    this._status.set('error');
  }
}
