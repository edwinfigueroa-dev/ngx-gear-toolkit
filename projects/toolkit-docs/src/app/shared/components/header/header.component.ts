import { Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DarkModeService } from '../../../core/services/dark-mode.service';
import { Translatei18nService } from '../../../core/services/translate-i18n.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private _darkModeService = inject(DarkModeService);
  private _translatei18nService = inject(Translatei18nService);

  isCollapsed = input<boolean>(false);
  eventButtonMenu = output<boolean>();
  darkModeEnabled = this._darkModeService.darkModeEnabled;
  currentLanguage = this._translatei18nService.currentLanguage$;

  constructor() {}

  toggleSidebar() {
    this.eventButtonMenu.emit(!this.isCollapsed());
  }

  toggleDarkMode() {
    this._darkModeService.toggleDarkMode();
  }

  toggleLanguage() {
    this._translatei18nService.setLanguage(this.currentLanguage() === 'en' ? 'es' : 'en');
  }

}
