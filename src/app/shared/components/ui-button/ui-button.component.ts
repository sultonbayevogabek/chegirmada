import { Component, Input } from '@angular/core';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'ui-button',
  templateUrl: 'ui-button.component.html',
  styleUrl: 'ui-button.component.scss',
  imports: [
    MatRipple
  ],
  standalone: true
})

export class UiButtonComponent {
  @Input() text = 'Сохранить'
  @Input() full = false;
  @Input() type: 'gray' | 'red' | 'blue' | 'gray-outline' = 'blue';
}
