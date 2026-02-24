import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
    selector: '[uiToastItem]',
    standalone: true,
})
export class UiToastItemDirective { template = inject(TemplateRef); }