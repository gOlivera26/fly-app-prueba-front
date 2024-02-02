import { Component } from '@angular/core';

@Component({
  selector: 'app-home-aviones',
  templateUrl: './home-aviones.component.html',
  styleUrls: ['./home-aviones.component.css']
})
export class HomeAvionesComponent {
  visibilityState: { [key: string]: boolean } = {
    mostrarListadoAviones: false,
    mostrarCrearAvion: false,
  };

  constructor() {}

  toggleComponent(component: string) {
    this.visibilityState[component] = !this.visibilityState[component];
  }

  isComponentVisible(component: string) {
    return this.visibilityState[component];
  }

}
