import { Pagination } from './pagination';

describe('Pagination', () => {
  const items = [1, 2, 3, 4, 5, 6, 7];

  it('calcula o total de páginas', () => {
    expect(new Pagination(items, 1, 3).totalPages).toBe(3);
  });

  it('devolve apenas os itens da página pedida', () => {
    expect(new Pagination(items, 2, 3).items).toEqual([4, 5, 6]);
    expect(new Pagination(items, 3, 3).items).toEqual([7]);
  });

  it('ajusta páginas fora do intervalo', () => {
    expect(new Pagination(items, 99, 3).page).toBe(3);
    expect(new Pagination(items, -5, 3).page).toBe(1);
  });

  it('lida com lista vazia', () => {
    const pagination = new Pagination<number>([], 1, 3);

    expect(pagination.totalPages).toBe(1);
    expect(pagination.items).toEqual([]);
    expect(pagination.hasNext).toBe(false);
    expect(pagination.hasPrevious).toBe(false);
  });
});
