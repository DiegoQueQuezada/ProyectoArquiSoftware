import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCarnetComponent } from './detalle-carnet.component';

describe('DetalleCarnetComponent', () => {
  let component: DetalleCarnetComponent;
  let fixture: ComponentFixture<DetalleCarnetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleCarnetComponent]
    });
    fixture = TestBed.createComponent(DetalleCarnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
