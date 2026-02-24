import { signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';

export interface ActionState<T> {
  loading: boolean;
  value: T | null;
  error: any;
}

export interface Actions<T> {
  next?: (value: T) => void;
  error?: (error: any) => void;
  complete?: () => void;
  initialValue?: WritableSignal<ActionState<T>>;
  changeDetection?: boolean;
}

const defaultState: Actions<any> = {
  next: (response) => {},
  error: (error) => {},
  complete: () => {},
  initialValue: signal<ActionState<any>>({ loading: false, value: null, error: null }),
  changeDetection: true,
}

export function useResource<T>(
  obs$: Observable<T>,
  actions?: Actions<T>,
): WritableSignal<ActionState<T>> {
  actions = { ...defaultState, ...actions };
  if(actions.changeDetection) actions?.initialValue?.set({ loading: true, value: null, error: null });

  obs$.subscribe({
    next: (response) => {
      if(actions.changeDetection) actions?.initialValue?.set({ loading: false, value: response, error: null });
      actions?.next?.(response);
    },
    error: (err) => {
      actions?.initialValue?.set({ loading: false, value: null, error: err });
      actions?.error?.(err);
    },
    complete: () => {
      actions?.complete?.();
    }
  });

  return actions?.initialValue!;
}