import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[uiItem]',
    standalone: true,
})
export class UiSelectItemDirective {
    constructor(public template: TemplateRef<any>) { }
}

@Directive({
    selector: '[uiSelectedItem]',
    standalone: true,
})
export class UiSelectSelectedItemDirective {
    constructor(public template: TemplateRef<any>) { }
}

@Directive({
    selector: '[uiHeader]',
    standalone: true,
})
export class UiSelectHeaderDirective {
    constructor(public template: TemplateRef<any>) { }
}

@Directive({
    selector: '[uiFooter]',
    standalone: true,
})
export class UiSelectFooterDirective {
    constructor(public template: TemplateRef<any>) { }
}