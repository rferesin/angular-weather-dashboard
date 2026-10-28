/** Formato EXATO da resposta da API de geocodificação (contrato externo). */
export interface GeocodingResultDto {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  country_code?: string;
  admin1?: string;
  timezone?: string;
}

export interface GeocodingResponseDto {
  /** Ausente quando nenhuma cidade é encontrada. */
  results?: GeocodingResultDto[];
}
