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
      numeroDocumento: ['', [Validators.required], [this.pasajeroService.numeroDocumentoValidator()]],
     email: ['', [Validators.required, Validators.email], [this.pasajeroService.emailValidator()]],
      estado: [true]
    });
  }

  crearPasajero() {
    Object.keys(this.pasajeroForm.controls).forEach((controlName) => {
      this.pasajeroForm.controls[controlName].markAsTouched();
    });
  
    if (this.pasajeroForm.valid) {
      const tipoDocumentoId = this.pasajeroForm.value.tipoDocumento;

      // Crear el pasajero
      this.pasajero = {
        ...this.pasajeroForm.value,
        tipoDocumento: {
          id: tipoDocumentoId,
          descripcion: this.tiposDocumento.find((tipo) => tipo.id === tipoDocumentoId)?.descripcion || '',
        },
      };
      Swal.fire({
        title: "¿Estás seguro de que deseas guardar los cambios?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        denyButtonText: `No guardar`
      }).then((result) => {
        if (result.isConfirmed) {
          // Realizar la acción si el usuario elige guardar
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
            }
          );
        } else if (result.isDenied) {
          Swal.fire("Cambios no guardados", "", "info");
        }
      });
    }
  }
  
}
