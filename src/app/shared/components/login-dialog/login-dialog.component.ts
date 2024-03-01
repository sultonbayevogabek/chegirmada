import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DestroyRef, ElementRef,
  inject,
  OnInit,
  QueryList, Renderer2,
  ViewChildren
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UiButtonComponent } from '../ui-button/ui-button.component';
import { IconButtonComponent } from '../icon-button/icon-button.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatPrefix } from '@angular/material/form-field';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToasterComponent } from '../../../core/toaster/toaster.component';
import { ToasterService } from '../../../core/services/toaster.service';
import { AuthService } from '../../../core/services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    TranslateModule
  ],
  standalone: true,
  providers: [
    provideNgxMask(),
    AuthService
  ]
})

export class LoginDialogComponent implements OnInit, AfterViewInit {
  codeInputs: QueryList<ElementRef<HTMLInputElement>>;

  @ViewChildren('codeInput') set getCodeInputs(codeInputs: QueryList<ElementRef<HTMLInputElement>>) {
    this.codeInputsHandler(codeInputs);
  }

  private _translateService = inject(TranslateService);
  private _toaster = inject(ToasterService);
  private _authService = inject(AuthService);
  private _destroyRef = inject(DestroyRef);
  private _renderer = inject(Renderer2);

  activeLang = 'uz';
  step: 'phone' | 'code' | 'name' = 'phone';

  phoneForm = new FormGroup({
    phoneNumber: new FormControl('+998 ', [ Validators.minLength(9) ])
  });

  ngOnInit(): void {
    this.activeLang = this._translateService.currentLang || 'uz';
  }

  ngAfterViewInit(): void {
    console.log(this.codeInputs);
  }

  sendPhoneNumber(): void {
    if (this.phoneForm.invalid) {
      this._toaster.open({
        title: 'dear.user',
        message: 'enter.your.phone.number.correctly',
        type: 'warning'
      });
      return;
    }
    this.phoneForm.disable();
    this._authService.sendPhoneNumber(`+998${this.phoneForm.get('phoneNumber').value}`)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(res => {
        this.phoneForm.enable();
        this.step = 'code';
      });
  }

  back(): void {
    this.step = 'phone';
  }

  sendCode(): void {
    this.step = 'name';
  }

  codeInputsHandler(codeInputs: QueryList<ElementRef<HTMLInputElement>>): void {
    codeInputs.forEach((input, index) => {
      input.nativeElement.onkeydown = (e: KeyboardEvent) => {
        e.preventDefault();
        const key = e.key;

        if (key === 'Backspace') {
          this._renderer.setProperty(input.nativeElement, 'value', '');

          if (!index) {
            return;
          }

          codeInputs.get(index - 1).nativeElement.focus();
          return;
        }

        if (/^\d+$/.test(key)) {
          this._renderer.setProperty(input.nativeElement, 'value', key);
          if (index < 4) {
            codeInputs.get(index + 1).nativeElement.focus();
          }
        }
      };
    });
  }
}
