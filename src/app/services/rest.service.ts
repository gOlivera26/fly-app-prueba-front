import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  private urlPasajero = 'http://localhost:8081/pasajero';
  constructor(private httpClient: HttpClient) { }

  public getPasajeros(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.urlPasajero}/getAllPasajeros`);
  }

  public getPasajerosPorNumeroDocumento(numeroDoc: string): Observable<any[]> {
    return this.httpClient.get<any[]>(
      `${this.urlPasajero}/getPasajeroByNroDoc/${numeroDoc}`
    );
  }
  public actualizarEstadoPasajero(numeroDoc: any): Observable<any> {
    return this.httpClient.put<any>(
      `${this.urlPasajero}/cambiarEstado/${numeroDoc}`, null
    );
    }

    public getPasajerosPorEstado(estado: boolean): Observable<any[]> {
      return this.httpClient.get<any[]>(
        `${this.urlPasajero}/getPasajeroByEstado/${estado}`
      );
    }
    public postPasajero(pasajero: any): Observable<any> {
      return this.httpClient.post<any>(
        `${this.urlPasajero}/createPasajero`, pasajero
      );
    }
    public getTipoDocumento(): Observable<any[]> {
      return this.httpClient.get<any[]>(
        `${this.urlPasajero}/getAllTipoDocumento`
      );
    }
    public numeroDocumentoExist(numeroDoc: string): Observable<boolean> {
      return this.httpClient.get<boolean>(
        `${this.urlPasajero}/numeroDocumentoExist/${numeroDoc}`
      );
    }
    public emailExist(email: string): Observable<boolean> {
      return this.httpClient.get<boolean>(
        `${this.urlPasajero}/emailExist/${email}`
      );
    }
}
