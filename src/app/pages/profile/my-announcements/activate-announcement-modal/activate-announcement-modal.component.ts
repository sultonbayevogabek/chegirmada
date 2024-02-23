import { Component } from '@angular/core';
import { IconButtonComponent } from '../../../../shared/components/icon-button/icon-button.component';
import { MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ScrollbarDirective } from '../../../../shared/directives/scrollbar/scrollbar.directive';
import { UiButtonComponent } from '../../../../shared/components/ui-button/ui-button.component';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'activate-announcement-modal',
  imports: [
    IconButtonComponent,
    MatDialogClose,
    MatDialogContent,
    MatRadioButton,
    MatRadioGroup,
    NgxMaskDirective,
    ScrollbarDirective,
    UiButtonComponent,
    MatSlider,
    MatSliderThumb,
    FormsModule
  ],
  templateUrl: './activate-announcement-modal.component.html',
  styleUrl: './activate-announcement-modal.component.scss',
  standalone: true,
  providers: [
    provideNgxMask()
  ]
})

export class ActivateAnnouncementModalComponent {
  count = 0
  count2 = 0
}
