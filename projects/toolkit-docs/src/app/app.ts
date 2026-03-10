
import { Component, inject, signal } from '@angular/core';
import { UiSpinner } from 'toolkit';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DarkModeService } from './core/services/dark-mode.service';
import { Translatei18nService } from './core/services/translate-i18n.service';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    UiSpinner,
    HeaderComponent,
    SidebarComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private _darkModeService = inject(DarkModeService);
  private _translatei18nService = inject(Translatei18nService);

  isCollapsedSignal = signal<boolean>(false);
  isHoveredSignal = signal<boolean>(false);

  constructor() {
    this._darkModeService.init();
    this._translatei18nService.setInitialLanguage();
  }
}