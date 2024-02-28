import { Component, inject, OnInit } from '@angular/core';
import { IconButtonComponent } from '../../../../shared/components/icon-button/icon-button.component';
import { MatRipple } from '@angular/material/core';
import { NgTemplateOutlet } from '@angular/common';
import { ToasterService } from '../../../../core/services/toaster.service';
import {
  CreateAnnouncementFirstStepComponent
} from './create-announcement-first-step/create-announcement-first-step.component';
import {
  CreateAnnouncementThirdStepComponent
} from './create-announcement-third-step/create-announcement-third-step.component';

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
    CreateAnnouncementThirdStepComponent
  ]
})

export class CreateAnnouncementComponent implements OnInit {
  currentTab = 1;
  readonly Array = Array;
  private _toaster = inject(ToasterService);

  ngOnInit(): void {
  }
}
