import { Component } from '@angular/core';
import { HeaderTopComponent } from './header-top/header-top.component';
import { HeaderMiddleComponent } from './header-middle/header-middle.component';
import { HeaderBottomComponent } from './header-bottom/header-bottom.component';

@Component({
  selector: 'site-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [
    HeaderTopComponent,
    HeaderMiddleComponent,
    HeaderBottomComponent
  ],
  standalone: true
})

export class HeaderComponent {
}
