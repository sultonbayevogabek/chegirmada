import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BlueButtonComponent } from '../blue-button/blue-button.component';

@Component({
  selector: 'login-dialog',
  templateUrl: 'login-dialog.component.html',
  styleUrl: 'login-dialog.component.scss',
  imports: [
    MatIconModule,
    MatDialogContent,
    MatDialogClose,
    NgxMaskDirective,
    MatProgressSpinnerModule,
    BlueButtonComponent
  ],
  standalone: true,
  providers: [
    provideNgxMask()
  ]
})

export class LoginDialogComponent {
  selectedTab: 'phone' | 'code' = 'phone';

  sendPhoneNumber(): void {
    this.selectedTab = 'code';
  }

  back(): void {
    this.selectedTab = 'phone';
  }
}
