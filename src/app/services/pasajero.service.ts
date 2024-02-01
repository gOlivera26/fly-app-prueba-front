import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, debounceTime, switchMap, map, catchError } from 'rxjs';
import { RestService } from './rest.service';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PasajeroService {

  constructor(private restService: RestService) { }

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

 numeroDocumentoValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return of(control.value).pipe(
      debounceTime(300),
      switchMap(value => this.restService.numeroDocumentoExist(value)),
      map(res => (res ? { numeroDocumentoExist: true } : null)),
      catchError(() => of(null))
    );
  };
}

emailValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return of(control.value).pipe(
      debounceTime(300),
      switchMap(value => this.restService.emailExist(value)),
      map(res => (res ? { emailExist: true } : null)),
      catchError(() => of(null))
    );
  };
}

}
