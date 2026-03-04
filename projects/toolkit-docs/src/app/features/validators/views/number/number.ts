import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { numbersValidator, UiInput } from 'toolkit';


@Component({
  selector: 'app-number',
  imports: [CommonModule, ReactiveFormsModule, UiInput],
  templateUrl: './number.html',
  styleUrl: './number.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Number {
  exampleOne = new FormControl(0, [numbersValidator()]);
}
