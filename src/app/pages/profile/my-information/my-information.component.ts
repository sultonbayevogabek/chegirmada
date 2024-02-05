import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'my-information',
  templateUrl: 'my-information.component.html',
  styleUrl: 'my-information.component.scss',
  imports: [
    MatIcon,
    MatRipple
  ],
  standalone: true
})

export class MyInformationComponent {}
