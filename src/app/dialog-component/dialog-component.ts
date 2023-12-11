import { Component } from '@angular/core';
import { MatDialogContent } from '@angular/material/dialog';

@Component({
    selector: 'dialog-component',
    templateUrl: './dialog-component.html',
    imports: [
        MatDialogContent
    ],
    standalone: true
})

export class DialogComponent {}
