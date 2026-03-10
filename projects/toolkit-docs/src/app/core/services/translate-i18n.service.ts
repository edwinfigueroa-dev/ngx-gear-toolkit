import { Injectable, inject, signal } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Translatei18nService {
  currentLanguage$ = signal<string>('en');

  private _translate = inject(TranslateService);
  constructor() { }

  setInitialLanguage() {
    let language = this._translate.getBrowserLang() as string;
    let savedLanguage = localStorage.getItem('language');
    this.setLanguage(savedLanguage || language);
  }

  setLanguage(lang: string) {
    this._translate.use(lang);
    this.currentLanguage$.set(lang);
    localStorage.setItem('language', lang);
  }

  // Se ejecuta una vez pero el archivo de idiomas debe estar cargado
  translateInstant(keyLang: string | string[], params?: any): string {
    return this._translate.instant(keyLang, params);
  }

  // Se ejecuta una vez y no importa si el archivo de idiomas ya esta cargado ya que espera hasta que se cargue y actualiza los datos
  translateGet(keyLang: string | string[], params?: any): Observable<string> {
    return this._translate.get(keyLang, params);
  }

  // Se ejecuta sin importar si el archivo de idiomas esta cargado y queda subscrito a los cambios de idiomas (Ideal para cambios puntuales)
  translateStream(keyLang: string | string[], params?: any): Observable<string> {
    return this._translate.stream(keyLang, params);
  }

  // Hace lo mismo que translateStream pero devuelve mucha mas informacion que solo el texto traducido (Ideal para cambios globales)
  onLangChange(): Observable<LangChangeEvent> {
    return this._translate.onLangChange;
  }
}
