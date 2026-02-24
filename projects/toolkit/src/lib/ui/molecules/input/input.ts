import { ChangeDetectionStrategy, Component, computed, contentChild, ElementRef, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UiInputDirective } from './directives/ui-input.directive';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiInputComponent {
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
  loading = input<boolean>(false);
  showClear = input<boolean>(false);
  prefix = input<string>('');
  suffix = input<string>('');
  isPassword = input<boolean>(false);

  // Estado Interno
  showPassword = signal(false);

  // Referencias
  inputDirective = contentChild(UiInputDirective);
  startIcon = contentChild<ElementRef>('startIcon');
  endIcon = contentChild<ElementRef>('endIcon');

  // Eventos Output
  clear = output<boolean>();

  togglePassword() {
    this.showPassword.update(v => !v);
    const type = this.showPassword() ? 'text' : 'password';
    this.inputDirective()?.setType(type);
  }

  clearInput() {
    this.inputDirective()?.clear('');
    this.clear.emit(true);
  }

  hasError = computed(() => this.inputDirective()?.invalid() || false);

  currentErrorMessage = computed(() => {
    const errors = this.inputDirective()?.errors();
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