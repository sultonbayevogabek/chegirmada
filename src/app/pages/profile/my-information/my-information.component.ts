import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';
import { BlueButtonComponent } from '../../../shared/components/blue-button/blue-button.component';

@Component({
  selector: 'my-information',
  templateUrl: 'my-information.component.html',
  styleUrl: 'my-information.component.scss',
  imports: [
    MatIcon,
    MatRipple,
    BlueButtonComponent
  ],
  standalone: true
})

export class MyInformationComponent {}
