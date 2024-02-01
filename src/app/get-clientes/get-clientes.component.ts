import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-clientes',
  templateUrl: './get-clientes.component.html',
  styleUrls: ['./get-clientes.component.css']
})
export class GetClientesComponent implements OnInit {
  pasajeroArray: any[] = [];
  pasajeroFiltro: any[] = [];

  numeroDoc: string = '';
  estadoFiltro: boolean | null = null; //Almacena el estado del filtro
  listaFiltrada: boolean = false;

  constructor(private restService: RestService) {}

  ngOnInit(): void {
    this.getListPasajeros();
  }

  borrarFiltro() {
    this.numeroDoc = '';
    this.estadoFiltro = null; 
    this.pasajeroFiltro = this.aplicarFiltros(); 
    this.listaFiltrada = false;
  }

  getListPasajeros() {
    this.restService.getPasajeros().subscribe(
      (info: any) => {
        this.pasajeroArray = info;
        this.pasajeroFiltro = [...info];
        this.pasajeroFiltro = this.aplicarFiltros();
      },
      (error) => {
        console.error('Error al obtener la lista de pasajeros', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener la lista de pasajeros',
          text: 'Hubo un problema al intentar obtener la lista de pasajeros.',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#808080',
        });
      }
    );
  }

  aplicarFiltros(): any[] {
    let result = this.pasajeroArray;

    if (this.numeroDoc) {
      // Filtrar por número de documento
      result = result.filter(pasajero => pasajero.numeroDocumento.includes(this.numeroDoc));
    }

    if (this.estadoFiltro !== null) {
      // Filtrar por estado
      result = result.filter(pasajero => pasajero.estado === this.estadoFiltro);
    }

    return result;
  }

  filtrarPersonas() {
    if (!this.numeroDoc) {
      Swal.fire({
        icon: 'warning',
        title: 'El número de documento no puede estar vacío',
        text: 'Vuelva a ingresar el número de documento del cliente.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#808080',
      });
      this.pasajeroFiltro = this.aplicarFiltros(); 
      this.listaFiltrada = false;
    } else if (this.numeroDoc === '0') {
      Swal.fire({
        icon: 'error',
        title: 'El número de documento no puede ser 0',
        text: 'Vuelva a ingresar el número de documento del cliente.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#808080',
      });
      this.pasajeroFiltro = this.aplicarFiltros(); 
      this.listaFiltrada = false;
    } else {
      this.restService.getPasajerosPorNumeroDocumento(this.numeroDoc).subscribe(
        (response: any) => {
          this.pasajeroFiltro = [response];
          this.listaFiltrada = true;
        },
        (error) => {
          if (error.status === 500) {
            Swal.fire({
              icon: 'error',
              title: 'Pasajero no encontrado',
              text: `No se encontró ningún pasajero con el número de documento: ${this.numeroDoc}`,
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#808080',
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error desconocido',
              text: 'Se produjo un error desconocido. Por favor, inténtelo de nuevo más tarde.',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#808080',
            });
          }
          this.pasajeroFiltro = this.aplicarFiltros(); 
          this.listaFiltrada = false;
        }
      );
    }
  }

  actualizarEstadoPasajero(pasajero: any) {
    // Llamada al servicio o método para actualizar el estado del pasajero
    this.restService.actualizarEstadoPasajero(pasajero.numeroDocumento).subscribe(
      (response: any) => {
        // Actualizar la lista de pasajeros después de la actualización del estado
        this.getListPasajeros();
      },
      (error) => {
        console.error('Error al actualizar el estado del pasajero', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar el estado del pasajero',
          text: 'Hubo un problema al intentar actualizar el estado del pasajero.',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#808080',
        });
      }
    );
  }

  filtrarPorEstado(estado: boolean) {
    this.numeroDoc = '';
    this.estadoFiltro = estado; // Establecer el filtro de estado
    this.pasajeroFiltro = this.aplicarFiltros();
    this.listaFiltrada = true;
  }
}
