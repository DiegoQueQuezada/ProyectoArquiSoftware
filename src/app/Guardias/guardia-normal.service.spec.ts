import { TestBed } from '@angular/core/testing';

import { GuardiaNormal } from './guardia-normal.service';

describe('GuardiaNormalService', () => {
  let service: GuardiaNormal;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardiaNormal);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
