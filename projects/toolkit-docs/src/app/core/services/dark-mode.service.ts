import { Injectable, signal, Signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  private _darkModeEnabled = signal(false);

  get darkModeEnabled(): Signal<boolean> {
    return this._darkModeEnabled.asReadonly();
  }

  set darkModeEnabled(value: boolean) {
    this._darkModeEnabled.set(value);
  }

  constructor() {}

  init(): void {
    this.darkModeEnabled = localStorage.getItem('darkMode') === 'true';
    localStorage.setItem('darkMode', this.darkModeEnabled().toString());
    document.documentElement.classList.toggle('dark', this.darkModeEnabled());
  }

  toggleDarkMode() {
    this.darkModeEnabled = !this.darkModeEnabled();
    localStorage.setItem('darkMode', this.darkModeEnabled().toString());
    document.documentElement.classList.toggle('dark', this.darkModeEnabled());
  }

}
