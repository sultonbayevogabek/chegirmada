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
import {
  CustomTemplate, CustomTemplateItem,
  FeatureTemplate,
  SelectedValue,
  Value
} from '../../../../../core/models/feature-template.model';
import { MatRipple } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { NewFeatureModalComponent } from '../../new-feature-modal/new-feature-modal.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

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
  customTemplates: CustomTemplate[] = [];


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
            selected: [ { feature_value: null, price: '', sign: '-' } ]
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

  removeFeatureItem(selected: SelectedValue[], i: number) {
    selected.splice(i, 1);
  }

  addNewFeature(selected: SelectedValue[]): void {
    selected.push({ feature_value: null, price: '', sign: '-' });
  }

  addNewValue(values: Value[], selectValue: SelectedValue): void {
    const newValueDialog = this._dialog.open(NewFeatureModalComponent, {
      width: '25rem',
      maxWidth: '100%',
      data: {
        dialogType: 'value'
      }
    });


    newValueDialog.afterClosed()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: value => {
          if (!value) return;

          const pk = `${ value }_${ values.length }`;

          values.push({
            pk,
            value
          });

          selectValue.feature_value = pk;
        }
      });
  }

  generateFeatures(): void {
    const data = {
      features: [],
      feature_custom_values: [],
      custom_features: []
    }
    this.featureTemplates.forEach(featureTemplate => {
      featureTemplate.selected.forEach(selectedValue => {
        const featureValue = selectedValue.feature_value;

        if (!featureValue) {
          return;
        }

        if (typeof featureValue === 'number') {
          let price: string;

          if (selectedValue.price) {
            price = `${ selectedValue.sign === '-' ? '-' : '' }${ (+selectedValue.price).toFixed(1) }`;
          } else {
            price = '0';
          }

          data.features.push({
            ...selectedValue,
            price
          });
        }

        if (typeof featureValue === 'string') {
          const idStartIndex = featureValue.lastIndexOf('_');
          let price: string;

          if (selectedValue.price) {
            price = `${ selectedValue.sign === '-' ? '-' : '' }${ (+selectedValue.price).toFixed(1) }`;
          } else {
            price = '0';
          }

          data.feature_custom_values.push({
            feature: featureTemplate.pk,
            value: featureValue.slice(0, idStartIndex),
            price
          });
        }
      });
    });

    this.customTemplates.forEach(customTemplate => {
      customTemplate.items.forEach(item => {
        if (!item.value) return;

        let price: string;

        if (item.price) {
          price = `${ item.sign === '-' ? '-' : '' }${ (+item.price).toFixed(1) }`;
        } else {
          price = '0';
        }

        data.custom_features.push({
          ...item,
          price
        })
      })
    })

    console.log(data);
  }

  addNewTemplate(): void {
    const newTemplateDialog = this._dialog.open(NewFeatureModalComponent, {
      width: '25rem',
      maxWidth: '100%',
      data: {
        dialogType: 'feature'
      }
    });


    newTemplateDialog.afterClosed()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: value => {
          if (!value) return;

          this.customTemplates.push({
            name: value,
            items: [ {
              value: '',
              price: '',
              sign: '-'
            } ]
          });
        }
      });
  }

  removeCustomTemplateItem(items: CustomTemplateItem[], index: number): void {
    items.splice(index, 1);
  }

  addCustomTemplateItem(items: CustomTemplateItem[]): void {
    items.push({
      value: '',
      price: '',
      sign: '-'
    });
  }
}
