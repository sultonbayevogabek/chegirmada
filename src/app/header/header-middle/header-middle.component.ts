import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'header-middle',
    templateUrl: './header-middle.component.html',
    styleUrls: [ './header-middle.component.scss' ],
    imports: [
        RouterLink,
        NgOptimizedImage,
        MatIconModule
    ],
    standalone: true
})

export class HeaderMiddleComponent {

}
