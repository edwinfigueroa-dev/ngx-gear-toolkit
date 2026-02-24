import { Directive } from '@angular/core';
import { BaseControlDirective } from '@lib/directives/base-control.directive';

@Directive({
  selector: 'input[uiInput]',
  standalone: true,
  host: {
    '(input)': 'onInput($event)',
    '(blur)': 'onBlur($event)',
    '(focus)': 'onFocus($event)',
    'class': 'w-full h-full px-3 py-2 bg-transparent border-none outline-hidden focus:ring-0 placeholder:text-gray-400 disabled:cursor-not-allowed text-gray-900 block'
  }
})
export class UiInputDirective extends BaseControlDirective<string | null> {

  //* ======================= Methods ======================= */
  setType(type: string) {
    this._elementRef.nativeElement.type = type;
  }

  //* ======================= Events Native ======================= */

  onInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.value.set(val ?? '');
    this.onChange(val);
    if(this.touched()) this.isInvalidControl();
  }

  onBlur(event: Event) {
    this.focused.set(false);
    this.touched.set(true);
    this.onTouched();
    this.isInvalidControl();
  }

  onFocus(event: Event) {
    this.focused.set(true);
  }
}