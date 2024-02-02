import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { AvionService } from '../services/avion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-aviones',
  templateUrl: './get-aviones.component.html',
  styleUrls: ['./get-aviones.component.css']
})
export class GetAvionesComponent implements OnInit {
  avionesArray: any[] = [];
  avionesFiltro: any[] = [];
  tiposAvion: any[] = [];

  matricula: string = '';
  estadoFiltro: boolean | null = null;
  listaFiltrada: boolean = false;

  constructor(private restService: RestService, private avionService: AvionService) {}

  ngOnInit(): void {
    this.getListAviones();
    this.getTiposAvion();
  }

  borrarFiltro() {
    this.matricula = '';
    this.estadoFiltro = null;
    this.avionesFiltro = this.aplicarFiltros();
    this.listaFiltrada = this.avionesFiltro.length > 0;
  }

  getListAviones() {
    this.restService.getAviones().subscribe(
      (info: any) => {
        this.avionesArray = info;
        this.avionesFiltro = [...info];
        this.avionesFiltro = this.aplicarFiltros();
      },
      (error) => {
        console.error('Error al obtener la lista de aviones', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener la lista de aviones',
          text: 'Hubo un problema al intentar obtener la lista de aviones.',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#808080',
        });
      }
    );
  }

  getTiposAvion() {
    this.restService.getTipoAvion().subscribe(
      (tipos: any) => {
        this.tiposAvion = tipos;
      },
      (error) => {
        console.error('Error al obtener los tipos de avión', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener los tipos de avión',
          text: 'Hubo un problema al intentar obtener los tipos de avión.',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#808080',
        });
      }
    );
  }

  aplicarFiltros(): any[] {
    let result = this.avionesArray;

    if (this.matricula) {
      result = result.filter(avion => avion.matricula.includes(this.matricula));
    }

    if (this.estadoFiltro !== null) {
      result = result.filter(avion => avion.estado === this.estadoFiltro);
    }

    return result;
  }

  filtrarAviones() {
    if (!this.matricula) {
      Swal.fire({
        icon: 'warning',
        title: 'La matrícula no puede estar vacía',
        text: 'Vuelva a ingresar la matrícula del avión.',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#808080',
      });
      this.avionesFiltro = this.aplicarFiltros();
      this.listaFiltrada = false;
    } else {
      this.restService.getAvionesPorMatricula(this.matricula).subscribe(
        (response: any) => {
          this.avionesFiltro = [response];
          this.listaFiltrada = this.avionesFiltro.length > 0; // Actualiza listaFiltrada según la longitud de avionesFiltro
        },
        (error) => {
          if (error.status === 500) {
            Swal.fire({
              icon: 'error',
              title: 'Avión no encontrado',
              text: `No se encontró ningún avión con la matrícula: ${this.matricula}`,
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
          this.avionesFiltro = this.aplicarFiltros();
          this.listaFiltrada = false;
        }
      );
    }
  }
  

  realizarAccionAvion(avion: any) {
    // Puedes implementar acciones específicas para los aviones si es necesario
    // ...
  }

  filtrarPorEstado(estado: boolean) {
    this.matricula = '';
    this.estadoFiltro = estado;
    this.avionesFiltro = this.aplicarFiltros();
    this.listaFiltrada = true;
  }

  filtrarPorTipoAvion(idTipoAvion: number) {
    this.restService.getAvionPorTipoAvion(idTipoAvion).subscribe(
      (response: any) => {
        this.avionesFiltro = response;
        this.listaFiltrada = true;
      },
      (error) => {
        console.error('Error al filtrar por tipo de avión', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al filtrar por tipo de avión',
          text: 'Hubo un problema al intentar filtrar por tipo de avión.',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#808080',
        });
      }
    );
  }
}
