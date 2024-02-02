import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { GetClientesComponent } from './get-clientes/get-clientes.component';
import { CreatePasajeroComponent } from './create-pasajero/create-pasajero.component';
import { HomeComponent } from './home/home.component';
import { HomeAvionesComponent } from './home-aviones/home-aviones.component';
import { GetAvionesComponent } from './get-aviones/get-aviones.component';


@NgModule({
  declarations: [
    AppComponent,
    GetClientesComponent,
    CreatePasajeroComponent,
    HomeComponent,
    HomeAvionesComponent,
    GetAvionesComponent

  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
