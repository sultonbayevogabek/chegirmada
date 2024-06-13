import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { formatDate, Location, NgClass, NgTemplateOutlet } from '@angular/common';
import { ToasterService } from '../../../../core/services/toaster.service';
import {
  EditAnnouncementFirstStepComponent
} from './edit-announcement-first-step/edit-announcement-first-step.component';
import {
  EditAnnouncementThirdStepComponent
} from './edit-announcement-third-step/edit-announcement-third-step.component';
import { IconButtonComponent } from '../../../../core/components/icon-button/icon-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  EditAnnouncementSecondStepComponent
} from './edit-announcement-second-step/edit-announcement-second-step.component';
import { MyAnnouncementsService } from '../../../../core/services/my-announcements.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductDetails } from '../../../../core/models/product-details.model';
import { DiscountUpdateData } from '../../../../core/models/discount-update-data.model';

@Component({
  selector: 'edit-announcement',
  templateUrl: 'edit-announcement.component.html',
  styleUrls: [
    'edit-announcement.component.scss',
    '../create-announcement/create-announcement.component.scss'
  ],
  standalone: true,
  imports: [
    IconButtonComponent,
    MatRipple,
    EditAnnouncementFirstStepComponent,
    NgTemplateOutlet,
    EditAnnouncementThirdStepComponent,
    TranslateModule,
    RouterLink,
    NgClass,
    EditAnnouncementSecondStepComponent
  ]
})

export class EditAnnouncementComponent implements OnInit {
  /*@HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    $event.returnValue = false;
  }*/

  loading = true;
  currentTab = 1;
  readonly Array = Array;
  data = {
    '1': null,
    '2': null,
    '3': null
  };
  details: DiscountUpdateData;

  private _toaster = inject(ToasterService);
  private _myAnnouncementService = inject(MyAnnouncementsService);
  private _activatedRoute = inject(ActivatedRoute);
  private _destroyRef = inject(DestroyRef);
  private _location = inject(Location);

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails(): void {
    this._myAnnouncementService.discountDataForEditing$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(data => {
        this.details = data;
      });
  }

  changeTab(tab: number): void {
    switch (tab) {
      case 1:
        this.currentTab = tab;
        break;
      case 2:
        if (!this.data['1'] || this.data['1'] && this.data['1'].invalid) {
          return;
        }
        this.currentTab = tab;
        break;
      case 3:
        if ((!this.data['1'] || this.data['1'] && this.data['1'].invalid) || (!this.data['2'] || this.data['2'] && this.data['2'].invalid)) {
          return;
        }
        this.currentTab = tab;
        break;
    }
  }

  onFormStateChanged({ form, step }: { form: Partial<any>; step: number }): void {
    this.data[step] = form;

    if (step === 3) {
      this.createAnnouncement();
    }
  }

  createAnnouncement(): void {
    const data = {
      ...this.data['1'].getRawValue(),
      ...this.data['2'].getRawValue(),
      ...this.data['3'],
      is_active: true,
      is_modified: true
    };
    const formData = new FormData();

    for (const key in data) {
      const value = data[key];

      if ([ 'start_date', 'end_date' ].includes(key)) {
        formData.append(key, formatDate(value, 'yyyy-MM-dd', 'ru'));
      }
      else if ([ 'store_branches', 'tags', 'new_tags' ].includes(key)) {
        value.forEach((item: any) => {
          formData.append(key, item);
        });
      }
      else if ('images' === key) {
        value.forEach((item: any) => {
          if (typeof item === 'object') {
            formData.append('modified_images', item?.file);
          } else {
            formData.append('modified_images', item);
          }
        });
      }
      else if (key === 'custom_features') {
        value.forEach((item: { value: string; price: string; feature: number; name: string }, index: number) => {
          formData.append(`custom_features[${ index }]value`, item.value);
          formData.append(`custom_features[${ index }]name`, item.name ? item.name : '');
          formData.append(`custom_features[${ index }]feature`, item.feature ? item.feature.toString() : '');
          formData.append(`custom_features[${ index }]price`, item.price);
        });
      } else if (key === 'features') {
        value.forEach((item: { feature_value: string; price: string }, index: number) => {
          formData.append(`features[${ index }]feature_value`, item.feature_value);
          formData.append(`features[${ index }]price`, item.price);
        });
      } else {
        formData.append(key, value);
      }
    }

    this._myAnnouncementService.updateStandardDiscount(this.details.pk, formData)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(res => {
        this._toaster.open({
          title: 'attention',
          message: 'changes.successfully.changed',
        })
        this._location.back();
      });
  }

  back(): void {
    this._location.back();
  }
}
