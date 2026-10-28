export type TemperatureUnit = 'celsius' | 'fahrenheit';

/**
 * Value Object: temperatura imutável.
 * Guarda o valor em Celsius e sabe se converter para outras unidades.
 */
export class Temperature {
  private constructor(private readonly celsius: number) {}

  static fromCelsius(value: number): Temperature {
    return new Temperature(value);
  }

  toCelsius(): number {
    return this.celsius;
  }

  toFahrenheit(): number {
    return (this.celsius * 9) / 5 + 32;
  }

  valueIn(unit: TemperatureUnit): number {
    return unit === 'celsius' ? this.toCelsius() : this.toFahrenheit();
  }
}
