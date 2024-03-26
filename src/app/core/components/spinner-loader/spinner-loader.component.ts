import { Component } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'spinner-loader',
  standalone: true,
  imports: [
    MatProgressSpinner
  ],
  templateUrl: 'spinner-loader.component.html',
  styleUrl: 'spinner-loader.component.scss'
})

export class SpinnerLoaderComponent {

}
