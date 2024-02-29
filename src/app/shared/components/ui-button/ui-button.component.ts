import { Component, Input } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'ui-button',
  templateUrl: 'ui-button.component.html',
  styleUrl: 'ui-button.component.scss',
  imports: [
    MatRipple,
    NgClass,
    MatIcon,
    TranslateModule
  ],
  standalone: true
})

export class UiButtonComponent {
  @Input() text = 'Сохранить'
  @Input() full = false;
  @Input() type: 'gray' | 'red' | 'blue' | 'gray-outline' | 'green-outline' = 'blue';
  @Input() icon: string;
}
