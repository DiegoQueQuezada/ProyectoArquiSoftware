import { TestBed } from '@angular/core/testing';

import { AutInterceptadorService } from './guardia-interceptador.service';

describe('AutInterceptadorService', () => {
  let service: AutInterceptadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutInterceptadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
