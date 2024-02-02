import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAvionesComponent } from './get-aviones.component';

describe('GetAvionesComponent', () => {
  let component: GetAvionesComponent;
  let fixture: ComponentFixture<GetAvionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetAvionesComponent]
    });
    fixture = TestBed.createComponent(GetAvionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
