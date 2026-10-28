import { InvalidCoordinatesError } from '../errors/domain-errors';
import { Coordinates } from './coordinates';

describe('Coordinates', () => {
  it('aceita valores dentro dos limites', () => {
    const coordinates = new Coordinates(-22.9, -47.06);

    expect(coordinates.latitude).toBe(-22.9);
    expect(coordinates.longitude).toBe(-47.06);
  });

  it('rejeita latitude fora do intervalo', () => {
    expect(() => new Coordinates(91, 0)).toThrow(InvalidCoordinatesError);
  });

  it('rejeita longitude inválida', () => {
    expect(() => new Coordinates(0, Number.NaN)).toThrow(InvalidCoordinatesError);
  });
});
