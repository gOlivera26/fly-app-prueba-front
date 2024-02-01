import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetClientesComponent } from './get-clientes.component';

describe('GetClientesComponent', () => {
  let component: GetClientesComponent;
  let fixture: ComponentFixture<GetClientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetClientesComponent]
    });
    fixture = TestBed.createComponent(GetClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
