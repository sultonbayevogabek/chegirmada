import { Component, DestroyRef, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GeneralService } from '../../../../../core/services/general.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToasterService } from '../../../../../core/services/toaster.service';
import { TrimDirective } from '../../../../../core/directives/trim.directive';
import { TranslateModule } from '@ngx-translate/core';
import { NgTemplateOutlet } from '@angular/common';
import { UiButtonComponent } from '../../../../../core/components/ui-button/ui-button.component';

@Component({
  selector: 'create-announcement-second-step',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TrimDirective,
    TranslateModule,
    NgTemplateOutlet,
    UiButtonComponent
  ],
  providers: [
    GeneralService,
    ToasterService
  ],
  templateUrl: 'create-announcement-second-step.component.html',
  styleUrl: 'create-announcement-second-step.component.scss'
})

export class CreateAnnouncementSecondStepComponent implements OnInit {
  @Output() onFormStateChanged: EventEmitter<{ form: FormGroup<any>, step: number }> = new EventEmitter<{
    form: FormGroup<any>,
    step: number
  }>();
  @Output() onStepChanged: EventEmitter<number> = new EventEmitter<number>();

  secondStepForm = new FormGroup({
    title_uz: new FormControl('Polat Alandar erkaklar ich kiyimlari', [ Validators.required, Validators.maxLength(255) ]),
  });

  private _generalService = inject(GeneralService);
  private _toasterService = inject(ToasterService);
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.secondStepForm.valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(_ => {
        if (this.secondStepForm.invalid) {
          return;
        }
        this.onFormStateChanged.emit({ form: this.secondStepForm, step: 2 });
      });

    this._generalService.getCategoryFeatures(1)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(res => {
        console.log(res);
      })
  }

  goToThirdStep(): void {
    if (this.secondStepForm.invalid) {
      return;
    }

    this.onStepChanged.emit(3);
  }
}
