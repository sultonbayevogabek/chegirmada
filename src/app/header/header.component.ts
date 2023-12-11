import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HeaderTopComponent } from './header-top/header-top.component';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    imports: [
        HeaderTopComponent
    ],
    standalone: true
})

export class HeaderComponent {

}
