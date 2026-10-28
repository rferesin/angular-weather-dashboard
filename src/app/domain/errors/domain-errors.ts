import { DomainError } from './domain-error';

export class InvalidCoordinatesError extends DomainError {
  readonly userMessage = 'As coordenadas informadas são inválidas.';

  constructor(latitude: number, longitude: number) {
    super(`Invalid coordinates: ${latitude}, ${longitude}`);
  }
}

export class CityNotFoundError extends DomainError {
  readonly userMessage = 'Não foi possível identificar a cidade deste link. Faça uma nova busca.';

  constructor() {
    super('City could not be resolved from the route');
  }
}

export class NetworkError extends DomainError {
  readonly userMessage = 'Sem conexão com o serviço. Verifique sua internet e tente novamente.';

  constructor(options?: ErrorOptions) {
    super('Network request failed', options);
  }
}

export class ServiceUnavailableError extends DomainError {
  readonly userMessage = 'O serviço de clima está indisponível no momento. Tente novamente em instantes.';

  constructor(options?: ErrorOptions) {
    super('Weather service unavailable', options);
  }
}

export class UnexpectedError extends DomainError {
  readonly userMessage = 'Ocorreu um erro inesperado. Tente novamente.';

  constructor(options?: ErrorOptions) {
    super('Unexpected error', options);
  }
}
