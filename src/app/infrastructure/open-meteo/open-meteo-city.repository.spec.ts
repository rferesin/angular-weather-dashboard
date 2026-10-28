import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { City } from '../../domain/entities/city';
import { NetworkError, ServiceUnavailableError } from '../../domain/errors/domain-errors';
import { API_CONFIG, DEFAULT_API_CONFIG } from '../config/api.config';
import { OpenMeteoCityRepository } from './open-meteo-city.repository';

describe('OpenMeteoCityRepository', () => {
  let repository: OpenMeteoCityRepository;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_CONFIG, useValue: DEFAULT_API_CONFIG },
        OpenMeteoCityRepository,
      ],
    });

    repository = TestBed.inject(OpenMeteoCityRepository);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  const searchUrl = `${DEFAULT_API_CONFIG.geocodingBaseUrl}/search`;

  it('envia os parâmetros esperados e converte a resposta em cidades', () => {
    const received: City[][] = [];

    repository.search('Campinas').subscribe((cities) => received.push(cities));

    const request = http.expectOne((req) => req.url === searchUrl);
    expect(request.request.params.get('name')).toBe('Campinas');
    expect(request.request.params.get('language')).toBe('pt');

    request.flush({
      results: [{ id: 1, name: 'Campinas', latitude: -22.9, longitude: -47.06, country: 'Brasil' }],
    });

    expect(received[0][0].name).toBe('Campinas');
  });

  it('devolve lista vazia quando a API não encontra nada', () => {
    const received: City[][] = [];

    repository.search('xyzxyz').subscribe((cities) => received.push(cities));
    http.expectOne((req) => req.url === searchUrl).flush({});

    expect(received[0]).toEqual([]);
  });

  it('converte falha de rede em NetworkError', () => {
    const errors: unknown[] = [];

    repository.search('Campinas').subscribe({ error: (error: unknown) => errors.push(error) });
    http.expectOne((req) => req.url === searchUrl).error(new ProgressEvent('error'));

    expect(errors[0]).toBeInstanceOf(NetworkError);
  });

  it('converte erro 500 em ServiceUnavailableError', () => {
    const errors: unknown[] = [];

    repository.search('Campinas').subscribe({ error: (error: unknown) => errors.push(error) });
    http
      .expectOne((req) => req.url === searchUrl)
      .flush('erro', { status: 500, statusText: 'Server Error' });

    expect(errors[0]).toBeInstanceOf(ServiceUnavailableError);
  });
});
