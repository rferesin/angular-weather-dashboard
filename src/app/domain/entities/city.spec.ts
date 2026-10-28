import { aCity } from '../../../testing/city.factory';

describe('City', () => {
  it('monta o nome de exibição com a região', () => {
    expect(aCity().displayName).toBe('Campinas, São Paulo');
  });

  it('omite a região quando ela é igual ao nome', () => {
    expect(aCity({ name: 'Lisboa', region: 'Lisboa' }).displayName).toBe('Lisboa');
  });

  it('compara cidades pelo id', () => {
    expect(aCity({ id: 1 }).equals(aCity({ id: 1, name: 'Outro nome' }))).toBe(true);
    expect(aCity({ id: 1 }).equals(aCity({ id: 2 }))).toBe(false);
  });
});
