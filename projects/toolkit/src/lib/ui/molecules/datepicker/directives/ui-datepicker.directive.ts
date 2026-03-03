import { Directive, Input } from '@angular/core';
import { BaseControlDirective } from '../../../../directives/base-control.directive';

@Directive({
  selector: 'ui-datepicker',
  standalone: true,
})
export class UiDatepickerDirective extends BaseControlDirective<Date | null> { }