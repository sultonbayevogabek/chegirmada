import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
   selector: 'location',
   templateUrl: 'location.component.html',
   styleUrls: [ 'location.component.scss' ],
   imports: [
      MatIconModule
   ],
   standalone: true
})

export class LocationComponent {}