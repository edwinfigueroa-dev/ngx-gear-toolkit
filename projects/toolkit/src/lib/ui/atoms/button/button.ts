import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'button[uiButton], a[uiButton]',
  templateUrl: './button.html',
  styleUrl: './button.scss',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 
    '[class]': 'buttonClasses()',
    '[attr.disabled]': '(disabled() || loading()) ? true : null',
    '[attr.aria-disabled]': 'disabled() || loading()',
  },
})
export class UiButtonComponent {

  // Input properties
  appearance = input<'filled' | 'outlined' | 'text' | ''>('');
  label = input<string | null>(null);
  classLabel = input<string>('');
  className = input<string>('', { alias: 'class' });
  icon = input<string | undefined>(undefined);
  iconImg = input<string | undefined>(undefined);
  iconPosition = input<'left' | 'right'>('left');
  classIcon = input<string>('');
  color = input<string>('blue');
  disabled = input<boolean | undefined>(false);
  loading = input<boolean | undefined>(false);

  buttonClasses = computed(() => {
    const isInactive = this.disabled() || this.loading()
    const baseClass = 'relative flex items-center justify-center p-2 cursor-pointer active:scale-100';
    const variants = {
      filled: 'rounded-4xl bg-primary-500 hover:bg-primary-300 text-white',
      outlined: 'rounded-4xl border-primary-500 hover:bg-primary-300 text-primary-500 border-2',
      text: 'text-primary-500 hover:bg-green-100 rounded',
      '': '',
    };
    const disabledClass = 'opacity-50 cursor-not-allowed pointer-events-none grayscale-[0.3] shadow-none';

    return `${baseClass} ${variants[this.appearance()]} ${isInactive ? disabledClass : ''} ${this.className()}`;
  });
}
