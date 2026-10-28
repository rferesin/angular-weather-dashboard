import { Coordinates } from '../value-objects/coordinates';

/**
 * Entidade: cidade encontrada na busca.
 * A identidade é o `id` (vindo do serviço de geocodificação).
 */
export class City {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly country: string,
    readonly countryCode: string,
    readonly region: string | null,
    readonly coordinates: Coordinates,
    readonly timezone: string,
  ) {}

  /** "Campinas, São Paulo" ou apenas "Lisboa" quando região e nome coincidem. */
  get displayName(): string {
    return this.region && this.region !== this.name ? `${this.name}, ${this.region}` : this.name;
  }

  /** Chave usada para agrupar/filtrar por país. */
  get countryKey(): string {
    return this.countryCode || this.country;
  }

  equals(other: City): boolean {
    return this.id === other.id;
  }
}
