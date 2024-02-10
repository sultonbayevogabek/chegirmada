import { Component, Input } from '@angular/core';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'blue-button',
  templateUrl: 'blue-button.component.html',
  styleUrl: 'blue-button.component.scss',
  imports: [
    MatRipple
  ],
  standalone: true
})

export class BlueButtonComponent {
  @Input() text = 'Сохранить'
  @Input() full = false;
}
