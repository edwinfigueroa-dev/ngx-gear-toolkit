import { Component, contentChildren, signal, computed, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiTabComponent } from './components/tab/tab.component';

@Component({
  selector: 'ui-tabs',
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class UiTabsComponent {
  // Obtenemos todos los <ui-tab> inyectados en el ng-content
  tabs = contentChildren(UiTabComponent);
  
  selectedIndex = signal(0);
  color = input<string>('blue');

  activeTab = computed(() => this.tabs()[this.selectedIndex()]);

  themeVars = computed(() => {
    const c = this.color();
    return {
      '--tabs-active': `var(--color-${c}-600)`,
      '--tabs-hover': `var(--color-${c}-50)`,
    };
  });

  selectTab(index: number) {
    this.selectedIndex.set(index);
  }
}
