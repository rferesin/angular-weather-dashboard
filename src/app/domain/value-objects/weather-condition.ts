export type WeatherCategory =
  | 'clear'
  | 'partly-cloudy'
  | 'cloudy'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'snow'
  | 'thunderstorm'
  | 'unknown';

interface ConditionEntry {
  readonly category: WeatherCategory;
  readonly description: string;
}

/**
 * Value Object: condição do tempo.
 * Traduz o código WMO (padrão da Organização Meteorológica Mundial, usado pela
 * Open-Meteo) para uma categoria e uma descrição em português.
 * O domínio NÃO conhece ícones — isso é responsabilidade da apresentação.
 */
export class WeatherCondition {
  private static readonly CATALOG: ReadonlyMap<number, ConditionEntry> = new Map<number, ConditionEntry>([
    [0, { category: 'clear', description: 'Céu limpo' }],
    [1, { category: 'clear', description: 'Predominantemente limpo' }],
    [2, { category: 'partly-cloudy', description: 'Parcialmente nublado' }],
    [3, { category: 'cloudy', description: 'Nublado' }],
    [45, { category: 'fog', description: 'Neblina' }],
    [48, { category: 'fog', description: 'Neblina com geada' }],
    [51, { category: 'drizzle', description: 'Garoa leve' }],
    [53, { category: 'drizzle', description: 'Garoa moderada' }],
    [55, { category: 'drizzle', description: 'Garoa intensa' }],
    [56, { category: 'drizzle', description: 'Garoa congelante leve' }],
    [57, { category: 'drizzle', description: 'Garoa congelante intensa' }],
    [61, { category: 'rain', description: 'Chuva leve' }],
    [63, { category: 'rain', description: 'Chuva moderada' }],
    [65, { category: 'rain', description: 'Chuva forte' }],
    [66, { category: 'rain', description: 'Chuva congelante leve' }],
    [67, { category: 'rain', description: 'Chuva congelante forte' }],
    [71, { category: 'snow', description: 'Neve leve' }],
    [73, { category: 'snow', description: 'Neve moderada' }],
    [75, { category: 'snow', description: 'Neve forte' }],
    [77, { category: 'snow', description: 'Grãos de neve' }],
    [80, { category: 'rain', description: 'Pancadas de chuva leves' }],
    [81, { category: 'rain', description: 'Pancadas de chuva moderadas' }],
    [82, { category: 'rain', description: 'Pancadas de chuva violentas' }],
    [85, { category: 'snow', description: 'Pancadas de neve leves' }],
    [86, { category: 'snow', description: 'Pancadas de neve fortes' }],
    [95, { category: 'thunderstorm', description: 'Trovoada' }],
    [96, { category: 'thunderstorm', description: 'Trovoada com granizo leve' }],
    [99, { category: 'thunderstorm', description: 'Trovoada com granizo forte' }],
  ]);

  private constructor(
    readonly code: number,
    readonly category: WeatherCategory,
    readonly description: string,
  ) {}

  static fromWmoCode(code: number): WeatherCondition {
    const entry = WeatherCondition.CATALOG.get(code);

    return entry
      ? new WeatherCondition(code, entry.category, entry.description)
      : new WeatherCondition(code, 'unknown', 'Condição desconhecida');
  }
}
