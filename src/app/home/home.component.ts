import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    standalone: true,
    imports: [HeaderComponent]
})

export class HomeComponent {

}
