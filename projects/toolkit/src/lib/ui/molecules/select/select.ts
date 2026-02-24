import { ChangeDetectionStrategy, Component, computed, contentChild, ElementRef, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiSelectDirective } from './directives/ui-select.directive';
import { 
  UiSelectItemDirective, 
  UiSelectSelectedItemDirective, 
  UiSelectHeaderDirective, 
  UiSelectFooterDirective 
} from './directives/ui-select-templates.directive';

@Component({
  selector: 'ui-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.html',
  styleUrl: './select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [UiSelectDirective],
  host: {
    '(document:click)': 'clickout($event)'
  }
})
export class UiSelectComponent<T> {
  private _elementRef = inject(ElementRef);
  private _uiSelectDirective = inject(UiSelectDirective);

  // Configuración de Datos
  options = input.required<T[]>();
  optionLabel = input<string>('label');
  optionValue = input<string>();
  emptyMessage = input<string>('No options found');
  placeholder = input<string>('Select an option');

  // Inputs Básicos
  label = input<string>('');
  labelAppearance = input<'border' | 'outside'>('outside');
  labelClass = input<string>('');
  hint = input<string>('');
  classContainer = input<string>('');
  size = input<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
  borderAppearance = input<'full' | 'rounded' | 'base'>('base');
  color = input<string>('');
  showAsteriskRequired = input<boolean>(true);
  
  // Inputs de Error
  errorMessages = input<Record<string, string>>({});
  uniqueErrorMessage = input<string>('Invalid field');
  
  // Inputs de Funcionalidades
  isOpen = signal(false);
  loading = input<boolean>(false);
  showClear = input<boolean>(false);

  // Estado Interno
  focused = computed(() => this.isOpen());
  selectedValue = this._uiSelectDirective.value;
  hasError = this._uiSelectDirective.invalid;
  disabled = this._uiSelectDirective.disabled;
  required = this._uiSelectDirective.required;

  // Referencias a Templates y Directivas
  itemTmpl = contentChild(UiSelectItemDirective);
  selectedItemTmpl = contentChild(UiSelectSelectedItemDirective);
  headerTmpl = contentChild(UiSelectHeaderDirective);
  footerTmpl = contentChild(UiSelectFooterDirective);

  // Eventos Output
  selected = output<any>();
  clear = output<boolean | null>();

  clickout(event: any) {
    if (!this._elementRef.nativeElement.contains(event.target)) {
      if (this.isOpen()) this._uiSelectDirective.markAsTouched();
      this.isOpen.set(false);
    }
  }

  selectedItem = computed(() => {
    const val = this.selectedValue();
    const prop = this.optionValue();
    if (val === null || val === undefined) return null;
    return prop ? this.options().find(o => (o as any)[prop] === val) : val;
  });

  toggle() {
    if (this._uiSelectDirective.disabled()) return;
    this.isOpen.update(v => !v);
  }

  clearInput($event: Event) {
    $event.stopPropagation();
    this._uiSelectDirective.updateValue(null);
    this.isOpen.set(false);
    this.clear.emit(true);
  }

  getLabel(option: any): string {
    if (!option) return '';
    return typeof option === 'object' ? option[this.optionLabel()] || '' : option;
  }

  selectOption(option: T) {
    const prop = this.optionValue();
    const val = prop ? (option as any)[prop] : option;
    this._uiSelectDirective.updateValue(val);
    this.isOpen.set(false);
    this.selected.emit(val);
  }

  currentErrorMessage = computed(() => {
    const errors = this._uiSelectDirective.errors();
    if (!errors) return '';
    const firstErrorKey = Object.keys(errors)[0];
    return this.errorMessages()[firstErrorKey] || this.uniqueErrorMessage();
  });

  themeStyles = computed(() => {
    if (this.hasError()) {
      return {
        '--ui-color-main': 'var(--color-red-500, #ef4444)',
        '--ui-color-text': 'var(--color-red-600, #dc2626)'
      };
    }

    const colorName = this.color();
    const isDirectColor = colorName.startsWith('#') || colorName.startsWith('rgb') || colorName.startsWith('hsl') || colorName === 'transparent';

    const colorValue = isDirectColor ? colorName : `var(--color-${colorName}, var(--${colorName}, ${colorName}))`;
    
    return {
      '--ui-color-main': colorValue,
      '--ui-color-text': colorValue,
    };
  });
}