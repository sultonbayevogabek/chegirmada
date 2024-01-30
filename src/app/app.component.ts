import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
   imports: [
      RouterOutlet,
      HeaderComponent
   ],
  standalone: true
})

export class AppComponent {
}
