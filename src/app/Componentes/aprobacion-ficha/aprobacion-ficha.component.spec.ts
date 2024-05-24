import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobacionFichaComponent } from './aprobacion-ficha.component';

describe('AprobacionFichaComponent', () => {
  let component: AprobacionFichaComponent;
  let fixture: ComponentFixture<AprobacionFichaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AprobacionFichaComponent]
    });
    fixture = TestBed.createComponent(AprobacionFichaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
