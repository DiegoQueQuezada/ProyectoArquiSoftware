import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCarnetsComponent } from './lista-carnets.component';

describe('ListaCarnetsComponent', () => {
  let component: ListaCarnetsComponent;
  let fixture: ComponentFixture<ListaCarnetsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaCarnetsComponent]
    });
    fixture = TestBed.createComponent(ListaCarnetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
