import { DomainError } from '../../domain/errors/domain-error';

/** Transforma qualquer erro em texto seguro para exibir ao usuário. */
export function toUserMessage(error: unknown): string {
  return error instanceof DomainError ? error.userMessage : 'Ocorreu um erro inesperado.';
}
