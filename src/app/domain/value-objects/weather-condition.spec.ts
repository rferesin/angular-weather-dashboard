import { WeatherCondition } from './weather-condition';

describe('WeatherCondition', () => {
  it('traduz um código WMO conhecido', () => {
    const condition = WeatherCondition.fromWmoCode(63);

    expect(condition.category).toBe('rain');
    expect(condition.description).toBe('Chuva moderada');
  });

  it('usa a categoria "unknown" para códigos desconhecidos', () => {
    const condition = WeatherCondition.fromWmoCode(1234);

    expect(condition.category).toBe('unknown');
    expect(condition.code).toBe(1234);
  });
});
