import { Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DarkModeService } from '../../../core/services/dark-mode.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private _darkModeService = inject(DarkModeService);

  isCollapsed = input<boolean>(false);
  eventButtonMenu = output<boolean>();
  darkModeEnabled = this._darkModeService.darkModeEnabled;

  constructor() {}

  toggleSidebar() {
    this.eventButtonMenu.emit(!this.isCollapsed());
  }

  toggleDarkMode() {
    this._darkModeService.toggleDarkMode();
  }

}
