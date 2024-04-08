import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef, HostListener,
  inject,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UiButtonComponent } from '../ui-button/ui-button.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatPrefix } from '@angular/material/form-field';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToasterService } from '../../services/toaster.service';
import { AuthService } from '../../services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DecimalPipe } from '@angular/common';
import { PhoneNumberPipe } from '../../pipes/phone-number.pipe';
import { interval, Subscription } from 'rxjs';
import { ScrollbarDirective } from '../../directives/scrollbar.directive';

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
    ReactiveFormsModule,
    TranslateModule,
    DecimalPipe,
    PhoneNumberPipe,
    ScrollbarDirective
  ],
  standalone: true,
  providers: [
    provideNgxMask(),
    AuthService
  ]
})

export class LoginDialogComponent implements OnInit, AfterViewInit {
  @ViewChildren('codeInput') set getCodeInputs(codeInputs: QueryList<ElementRef<HTMLInputElement>>) {
    this.codeInputsHandler(codeInputs);
  }

  @HostListener('paste', [ '$event' ]) paste($event: ClipboardEvent) {
    this.pasteCode($event);
  }

  private _translateService = inject(TranslateService);
  private _dialogRef = inject(MatDialogRef);
  private _toaster = inject(ToasterService);
  private _authService = inject(AuthService);
  private _destroyRef = inject(DestroyRef);
  private _intervalSubscription: Subscription;

  activeLang = 'uz';
  step: 'phone' | 'code' = 'phone';

  phoneForm = new FormGroup({
    phoneNumber: new FormControl('+998 ', [ Validators.required, Validators.minLength(9) ])
  });

  codeForm = new FormGroup({
    '0': new FormControl('', [ Validators.required ]),
    '1': new FormControl('', [ Validators.required ]),
    '2': new FormControl('', [ Validators.required ]),
    '3': new FormControl('', [ Validators.required ]),
    '4': new FormControl('', [ Validators.required ]),
    attemptsCount: new FormControl(0),
    remainedTime: new FormControl(60),
    invalidCode: new FormControl(true)
  });

  ngOnInit(): void {
    this.activeLang = this._translateService.currentLang || 'uz';
  }

  ngAfterViewInit(): void {
  }

  sendPhoneNumber(): void {
    if (this.phoneForm.invalid || this.phoneForm.disabled) {
      return;
    }

    if (this._intervalSubscription) {
      this._intervalSubscription.unsubscribe();
    }

    this.phoneForm.disable();

    this._authService.sendPhoneNumber(`+998${ this.phoneForm.get('phoneNumber').value }`)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: res => {
          this.phoneForm.enable();

          if (!res.code) {
            return;
          }

          this.resetCodeForm();
          this.countDown();
          this.step = 'code';
        },
        error: _ => {
          this.phoneForm.enable();
          this._toaster.open({
            title: 'dear.user',
            message: 'enter.your.phone.number.correctly',
            type: 'error'
          });
        }
      });
  }

  codeInputsHandler(codeInputs: QueryList<ElementRef<HTMLInputElement>>): void {
    codeInputs.first?.nativeElement.focus();

    codeInputs.forEach((input, index) => {
      input.nativeElement.onkeydown = (e: KeyboardEvent) => {
        const key = e.key;

        if (!((e.ctrlKey || e.metaKey) && e.key === 'v') && e.key !== 'Enter') {
          e.preventDefault();
        }

        if (key === 'Backspace') {
          this.codeForm.get(index.toString()).setValue('');

          if (!index) {
            return;
          }

          codeInputs.get(index - 1).nativeElement.focus();
          return;
        }

        if (/^\d+$/.test(key)) {
          this.codeForm.get(index.toString()).setValue(key);

          if (index < 4) {
            codeInputs.get(index + 1).nativeElement.focus();
          }
        }
      };

      input.nativeElement.onpaste = (e: ClipboardEvent) => {
        this.pasteCode(e);
      }
    });
  }

  back(): void {
    this.resetCodeForm();
    this.step = 'phone';
  }

  sendCode(): void {
    if (this.codeForm.get('attemptsCount').value === 3) {
      this._toaster.open({
        title: 'dear.user',
        message: 'attempts.exceeded',
        type: 'warning'
      });
      return;
    }

    if (!this.codeForm.get('remainedTime').value) {
      this._toaster.open({
        title: 'dear.user',
        message: 'you.have.timed.out.to.enter.your.verification.code',
        type: 'warning'
      });
      return;
    }

    if (this.codeForm.invalid || this.codeForm.disabled) {
      return;
    }

    let phoneNumber = `+998${ this.phoneForm.get('phoneNumber').value }`;
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += this.codeForm.get(i.toString()).value;
    }
    this.codeForm.disable();

    this._authService.sendCode(phoneNumber, code)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: res => {
          if (res.token) {
            localStorage.setItem('token', res.token);
            this._dialogRef.close({
              authorized: true
            });
          }
        },
        error: err => {
          this.codeForm.enable();

          let attempts = this.codeForm.get('attemptsCount').value;
          this.codeForm.get('attemptsCount').setValue(++attempts);

          let errorMessage = '';

          if (err?.detail?.auth_code?.includes('Invalid auth code')) {
            errorMessage = 'entered.code.is.incorrect';
            this.codeForm.get('invalidCode').setValue(true);
          }

          this._toaster.open({
            message: errorMessage,
            type: 'error',
            title: 'attention'
          });
        }
      });
  }

  pasteCode($event: ClipboardEvent): void {
    $event.preventDefault();

    const code = $event.clipboardData.getData('text');

    if (code && /(?<!\d)\d{5}(?!\d)/.test(code) && this.step === 'code') {
      for (let i = 0; i < 5; i++) {
        this.codeForm.get(i.toString()).setValue(code[i]);
      }
    }
  }

  countDown(): void {
    let remainedTime = this.codeForm.get('remainedTime').value;
    this._intervalSubscription = interval(1000)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(_ => {
        if (!remainedTime) {
          this._intervalSubscription.unsubscribe();
          return;
        }

        remainedTime--;
        this.codeForm.get('remainedTime').setValue(remainedTime);
      });
  }

  resetCodeForm(): void {
    this.codeForm.reset({
      '0': '',
      '1': '',
      '2': '',
      '3': '',
      '4': '',
      attemptsCount: 0,
      remainedTime: 60,
      invalidCode: false
    });
  }

  resendCode(): void {
    this.sendPhoneNumber();
  }
}
