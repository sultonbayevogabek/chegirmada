import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  CustomTemplate,
  CustomTemplateItem,
  FeatureTemplate,
  SelectedValue,
  Value
} from '../../../../../core/models/feature-template.model';
import { MatRipple } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { NewFeatureModalComponent } from '../../new-feature-modal/new-feature-modal.component';
import { DiscountUpdateData } from '../../../../../core/models/discount-update-data.model';

@Component({
  selector: 'edit-announcement-third-step',
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
  templateUrl: 'edit-announcement-third-step.component.html',
  styleUrls: [
    'edit-announcement-third-step.component.scss',
    '../../create-announcement/create-announcement-third-step/create-announcement-third-step.component.scss'
  ]
})

export class EditAnnouncementThirdStepComponent implements OnInit, OnChanges {
  @Output() onFormStateChanged: EventEmitter<{ form: any, step: number }> = new EventEmitter<{
    form: any,
    step: number
  }>();
  @Output() onStepChanged: EventEmitter<number> = new EventEmitter<number>();
  @Input() productDetails: DiscountUpdateData;
  @Input() loading = false;

  featureTemplates: FeatureTemplate[] = [];
  customTemplates: CustomTemplate[] = [];

  data = {
    features: [],
    custom_features: []
  };


  private _generalService = inject(GeneralService);
  private _toasterService = inject(ToasterService);
  private _destroyRef = inject(DestroyRef);
  private _dialog = inject(MatDialog);

  ngOnInit(): void {
    this._generalService.getCategoryFeatures(this.productDetails.categories[2].pk)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(res => {
        this.featureTemplates = res.map(item => {
          return {
            ...item,
            selected: [ { feature_value: null, price: '', sign: '-' } ]
          };
        });
        this.featureTemplates.map(featureTemplate => {
          const exist = this.productDetails.features_read_only.find(i => i.name === featureTemplate.name && !i.is_custom);

          if (exist) {
            featureTemplate.selected = [];
            exist.values.forEach(i => {
              featureTemplate.selected.push({
                feature_value: i.pk,
                price: '0',
                sign: '-'
              })
            })
          }
        })

        this.productDetails.features_read_only.forEach(feature => {
          if (!feature.is_custom) return;

          this.customTemplates.push({
            name: feature.name,
            items: feature.values.map(i => {
              return {
                value: i.value,
                price: '0',
                sign: '-'
              }
            })
          })
        })
      });
  }

  transformDataAndEmit(): void {
    this.data = {
      features: [],
      custom_features: []
    };

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

          this.data.features.push({
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

          this.data.custom_features.push({
            feature: featureTemplate.pk,
            name: '',
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

        this.data.custom_features.push({
          feature: null,
          name: customTemplate.name,
          value: item.value,
          price
        });
      });
    });

    this.onFormStateChanged.emit({
      form: {
        invalid: false,
        valid: true,
        ...this.data
      },
      step: 3
    });
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

  ngOnChanges(changes: SimpleChanges): void {
  }

  back(): void {
    this.onStepChanged.emit(2);
  }
}
