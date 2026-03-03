import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

export interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  badge?: number;
  children?: MenuItem[];
}


@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
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
      label: 'Getting started',
      icon: 'dashboard',
      route: '/main'
    },
    {
      label: 'UI Components',
      icon: 'palette',
      children: [
        { label: 'Button', icon: '', route: '/ui/button' },
        { label: 'Sppiner', icon: '', route: '/ui/sppiner' }
      ]
    },
    {
      label: 'Validators',
      icon: 'gavel',
      children: [
        { label: 'Numbers', icon: '', route: '/validators/number' },
        { label: 'Letters', icon: '', route: '/validators/letter' },
        { label: 'Email', icon: '', route: '/validators/email' },
        { label: 'Alphanumeric', icon: '', route: '/validators/alphanumeric' },
        { label: 'Uppercase', icon: '', route: '/validators/uppercase' },
        { label: 'Lowercase', icon: '', route: '/validators/lowercase' },
        { label: 'Forbidden Special Chars', icon: '', route: '/validators/forbiddenSpecialChars' },
        { label: 'Dynamic Validator', icon: '', route: '/validators/dynamicValidator' },
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
