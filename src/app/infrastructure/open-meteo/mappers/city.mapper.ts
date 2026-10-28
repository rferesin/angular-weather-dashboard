import { City } from '../../../domain/entities/city';
import { Coordinates } from '../../../domain/value-objects/coordinates';
import { GeocodingResponseDto, GeocodingResultDto } from '../dto/geocoding-response.dto';

/** Traduz DTOs da API para entidades do domínio (a API nunca "vaza" para dentro). */
export class CityMapper {
  static toDomain(dto: GeocodingResultDto): City {
    return new City(
      dto.id,
      dto.name,
      dto.country ?? 'País desconhecido',
      (dto.country_code ?? '').toUpperCase(),
      dto.admin1 ?? null,
      new Coordinates(dto.latitude, dto.longitude),
      dto.timezone ?? 'auto',
    );
  }

  static toDomainList(response: GeocodingResponseDto): City[] {
    return (response.results ?? []).map((dto) => CityMapper.toDomain(dto));
  }
}
