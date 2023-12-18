import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'header-top',
    templateUrl: './header-top.component.html',
    styleUrl: './header-top.component.scss',
    imports: [
        MatIconModule
    ],
    standalone: true
})

export class HeaderTopComponent {}
