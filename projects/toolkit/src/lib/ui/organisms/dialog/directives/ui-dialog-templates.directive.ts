import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
    selector: '[uiDialogHeader]',
    standalone: true,
})
export class UiDialogHeaderDirective { template = inject(TemplateRef); }

@Directive({
    selector: '[uiDialogContent]',
    standalone: true,
})
export class UiDialogContentDirective { template = inject(TemplateRef<{ $implicit: any }>); }

@Directive({
    selector: '[uiDialogFooter]',
    standalone: true,
})
export class UiDialogFooterDirective { template = inject(TemplateRef); }