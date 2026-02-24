import { Directive } from '@angular/core';
import { BaseControlDirective } from '@lib/directives/base-control.directive';

@Directive({
  selector: 'ui-select',
  standalone: true,
})
export class UiSelectDirective extends BaseControlDirective<any | null> { }