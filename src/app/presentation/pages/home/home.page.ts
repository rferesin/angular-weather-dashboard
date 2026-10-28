import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { CityListComponent } from '../../components/city-list.component';
import { CountryFilterComponent } from '../../components/country-filter.component';
import { ErrorMessageComponent } from '../../components/error-message.component';
import { PaginatorComponent } from '../../components/paginator.component';
import { SearchBarComponent } from '../../components/search-bar.component';
import { SpinnerComponent } from '../../components/spinner.component';
import { FavoritesStore } from '../../state/favorites.store';
import { SearchStore } from '../../state/search.store';

/** Página "container": conecta os stores aos componentes de apresentação. */
@Component({
  selector: 'app-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SearchBarComponent,
    CityListComponent,
    CountryFilterComponent,
    PaginatorComponent,
    SpinnerComponent,
    ErrorMessageComponent,
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
  protected readonly search = inject(SearchStore);
  protected readonly favorites = inject(FavoritesStore);
}
