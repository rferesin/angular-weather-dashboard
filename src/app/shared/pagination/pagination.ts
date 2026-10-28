/** Paginação em memória, genérica e sem dependência de framework. */
export class Pagination<T> {
  readonly page: number;
  readonly totalPages: number;
  readonly pageSize: number;

  constructor(
    private readonly all: readonly T[],
    requestedPage: number,
    pageSize: number,
  ) {
    this.pageSize = Math.max(1, Math.floor(pageSize));
    this.totalPages = Math.max(1, Math.ceil(all.length / this.pageSize));
    this.page = Math.min(Math.max(1, Math.floor(requestedPage)), this.totalPages);
  }

  get total(): number {
    return this.all.length;
  }

  get items(): readonly T[] {
    const start = (this.page - 1) * this.pageSize;
    return this.all.slice(start, start + this.pageSize);
  }

  get hasPrevious(): boolean {
    return this.page > 1;
  }

  get hasNext(): boolean {
    return this.page < this.totalPages;
  }
}
