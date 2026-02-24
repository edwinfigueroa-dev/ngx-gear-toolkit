// 1. Imports
import { UiButtonComponent } from './atoms/button/button';
import { UiSpinnerComponent } from './atoms/spinner/spinner';
import { UiInputDirective } from './molecules/input/directives/ui-input.directive';
import { UiInputComponent } from './molecules/input/input';
import { UiSelectComponent } from './molecules/select/select';
import { UiSelectDirective } from './molecules/select/directives/ui-select.directive';
import {
  UiSelectItemDirective, 
  UiSelectFooterDirective, 
  UiSelectHeaderDirective, 
  UiSelectSelectedItemDirective 
} from './molecules/select/directives/ui-select-templates.directive';
import { UiDatepickerComponent } from './molecules/datepicker/datepicker';
import { UiDatepickerDirective } from './molecules/datepicker/directives/ui-datepicker.directive';
import { UiCheckboxComponent } from './molecules/checkbox/checkbox';
import { UiCheckboxDirective } from './molecules/checkbox/directives/ui-checkbox.directive';
import { UiDialogComponent } from './organisms/dialog/dialog';
import { UiDialogContentDirective, UiDialogFooterDirective, UiDialogHeaderDirective } from './organisms/dialog/directives/ui-dialog-templates.directive';
import { UiDialogService } from './organisms/dialog/services/ui-dialog.service';
import { UiToastComponent } from './organisms/toast/toast';
import { UiToastItemDirective } from './organisms/toast/directives/ui-toast-templates.directive';
import { UiToastService } from './organisms/toast/services/ui-toast.service';
import { UiCarouselComponent } from './organisms/carousel/carousel';
import { UiCarouselItemDirective } from './organisms/carousel/directives/ui-carousel-item.directive';
import { UiIconComponent } from './atoms/icon/icon';

// 2. Definimos todos como "Kits" por consistencia
export const UiButton = [UiButtonComponent] as const;
export const UiIcon = [UiIconComponent] as const;
export const UiSpinner = [UiSpinnerComponent] as const;
export const UiInput = [UiInputComponent, UiInputDirective] as const;
export const UiSelect = [
    UiSelectComponent,
    UiSelectItemDirective, 
    UiSelectFooterDirective, 
    UiSelectHeaderDirective, 
    UiSelectSelectedItemDirective
] as const;
export const UiDatepicker = [UiDatepickerComponent] as const;
export const UiCheckbox = [UiCheckboxComponent] as const;
export const UiDialog = [
    UiDialogComponent,
    UiDialogHeaderDirective,
    UiDialogContentDirective,
    UiDialogFooterDirective
] as const;
export const UiToast = [UiToastComponent, UiToastItemDirective] as const;
export const UiCarousel = [UiCarouselComponent, UiCarouselItemDirective] as const;

// 3. Exportamos las clases individuales (Obligatorio para el compilador)
export {
    UiButtonComponent,
    UiIconComponent,
    UiSpinnerComponent,
    UiInputComponent,
    UiInputDirective,
    UiSelectComponent,
    UiSelectDirective,
    UiSelectItemDirective,
    UiSelectFooterDirective,
    UiSelectHeaderDirective,
    UiSelectSelectedItemDirective,
    UiDatepickerComponent,
    UiDatepickerDirective,
    UiCheckboxComponent,
    UiCheckboxDirective,
    UiDialogComponent,
    UiDialogService,
    UiDialogHeaderDirective,
    UiDialogContentDirective,
    UiDialogFooterDirective,
    UiToastComponent,
    UiToastService,
    UiToastItemDirective,
    UiCarouselItemDirective,
    UiCarouselComponent,
};