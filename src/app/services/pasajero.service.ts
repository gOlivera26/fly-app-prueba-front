import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasajeroService {

  constructor() { }

  private pasajeroSubject = new BehaviorSubject<any[]>([]);
  pasajeros$: Observable<any[]> = this.pasajeroSubject.asObservable();

  private tipoDocSubject = new BehaviorSubject<any[]>([]);
  tipoDoc$: Observable<any[]> = this.pasajeroSubject.asObservable();

  getPasajeros(): any[] {
    console.log(this.pasajeroSubject.value);
    return this.pasajeroSubject.value;
  }

  agregarPasajero(pasajero: any){
    const pasajeros = this.pasajeroSubject.value;
    pasajeros.push(pasajero);
    this.pasajeroSubject.next(pasajeros);
  }
 agregarTipoDocumento(tipoDoc: any){
   let tipoDocs = this.tipoDocSubject.value;
   tipoDocs.push(tipoDoc);
   this.tipoDocSubject.next(tipoDocs);
 }
}
