import { Component, input, TemplateRef, viewChild } from '@angular/core';

@Component({
  selector: 'ui-tab',
  imports: [],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss'
})
export class UiTabComponent {
  label = input.required<string>();
  template = viewChild.required<TemplateRef<any>>('content');
}
