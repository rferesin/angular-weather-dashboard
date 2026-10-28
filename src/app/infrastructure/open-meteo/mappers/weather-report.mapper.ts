import { CurrentWeather } from '../../../domain/entities/current-weather';
import { DailyForecast } from '../../../domain/entities/daily-forecast';
import { WeatherReport } from '../../../domain/entities/weather-report';
import { Coordinates } from '../../../domain/value-objects/coordinates';
import { Temperature } from '../../../domain/value-objects/temperature';
import { WeatherCondition } from '../../../domain/value-objects/weather-condition';
import { ForecastResponseDto } from '../dto/forecast-response.dto';

export class WeatherReportMapper {
  static toDomain(dto: ForecastResponseDto): WeatherReport {
    const current = new CurrentWeather(
      Temperature.fromCelsius(dto.current.temperature_2m),
      Temperature.fromCelsius(dto.current.apparent_temperature),
      dto.current.relative_humidity_2m,
      dto.current.wind_speed_10m,
      WeatherCondition.fromWmoCode(dto.current.weather_code),
      dto.current.is_day === 1,
      // A API devolve "2026-10-28T21:00" (hora local da cidade, sem fuso).
      // Ao interpretar como local, preservamos o "relógio" da cidade na exibição.
      new Date(dto.current.time),
    );

    const daily = dto.daily.time.map(
      (isoDate, index) =>
        new DailyForecast(
          WeatherReportMapper.parseLocalDate(isoDate),
          WeatherCondition.fromWmoCode(dto.daily.weather_code[index]),
          Temperature.fromCelsius(dto.daily.temperature_2m_max[index]),
          Temperature.fromCelsius(dto.daily.temperature_2m_min[index]),
          dto.daily.precipitation_probability_max[index] ?? 0,
        ),
    );

    return new WeatherReport(
      new Coordinates(dto.latitude, dto.longitude),
      dto.timezone,
      current,
      daily,
    );
  }

  /** "2026-10-28" -> Date local à meia-noite (evita o deslocamento de fuso do `new Date(iso)`). */
  private static parseLocalDate(isoDate: string): Date {
    const [year, month, day] = isoDate.split('-').map(Number);
    return new Date(year, month - 1, day);
  }
}
