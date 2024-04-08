import { Component, Input, ViewChild } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { UiButtonTypeModel } from '../../models/ui-button-type.model';

@Component({
  selector: 'ui-button',
  templateUrl: 'ui-button.component.html',
  styleUrl: 'ui-button.component.scss',
  imports: [
    MatRipple,
    NgClass,
    MatIcon,
    TranslateModule,
    MatProgressSpinner
  ],
  standalone: true
})

export class UiButtonComponent {
  @ViewChild('uiButton', { static: true }) uiButton: HTMLButtonElement;
  @Input() text = 'save'
  @Input() textSizeClass = ''
  @Input() full = false;
  @Input() type: UiButtonTypeModel = 'blue';
  @Input() icon: string;
  @Input() actionType: 'submit' | 'reset' | 'button' = 'button';
  @Input() disabled = false;
  @Input() title: string;
  @Input() loading = false;
}
