import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetClientesComponent } from './get-clientes/get-clientes.component';
import { CreatePasajeroComponent } from './create-pasajero/create-pasajero.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'listadoPasajeros',
    component: GetClientesComponent
  },
  {
    path: 'create-pasajero',
    component: CreatePasajeroComponent
  },
  {
    path:'home',
    component:HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
