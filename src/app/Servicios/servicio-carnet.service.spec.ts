import { TestBed } from '@angular/core/testing';

import { ServicioCarnetService } from './servicio-carnet.service';

describe('ServicioCarnetService', () => {
  let service: ServicioCarnetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioCarnetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
