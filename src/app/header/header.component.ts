import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HeaderTopComponent } from './header-top/header-top.component';
import { HeaderMiddleComponent } from './header-middle/header-middle.component';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    imports: [
        HeaderTopComponent,
        HeaderMiddleComponent
    ],
    standalone: true
})

export class HeaderComponent {

}
