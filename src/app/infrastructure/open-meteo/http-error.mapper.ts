import { HttpErrorResponse } from '@angular/common/http';

import { DomainError } from '../../domain/errors/domain-error';
import {
  NetworkError,
  ServiceUnavailableError,
  UnexpectedError,
} from '../../domain/errors/domain-errors';

/** Converte erros técnicos de HTTP em erros de domínio com mensagem amigável. */
export class HttpErrorMapper {
  static toDomainError(error: unknown): DomainError {
    if (error instanceof DomainError) {
      return error;
    }

    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        return new NetworkError({ cause: error });
      }

      if (error.status === 429 || error.status >= 500) {
        return new ServiceUnavailableError({ cause: error });
      }
    }

    return new UnexpectedError({ cause: error });
  }
}
