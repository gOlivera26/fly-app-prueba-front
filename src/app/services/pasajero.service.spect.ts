import { TestBed } from '@angular/core/testing';

import { PasajeroService } from './pasajero.service';

describe('ClienteService', () => {
  let service: PasajeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasajeroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
