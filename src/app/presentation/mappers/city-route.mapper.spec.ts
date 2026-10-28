import { convertToParamMap } from '@angular/router';

import { aCity } from '../../../testing/city.factory';
import { CityRouteMapper } from './city-route.mapper';

describe('CityRouteMapper', () => {
  it('faz o "round-trip" City -> URL -> City', () => {
    const original = aCity({ id: 42 });
    const query = convertToParamMap(
      Object.fromEntries(
        Object.entries(CityRouteMapper.toQueryParams(original)).map(([key, value]) => [
          key,
          String(value),
        ]),
      ),
    );

    const restored = CityRouteMapper.fromRoute('42', query);

    expect(restored?.equals(original)).toBe(true);
    expect(restored?.coordinates.latitude).toBe(original.coordinates.latitude);
  });

  it('devolve null quando faltam parâmetros', () => {
    expect(CityRouteMapper.fromRoute('42', convertToParamMap({}))).toBeNull();
  });

  it('devolve null quando as coordenadas são inválidas', () => {
    const query = convertToParamMap({
      name: 'X',
      country: 'Y',
      tz: 'auto',
      lat: '999',
      lon: '0',
    });

    expect(CityRouteMapper.fromRoute('1', query)).toBeNull();
  });
});
