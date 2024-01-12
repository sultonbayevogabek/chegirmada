import { Component } from '@angular/core';
import { HeaderTopComponent } from './header-top/header-top.component';
import { HeaderMiddleComponent } from './header-middle/header-middle.component';
import { HeaderBottomComponent } from './header-bottom/header-bottom.component';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  imports: [
    HeaderTopComponent,
    HeaderMiddleComponent,
    HeaderBottomComponent,
    NgScrollbarModule
  ],
  standalone: true
})

export class HeaderComponent {

}
