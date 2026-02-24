import { Component, input, computed, inject, ChangeDetectionStrategy, output } from '@angular/core';
import { UiCheckboxDirective } from './directives/ui-checkbox.directive';
import { SafeHtmlPipe } from '@lib/pipe';

@Component({
  selector: 'ui-checkbox',
  standalone: true,
  imports: [SafeHtmlPipe],
  hostDirectives: [UiCheckboxDirective],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCheckboxComponent {
  private _directive = inject(UiCheckboxDirective);

  label = input<string>('');
  color = input<string>('blue');
  id = input<string>(`ui-cb-${Math.random().toString(36).substring(2, 9)}`);

  checked = this._directive.value;
  disabled = this._directive.disabled;
  hasError = this._directive.invalid;

  themeStyles = computed(() => {
    const colorName = this.color();
    if (this.hasError()) {
      return { '--ui-cb-color': 'var(--color-red-500, #ef4444)' };
    }

    return {
      '--ui-cb-color': `var(--color-${colorName}, var(--${colorName}, ${colorName}))`,
    };
  });

  selected = output<boolean>();

  toggle() {
    if (this.disabled()) return;
    const changeValue = !this.checked();
    this._directive.updateValue(changeValue);
    this.selected.emit(changeValue);
    this._directive.markAsTouched();
  }
}