import { aCity } from '../../../testing/city.factory';
import { CityCollection } from './city-collection';

describe('CityCollection', () => {
  const collection = new CityCollection([
    aCity({ id: 1, name: 'Paris', country: 'França', countryCode: 'FR' }),
    aCity({ id: 2, name: 'Paris', country: 'Estados Unidos', countryCode: 'US' }),
    aCity({ id: 3, name: 'Lyon', country: 'França', countryCode: 'FR' }),
  ]);

  it('lista países sem repetição e em ordem alfabética', () => {
    expect(collection.countries().map((country) => country.name)).toEqual([
      'Estados Unidos',
      'França',
    ]);
  });

  it('filtra por país', () => {
    const filtered = collection.filterByCountry('FR');

    expect(filtered.items.map((city) => city.id)).toEqual([1, 3]);
  });

  it('sem filtro, devolve a coleção completa', () => {
    expect(collection.filterByCountry(null).size).toBe(3);
  });

  it('não altera a coleção original ao filtrar (imutabilidade)', () => {
    collection.filterByCountry('US');

    expect(collection.size).toBe(3);
  });
});
