import { TestBed } from '@angular/core/testing';

import { ResultadosPreguntaService } from './resultados-pregunta.service';

describe('ResultadosPreguntaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResultadosPreguntaService = TestBed.get(ResultadosPreguntaService);
    expect(service).toBeTruthy();
  });
});
