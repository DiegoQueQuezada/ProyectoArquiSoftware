import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaPersonaComponent } from './ficha-persona.component';

describe('FichaPersonaComponent', () => {
  let component: FichaPersonaComponent;
  let fixture: ComponentFixture<FichaPersonaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FichaPersonaComponent]
    });
    fixture = TestBed.createComponent(FichaPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
