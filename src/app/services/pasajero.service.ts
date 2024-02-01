import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasajeroService {

  constructor() { }

  private pasajeroSubject = new BehaviorSubject<any[]>([]);
  pasajeros$: Observable<any[]> = this.pasajeroSubject.asObservable();

  getPasajeros(): any[] {
    console.log(this.pasajeroSubject.value);
    return this.pasajeroSubject.value;
  }

}
