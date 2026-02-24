import { Component, input, signal, computed, inject, ElementRef, ChangeDetectionStrategy, output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UiDatepickerDirective } from './directives/ui-datepicker.directive';

export interface CalendarDay {
  date: Date;
  currentMonth: boolean;
  disabled: boolean;
}

@Component({
  selector: 'ui-datepicker',
  standalone: true,
  imports: [CommonModule],
  hostDirectives: [UiDatepickerDirective],
  templateUrl: './datepicker.html',
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:click)': 'clickout($event)'
  }
})
export class UiDatepickerComponent {
  private _elementRef = inject(ElementRef);
  public _uiDatepickerDirective = inject(UiDatepickerDirective);
  private _datePipe = inject(DatePipe);

  // Inputs Básicos
  label = input<string>('');
  labelAppearance = input<'border' | 'outside'>('outside');
  labelClass = input<string>('');
  hint = input<string>('');
  classContainer = input<string>('');
  size = input<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
  color = input<string>('blue');
  placeholder = input<string>('');
  borderAppearance = input<'full' | 'rounded' | 'base'>('base');
  showAsteriskRequired = input<boolean>(true);

  // Inputs de Error
  errorMessages = input<Record<string, string>>({});
  uniqueErrorMessage = input<string>('Invalid field');

  // Inputs de Funcionalidades
  isOpen = signal(false);
  loading = input<boolean>(false);
  showClear = input<boolean>(false);
  showYearPicker = signal(false);
  viewDate = signal(new Date());
  format = input<string>('dd/MM/yyyy'); 
  minDate = input<Date | null>(null);
  maxDate = input<Date | null>(null);
  
  // Estado Interno
  focused = computed(() => this.isOpen());
  selectedValue = this._uiDatepickerDirective.value;
  hasError = this._uiDatepickerDirective.invalid;
  disabled = this._uiDatepickerDirective.disabled;
  required = this._uiDatepickerDirective.required;

  // Eventos Output
  selected = output<any>();
  clear = output<boolean | null>();

  weekDays = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
  years = computed(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 100 }, (_, i) => currentYear - 80 + i);
  });

  calendarGrid = computed(() => {
    const viewDate = this.viewDate();
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDateOfPrevMonth = new Date(year, month, 0).getDate();
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

    const days: CalendarDay[] = [];

    for (let i = firstDayOfMonth; i > 0; i--) {
      const date = new Date(year, month - 1, lastDateOfPrevMonth - i + 1);
      days.push({ date, currentMonth: false, disabled: this.isDateDisabled(date) });
    }

    for (let i = 1; i <= lastDateOfMonth; i++) {
      const date = new Date(year, month, i);
      days.push({ date, currentMonth: true, disabled: this.isDateDisabled(date) });
    }

    const remainingSlots = 42 - days.length;
    for (let i = 1; i <= remainingSlots; i++) {
      const date = new Date(year, month + 1, i);
      days.push({ date, currentMonth: false, disabled: this.isDateDisabled(date) });
    }

    return days;
  });

  get formattedDate(): string {
    const date = this.selectedValue();
    return date ? this._datePipe.transform(date, this.format()) || '' : this.placeholder();
  }

  private isDateDisabled(date: Date): boolean {
    const min = this.minDate();
    const max = this.maxDate();
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if (min && d < new Date(min.getFullYear(), min.getMonth(), min.getDate())) return true;
    if (max && d > new Date(max.getFullYear(), max.getMonth(), max.getDate())) return true;
    return false;
  }

  toggle() {
    if (this._uiDatepickerDirective.disabled()) return;
    this.isOpen.update(v => !v);
    if (this.isOpen()) {
      this.showYearPicker.set(false);
      if (this.selectedValue()) this.viewDate.set(new Date(this.selectedValue()!));
    }
  }

  clearInput($event: Event) {
    $event.stopPropagation();
    this._uiDatepickerDirective.updateValue(null);
    this.isOpen.set(false);
    this.clear.emit(true);
  }

  selectDate(date: Date) {
    if (this.isDateDisabled(date)) return;
    this._uiDatepickerDirective.updateValue(new Date(date));
    this.selected.emit(new Date(date));
    this.isOpen.set(false);
  }

  setToday() {
    const today = new Date();
    if (!this.isDateDisabled(today)) this.selectDate(today);
  }

  changeMonth(offset: number) {
    const date = this.viewDate();
    this.viewDate.set(new Date(date.getFullYear(), date.getMonth() + offset, 1));
  }

  setYear(year: number) {
    const current = this.viewDate();
    this.viewDate.set(new Date(year, current.getMonth(), 1));
    this.showYearPicker.set(false);
  }

  isSelected(date: Date): boolean {
    const selected = this.selectedValue();
    return selected ? date.toDateString() === selected.toDateString() : false;
  }

  isToday(date: Date): boolean {
    return date.toDateString() === new Date().toDateString();
  }

  clickout(event: any) {
    if (!this._elementRef.nativeElement.contains(event.target)) {
      if (this.isOpen()) this._uiDatepickerDirective.markAsTouched();
      this.isOpen.set(false);
    }
  }

  currentErrorMessage = computed(() => {
    const errors = this._uiDatepickerDirective.errors();
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