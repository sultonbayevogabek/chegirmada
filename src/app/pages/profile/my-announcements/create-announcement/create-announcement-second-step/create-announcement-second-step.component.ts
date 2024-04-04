import { Component, DestroyRef, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { GeneralService } from '../../../../../core/services/general.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToasterService } from '../../../../../core/services/toaster.service';
import { TrimDirective } from '../../../../../core/directives/trim.directive';
import { TranslateModule } from '@ngx-translate/core';
import { NgTemplateOutlet } from '@angular/common';
import { UiButtonComponent } from '../../../../../core/components/ui-button/ui-button.component';
import { MatOption, MatSelect } from '@angular/material/select';
import { IconButtonComponent } from '../../../../../core/components/icon-button/icon-button.component';
import { FeatureTemplate, SelectedValue } from '../../../../../core/models/feature-template.model';
import { MatRipple } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { NewFeatureModalComponent } from '../../new-feature-modal/new-feature-modal.component';

@Component({
  selector: 'create-announcement-second-step',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TrimDirective,
    TranslateModule,
    NgTemplateOutlet,
    UiButtonComponent,
    MatSelect,
    MatOption,
    IconButtonComponent,
    FormsModule,
    MatRipple
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

  secondStepForm: UntypedFormGroup = new FormGroup({});
  featureTemplates: FeatureTemplate[] = [];

  private _generalService = inject(GeneralService);
  private _toasterService = inject(ToasterService);
  private _destroyRef = inject(DestroyRef);
  private _dialog = inject(MatDialog);

  ngOnInit(): void {
    this._generalService.getCategoryFeatures(1)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(res => {
        this.featureTemplates = res.map(item => {
          return {
            ...item,
            selected: [ { feature_value: null, price: '0', sign: '-' } ]
          };
        });
      });
  }

  goToThirdStep(): void {
    if (this.secondStepForm.invalid) {
      return;
    }

    this.onStepChanged.emit(3);
  }

  cons(): void {
    console.log(this.featureTemplates);
  }

  removeFeatureItem(selected: SelectedValue[], i: number) {
    selected.splice(i, 1);
  }

  addNewFeature(selected: SelectedValue[]): void {
    selected.push({ feature_value: null, price: '0', sign: '-' });
  }

  addNewOption(): void {
    const newFeatureDialog = this._dialog.open(NewFeatureModalComponent, {
      width: '25rem',
      maxWidth: '100%',
      data: {
        dialogType: 'value'
      }
    })
  }
}
