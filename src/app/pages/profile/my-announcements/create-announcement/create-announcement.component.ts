import { Component, HostListener, inject, OnInit } from '@angular/core';
import { MatRipple } from '@angular/material/core';
import { NgClass, NgTemplateOutlet } from '@angular/common';
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
  ]
})

export class CreateAnnouncementComponent implements OnInit {
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    $event.returnValue = false;
  }

  currentTab = 3;
  readonly Array = Array;
  data = {
    '1': null,
    '2': null,
    '3': null
  }
  private _toaster = inject(ToasterService);


  ngOnInit(): void {
  }

  onFormStateChanged({ form, step }: { form: Partial<any>; step: number }): void {
    console.log(form);
    this.data[step] = form;
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
}
