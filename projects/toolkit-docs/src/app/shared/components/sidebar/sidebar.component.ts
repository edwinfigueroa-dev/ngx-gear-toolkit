import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

export interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  badge?: number;
  children?: MenuItem[];
}


@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, TranslateModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  private router = inject(Router);

  toggleStates: { [key: number]: boolean } = {};
  isCollapsed = input<boolean>(false);
  isHovered = input<boolean>(false);

  eventChangeStatusSidebar = output<boolean>();
  eventChangeStatusHoverSidebar = output<boolean>();

  openIndex: number | null = null;
  menuItems: MenuItem[] = [
    {
      label: 'SIDEBAR.GETTING_STARTED.TITLE',
      icon: 'dashboard',
      route: '/main'
    },
    {
      label: 'SIDEBAR.UI_COMPONENTS.TITLE',
      icon: 'palette',
      children: [
        { label: 'SIDEBAR.UI_COMPONENTS.BUTTON', icon: '', route: '/ui/button' },
        { label: 'SIDEBAR.UI_COMPONENTS.SPPINER', icon: '', route: '/ui/sppiner' }
      ]
    },
    {
      label: 'SIDEBAR.VALIDATORS.TITLE',
      icon: 'gavel',
      children: [
        { label: 'SIDEBAR.VALIDATORS.NUMBERS', icon: '', route: '/validators/number' },
        { label: 'SIDEBAR.VALIDATORS.LETTERS', icon: '', route: '/validators/letter' },
        { label: 'SIDEBAR.VALIDATORS.EMAIL', icon: '', route: '/validators/email' },
        { label: 'SIDEBAR.VALIDATORS.ALPHANUMERIC', icon: '', route: '/validators/alphanumeric' },
        { label: 'SIDEBAR.VALIDATORS.UPPERCASE', icon: '', route: '/validators/uppercase' },
        { label: 'SIDEBAR.VALIDATORS.LOWERCASE', icon: '', route: '/validators/lowercase' },
        { label: 'SIDEBAR.VALIDATORS.FORBIDDEN_SPECIAL_CHARS', icon: '', route: '/validators/forbiddenSpecialChars' },
        { label: 'SIDEBAR.VALIDATORS.DYNAMIC_VALIDATOR', icon: '', route: '/validators/dynamicValidator' },
      ]
    },
  ];

  ngOnInit() {
    this.ensureMobileCollapsed();
    this.openMenuFromRoute();

    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.openMenuFromRoute();
    });
  }

  toggleSubmenu(index: number) {
    this.toggleStates[index] = !this.toggleStates[index];
  }

  toggleSidebar() {
    this.eventChangeStatusSidebar.emit(!this.isCollapsed);
  }

  onMouseEnter() {
    if (this.isCollapsed()) this.eventChangeStatusHoverSidebar.emit(true);
  }

  onMouseLeave() {
    if (this.isCollapsed()) this.eventChangeStatusHoverSidebar.emit(false);
  }

  onItemClicked() {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    if (isMobile) {
      this.eventChangeStatusSidebar.emit(true);
      this.eventChangeStatusHoverSidebar.emit(false);
    }
  }

  private openMenuFromRoute() {
  const currentUrl = this.router.url;

  this.menuItems.forEach((item, index) => {
    if (item.children) {
      const match = item.children.some(child =>
        currentUrl.startsWith(child.route!)
      );
      this.toggleStates[index] = match;
    }
  });
}

  private ensureMobileCollapsed() {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    if (isMobile && !this.isCollapsed()) {
      this.eventChangeStatusSidebar.emit(true);
      this.eventChangeStatusHoverSidebar.emit(false);
    }
  }
}
