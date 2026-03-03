import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-number',
  imports: [],
  templateUrl: './number.html',
  styleUrl: './number.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Number {}
