import { Component, inject, computed, signal, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiToastService, ToastPosition, ToastConfig } from './services/ui-toast.service';

@Component({
  selector: 'ui-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class UiToastComponent {
  public toastService = inject(UiToastService);

  // Inputs para el modo manual
  position = input<ToastPosition>('top-right'); 
  isVisible = signal(false);
  closed = output<any>();

  // Lógica para el Servicio
  activePositions = computed(() => {
    return Array.from(new Set(this.toastService.toasts().map(t => t.position || 'top-right')));
  });

  getToastsByPosition(pos: ToastPosition) {
    return this.toastService.toasts().filter(t => t.position === pos);
  }

  // Lógica Compartida de Posicionamiento
  getPositionClasses(pos: ToastPosition) {
    const isBot = pos.startsWith('bottom');
    let align = pos.includes('right') ? 'right-0 items-end' : 
                pos.includes('left') ? 'left-0 items-start' : 
                'left-1/2 -translate-x-1/2 items-center';
    return `${isBot ? 'bottom-0 flex-col-reverse' : 'top-0 flex-col'} ${align}`;
  }

  getSeverityClass(severity: string = 'info') {
    return {
      'border-green-500 text-green-800 bg-green-50': severity === 'success',
      'border-blue-500 text-blue-800 bg-blue-50': severity === 'info',
      'border-yellow-500 text-yellow-800 bg-yellow-50': severity === 'warn',
      'border-red-500 text-red-800 bg-red-50': severity === 'error',
    };
  }

  // Métodos para control manual
  show(life: number = 0) {
    this.isVisible.set(true);
    if (life > 0) setTimeout(() => this.close(), life);
  }

  close(result?: any) {
    this.isVisible.set(false);
    this.closed.emit(result);
  }
}