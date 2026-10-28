import { Temperature } from './temperature';

describe('Temperature', () => {
  it('converte Celsius para Fahrenheit', () => {
    expect(Temperature.fromCelsius(0).toFahrenheit()).toBe(32);
    expect(Temperature.fromCelsius(100).toFahrenheit()).toBe(212);
  });

  it('devolve o valor na unidade solicitada', () => {
    const temperature = Temperature.fromCelsius(25);

    expect(temperature.valueIn('celsius')).toBe(25);
    expect(temperature.valueIn('fahrenheit')).toBe(77);
  });
});
