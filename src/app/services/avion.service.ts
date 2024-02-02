import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject,of, debounceTime, switchMap,catchError } from 'rxjs';
import { RestService } from './rest.service';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AvionService {

  constructor(private restService: RestService) { }

  private avionSubject = new BehaviorSubject<any[]>([]);
  aviones$: Observable<any[]> = this.avionSubject.asObservable();

  private tipoAvionSubject = new BehaviorSubject<any[]>([]);
  tipoAvion$: Observable<any[]> = this.tipoAvionSubject.asObservable();

  getAviones():any[]{
    console.log(this.avionSubject.value);
    return this.avionSubject.value;
  }

  agregarAviones(avion: any){
    const aviones = this.avionSubject.value;
    aviones.push(avion);
    this.avionSubject.next(aviones);
  }

  agregarTipoAvion(tipoAvion: any){
    const aviones = this.tipoAvionSubject.value;
    aviones.push(tipoAvion);
    this.tipoAvionSubject.next(aviones);
  }

}
