import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppVisibilityService {

  private visibilityState: { [key: string]: boolean } = {};

  toggleComponent(component: string) {
    this.visibilityState[component] = !this.visibilityState[component];
  }

  isComponentVisible(component: string) {
    return this.visibilityState[component];
  }
}
