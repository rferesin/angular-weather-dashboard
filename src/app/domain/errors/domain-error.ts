/**
 * Erro base do domínio.
 * Toda falha "esperada" da aplicação herda daqui e carrega uma mensagem
 * amigável (`userMessage`) que a camada de apresentação pode exibir direto.
 */
export abstract class DomainError extends Error {
  abstract readonly userMessage: string;

  protected constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = new.target.name;
  }
}
