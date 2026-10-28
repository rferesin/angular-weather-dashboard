import { ForecastResponseDto } from '../dto/forecast-response.dto';
import { WeatherReportMapper } from './weather-report.mapper';

const response: ForecastResponseDto = {
  latitude: -22.9,
  longitude: -47.06,
  timezone: 'America/Sao_Paulo',
  current: {
    time: '2026-10-28T21:00',
    temperature_2m: 22.4,
    relative_humidity_2m: 71,
    apparent_temperature: 23.1,
    weather_code: 2,
    wind_speed_10m: 9.8,
    is_day: 0,
  },
  daily: {
    time: ['2026-10-28', '2026-10-29'],
    weather_code: [2, 95],
    temperature_2m_max: [29, 31],
    temperature_2m_min: [18, 19],
    precipitation_probability_max: [10, null],
  },
};

describe('WeatherReportMapper', () => {
  const report = WeatherReportMapper.toDomain(response);

  it('mapeia o clima atual', () => {
    expect(report.current.temperature.toCelsius()).toBe(22.4);
    expect(report.current.condition.category).toBe('partly-cloudy');
    expect(report.current.isDay).toBe(false);
  });

  it('mapeia um item de previsão por dia', () => {
    expect(report.daily).toHaveLength(2);
    expect(report.daily[1].condition.category).toBe('thunderstorm');
  });

  it('interpreta a data como dia local (sem deslocamento de fuso)', () => {
    expect(report.daily[0].date.getDate()).toBe(28);
    expect(report.daily[0].date.getMonth()).toBe(9);
  });

  it('trata probabilidade de chuva nula como 0', () => {
    expect(report.daily[1].precipitationProbabilityPercent).toBe(0);
  });

  it('encontra o dia mais quente', () => {
    expect(report.hottestDay?.max.toCelsius()).toBe(31);
  });
});
