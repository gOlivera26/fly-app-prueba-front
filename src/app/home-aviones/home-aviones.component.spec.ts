import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAvionesComponent } from './home-aviones.component';

describe('HomeAvionesComponent', () => {
  let component: HomeAvionesComponent;
  let fixture: ComponentFixture<HomeAvionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeAvionesComponent]
    });
    fixture = TestBed.createComponent(HomeAvionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
