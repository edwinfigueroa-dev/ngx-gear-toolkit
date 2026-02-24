import { ChangeDetectionStrategy, Component, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-spinner',
  templateUrl: './spinner.html',
  styleUrl: './spinner.scss',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' }
})
export class UiSpinnerComponent {
  diameter = input<number>(50);
  color = input<'primary' | 'accent' | 'warn' | 'purple'>('primary');
  strokeWidth = input<number>(5);
}
