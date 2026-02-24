import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
    selector: '[uiCarouselItem]',
    standalone: true,
})
export class UiCarouselItemDirective { template = inject(TemplateRef); }