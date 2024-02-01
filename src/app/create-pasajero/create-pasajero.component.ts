import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pasajero } from '../models/pasajero';
import { PasajeroService } from '../services/pasajero.service';
import { RestService } from '../services/rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-pasajero',
  templateUrl: './create-pasajero.component.html',
  styleUrls: ['./create-pasajero.component.css']
})
export class CreatePasajeroComponent implements OnInit {

  pasajeroForm!: FormGroup;
  pasajero = new Pasajero();
  tiposDocumento: any[] = [];

  constructor(
    private fb: FormBuilder,
    private pasajeroService: PasajeroService,
    private restService: RestService
  ) {}

  ngOnInit() {
    this.restService.getTipoDocumento().subscribe((tiposDocumento: any[]) => {
      this.tiposDocumento = tiposDocumento;
    });

    this.initForm();
  }

  private initForm(): void {
    this.pasajeroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      tipoDocumento: [null, Validators.required],
      numeroDocumento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      estado: [true]

    });
  }

  crearPasajero() {
    Object.keys(this.pasajeroForm.controls).forEach((controlName) => {
      this.pasajeroForm.controls[controlName].markAsTouched();
    });
  
    if (this.pasajeroForm.valid) {
      const tipoDocumentoId = this.pasajeroForm.value.tipoDocumento;
  
      // Construir el objeto pasajero
      this.pasajero = {
        ...this.pasajeroForm.value,
        tipoDocumento: {
          id: tipoDocumentoId,
          descripcion: this.tiposDocumento.find((tipo) => tipo.id === tipoDocumentoId)?.descripcion || '',
        },
      };
  
      this.restService.postPasajero(this.pasajero).subscribe(
        (response) => {
          console.log('Pasajero Creado con Éxito', response);
          this.pasajeroForm.reset();
          this.pasajeroService.agregarPasajero(this.pasajero);
  
          Swal.fire({
            icon: 'success',
            title: 'Pasajero creado con éxito',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#808080',
          });
        },
        (error) => {
          console.log(error);
          if (error.error.message.includes('El Email esta en uso')) {
            Swal.fire({
              icon: 'error',
              title: 'El Email ingresado ya está en uso',
              text: 'Por favor, ingrese un email diferente',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#808080',
            });
          } else if (error.error.message.includes('Numero de documento en uso')) {
            Swal.fire({
              icon: 'error',
              title: 'El número de documento ingresado ya está en uso',
              text: 'Por favor, ingrese un número de documento diferente',
              confirmButtonText: 'Aceptar',
              confirmButtonColor: '#808080',
            });
          }
        }
      );
    }
  }
  
  
}
