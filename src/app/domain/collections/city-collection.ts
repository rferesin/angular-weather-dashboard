import { City } from '../entities/city';

export interface CountryOption {
  readonly code: string;
  readonly name: string;
}

/** Coleção imutável de cidades com regras de consulta (países disponíveis, filtro por país). */
export class CityCollection {
  constructor(readonly items: readonly City[] = []) {}

  get size(): number {
    return this.items.length;
  }

  /** Países presentes na coleção, sem repetição e em ordem alfabética. */
  countries(): CountryOption[] {
    const byKey = new Map<string, CountryOption>();

    for (const city of this.items) {
      if (!byKey.has(city.countryKey)) {
        byKey.set(city.countryKey, { code: city.countryKey, name: city.country });
      }
    }

    return [...byKey.values()].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
  }

  filterByCountry(countryKey: string | null): CityCollection {
    if (!countryKey) {
      return this;
    }

    return new CityCollection(this.items.filter((city) => city.countryKey === countryKey));
  }
}
