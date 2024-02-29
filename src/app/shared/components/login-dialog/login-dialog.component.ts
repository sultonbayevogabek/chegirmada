import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UiButtonComponent } from '../ui-button/ui-button.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPrefix } from '@angular/material/form-field';

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
    IconButtonComponent,
    FormsModule,
    MatPrefix,
    ReactiveFormsModule
  ],
  standalone: true,
  providers: [
    provideNgxMask()
  ]
})

export class LoginDialogComponent implements OnInit {
  selectedTab: 'phone' | 'code' | 'name' = 'phone';

  phoneForm = new FormGroup({
    phone_number: new FormControl('+998 ')
  })
  ngOnInit(): void {
  }

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
