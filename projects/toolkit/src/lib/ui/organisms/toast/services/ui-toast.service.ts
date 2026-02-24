import { Injectable, signal } from '@angular/core';

export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface ToastConfig {
  id?: number;
  severity?: 'success' | 'info' | 'warn' | 'error';
  summary?: string;
  detail?: string;
  life?: number;
  sticky?: boolean;
  position?: ToastPosition;
  onClose?: (result?: any) => void; 
}

const DEFAULT_CONFIG: ToastConfig = {
  severity: 'info',
  life: 3000,
  sticky: false,
  position: 'top-right',
};

@Injectable({ providedIn: 'root' })
export class UiToastService {
  toasts = signal<ToastConfig[]>([]);
  private counter = 0;

  show(config: ToastConfig) {
    const id = this.counter++;
    // Forzamos la creación de un objeto nuevo y limpio
    const newToast: ToastConfig = { 
      ...config, 
      id, 
      position: config.position || 'top-right' 
    };

    this.toasts.update(current => [...current, newToast]);

    if (!newToast.sticky) {
      setTimeout(() => this.remove(id), newToast.life || 3000);
    }
  }

  remove(id: number) {
    this.toasts.update(current => current.filter(t => t.id !== id));
  }

  clear() {
    this.toasts.set([]);
  }
}