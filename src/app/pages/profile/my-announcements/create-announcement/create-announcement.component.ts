import { Component, DestroyRef, HostListener, inject, OnInit } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { formatDate, NgClass, NgTemplateOutlet } from '@angular/common';
import { ToasterService } from '../../../../core/services/toaster.service';
import {
  CreateAnnouncementFirstStepComponent
} from './create-announcement-first-step/create-announcement-first-step.component';
import {
  CreateAnnouncementThirdStepComponent
} from './create-announcement-third-step/create-announcement-third-step.component';
import { IconButtonComponent } from '../../../../core/components/icon-button/icon-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import {
  CreateAnnouncementSecondStepComponent
} from './create-announcement-second-step/create-announcement-second-step.component';
import { MyAnnouncementsService } from '../../../../core/services/my-announcements.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'create-announcement',
  templateUrl: 'create-announcement.component.html',
  styleUrl: 'create-announcement.component.scss',
  standalone: true,
  imports: [
    IconButtonComponent,
    MatRipple,
    CreateAnnouncementFirstStepComponent,
    NgTemplateOutlet,
    CreateAnnouncementThirdStepComponent,
    TranslateModule,
    RouterLink,
    NgClass,
    CreateAnnouncementSecondStepComponent
  ],
  providers: [
    MyAnnouncementsService
  ]
})

export class CreateAnnouncementComponent implements OnInit {
  /*@HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    $event.returnValue = false;
  }*/

  currentTab = 1;
  readonly Array = Array;
  data = {
    '1': null,
    '2': null,
    '3': null
  };
  private _toaster = inject(ToasterService);
  private _myAnnouncementService = inject(MyAnnouncementsService);
  private _destroyRef = inject(DestroyRef);


  ngOnInit(): void {
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
      ...this.data['2'],
      ...this.data['3'].getRawValue()
    };
    console.log(data);
    const formData = new FormData();

    for (const key in data) {
      const value = data[key];

      if ([ 'start_date', 'end_date' ].includes(key)) {
        formData.append(key, formatDate(value, 'yyyy-MM-dd', 'ru'));
      }

      else if (['images',  'store_branches'].includes(key)) {
        value.forEach((item: any) => {
          formData.append(key, item);
        });
      }

      else if (['custom_features', 'features'].includes(key)) {
        value.forEach((item: any) => {
          formData.append(key, JSON.stringify(item));
        });
      }

      else {
        formData.append(key, value);
      }
    }

    this._myAnnouncementService.createStandardDiscount(formData)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();
  }
}
