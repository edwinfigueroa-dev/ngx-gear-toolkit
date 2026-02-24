import { Injectable, Type, ViewContainerRef, inject, ApplicationRef, createComponent, EnvironmentInjector, ComponentRef } from '@angular/core';
import { UiDialogComponent } from '../dialog';
import { Subject } from 'rxjs';

export interface DialogConfig {
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  classContainer?: string;
  data?: any;
}

@Injectable({
  providedIn: 'root',
})
export class UiDialogService {
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);

  open<T, R = any>(component: Type<T>, config?: DialogConfig) {
    const result$ = new Subject<R | undefined>();

    // 1. Crear el componente Modal (el contenedor) manualmente en el Body
    const modalRef = createComponent(UiDialogComponent, {
      environmentInjector: this.injector
    });

    // 2. Configurar inputs del modal
    if (config?.title) modalRef.setInput('title', config.title);
    if (config?.size) modalRef.setInput('size', config.size);
    if (config?.classContainer) modalRef.setInput('classContainer', config.classContainer);
    if (config?.data) modalRef.setInput('data', config.data);

    // 3. Adjuntar al ApplicationRef para que detecte cambios y al DOM
    this.appRef.attachView(modalRef.hostView);
    document.body.appendChild(modalRef.location.nativeElement);

    // 4. Abrir y Renderizar el componente hijo dentro del modal
    modalRef.instance.open();
    // Forzamos un ciclo de detección para que el ViewChild esté disponible
    modalRef.changeDetectorRef.detectChanges(); 
    
    const contentRef = modalRef.instance.attachComponent(component);
    
    // Si el componente hijo necesita recibir la data directamente en sus inputs:
    if (config?.data) contentRef.setInput('data', config.data);

    // 5. Manejar el cierre
    modalRef.instance.closed.subscribe((result) => {
      result$.next(result);
      result$.complete();
      
      // Limpieza
      this.appRef.detachView(modalRef.hostView);
      modalRef.destroy();
    });

    return {
      result$, // Observable para esperar el valor: service.open(...).result$.subscribe()
      close: (result?: R) => modalRef.instance.close(result),
      componentInstance: contentRef.instance
    };
  }
}