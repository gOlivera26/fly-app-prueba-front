import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePasajeroComponent } from './create-pasajero.component';

describe('CreatePasajeroComponent', () => {
  let component: CreatePasajeroComponent;
  let fixture: ComponentFixture<CreatePasajeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePasajeroComponent]
    });
    fixture = TestBed.createComponent(CreatePasajeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
