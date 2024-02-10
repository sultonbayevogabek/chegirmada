import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';
import { UiButtonComponent } from '../../../shared/components/ui-button/ui-button.component';

@Component({
  selector: 'my-information',
  templateUrl: 'my-information.component.html',
  styleUrl: 'my-information.component.scss',
  imports: [
    MatIcon,
    MatRipple,
    UiButtonComponent
  ],
  standalone: true
})

export class MyInformationComponent {}
