import { Directive, ElementRef, inject, signal, OnInit } from '@angular/core';
import { ControlValueAccessor, NgControl, Validators, ValidationErrors } from '@angular/forms';

@Directive()
export abstract class BaseControlDirective<T> implements ControlValueAccessor, OnInit {
  protected _elementRef = inject(ElementRef);
  public ngControl = inject(NgControl, { optional: true, self: true });

  // Signals comunes
  value = signal<T>(null as unknown as T);
  focused = signal<boolean>(false);
  touched = signal<boolean>(false);
  disabled = signal<boolean>(false);
  required = signal<boolean>(false);
  invalid = signal<boolean>(false);
  errors = signal<ValidationErrors | null>(null);

  protected onChange = (value: T) => {};
  protected onTouched = () => {};

  constructor() {
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  ngOnInit() {
    this.checkRequiredStatus();
  }

  //* ======================= Methods Private ======================= */

  private checkRequiredStatus() {
    const hasRequiredAttr = this._elementRef.nativeElement.hasAttribute('required') ||  this._elementRef.nativeElement.required;
    const hasRequiredValidator = this.ngControl?.control?.hasValidator(Validators.required);
    this.required.set(!!(hasRequiredAttr || hasRequiredValidator));
  }

  //* ======================= Methods Public ======================= */
  isInvalidControl() {
    if (!this.ngControl) return;

    const control = this.ngControl?.control;
    const isInvalid = !!(control?.invalid && (control?.touched || control?.dirty));

    this.invalid.set(isInvalid);
    this.errors.set(control?.errors ?? null);
  }

  clear(value: T = null as unknown as T) {
    this.value.set(value);
    this.onChange(value);
    this.writeValue(value);
    this.isInvalidControl();
  }

  updateValue(value: T) {
    this.value.set(value);
    this.onChange(value);
    this.isInvalidControl();
  }

  markAsTouched() {
    this.touched.set(true);
    this.focused.set(true);
    this.onTouched();
    this.isInvalidControl();
  }
  
  //* ======================= Methods ControlValueAccessor ======================= */
  writeValue(value: T = null as unknown as T): void {
    this._elementRef.nativeElement.value = value;
    this.value.set(value);
  }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
    this._elementRef.nativeElement.disabled = isDisabled;
  }
}