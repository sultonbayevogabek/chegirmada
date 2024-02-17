import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UiButtonComponent } from '../ui-button/ui-button.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';

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
    UiButtonComponent,
    IconButtonComponent
  ],
  standalone: true,
  providers: [
    provideNgxMask()
  ]
})

export class LoginDialogComponent {
  selectedTab: 'phone' | 'code' | 'name' = 'phone';

  sendPhoneNumber(): void {
    this.selectedTab = 'code';
  }

  back(): void {
    this.selectedTab = 'phone';
  }

  sendCode(): void {
    this.selectedTab = 'name';
  }
}
