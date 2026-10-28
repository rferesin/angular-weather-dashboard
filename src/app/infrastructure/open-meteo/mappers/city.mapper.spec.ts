import { CityMapper } from './city.mapper';

describe('CityMapper', () => {
  it('converte o DTO da API em entidade de domínio', () => {
    const city = CityMapper.toDomain({
      id: 1,
      name: 'Campinas',
      latitude: -22.9,
      longitude: -47.06,
      country: 'Brasil',
      country_code: 'br',
      admin1: 'São Paulo',
      timezone: 'America/Sao_Paulo',
    });

    expect(city.name).toBe('Campinas');
    expect(city.countryCode).toBe('BR');
    expect(city.region).toBe('São Paulo');
    expect(city.coordinates.latitude).toBe(-22.9);
  });

  it('devolve lista vazia quando a API não envia "results"', () => {
    expect(CityMapper.toDomainList({})).toEqual([]);
  });

  it('aplica valores padrão para campos opcionais ausentes', () => {
    const city = CityMapper.toDomain({ id: 2, name: 'Lugar', latitude: 1, longitude: 2 });

    expect(city.country).toBe('País desconhecido');
    expect(city.region).toBeNull();
    expect(city.timezone).toBe('auto');
  });
});
