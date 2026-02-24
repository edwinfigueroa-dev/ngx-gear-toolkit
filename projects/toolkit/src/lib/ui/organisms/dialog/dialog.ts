import { ChangeDetectionStrategy, Component, ComponentRef, contentChild, input, output, signal, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiDialogContentDirective, UiDialogFooterDirective, UiDialogHeaderDirective } from './directives/ui-dialog-templates.directive';

@Component({
  selector: 'ui-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.html',
  styleUrl: './dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiDialogComponent {
  @ViewChild('dynamicContent', { read: ViewContainerRef }) dynamicContent!: ViewContainerRef;

  isOpen = signal(false);
  title = input<string>('');
  size = input<'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');
  data = input<any>();

  headerTmpl = contentChild(UiDialogFooterDirective);
  contentTmpl = contentChild(UiDialogContentDirective);
  footerTmpl = contentChild(UiDialogHeaderDirective);

  closed = output<any>(); // Emite el resultado al cerrar

  sizeClass = () => {
    const sizes = {
      sm: 'max-w-md',
      md: 'max-w-lg',
      lg: 'max-w-2xl',
      xl: 'max-w-5xl',
      full: 'max-w-full h-full m-0 rounded-none'
    };
    return sizes[this.size()];
  };

  open() { this.isOpen.set(true); }

  close(result?: any) {
    this.isOpen.set(false);
    this.closed.emit(result);
  }

  // Método para que el servicio inyecte contenido
  attachComponent<T>(component: Type<T>): ComponentRef<T> {
    this.dynamicContent.clear();
    return this.dynamicContent.createComponent(component);
  }
}