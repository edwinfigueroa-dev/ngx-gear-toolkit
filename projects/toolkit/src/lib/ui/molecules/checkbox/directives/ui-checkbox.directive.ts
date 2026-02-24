import { Directive } from '@angular/core';
import { BaseControlDirective } from '@lib/directives/base-control.directive';

@Directive({
  selector: 'ui-checkbox',
  standalone: true,
})
export class UiCheckboxDirective extends BaseControlDirective<boolean | null> { }