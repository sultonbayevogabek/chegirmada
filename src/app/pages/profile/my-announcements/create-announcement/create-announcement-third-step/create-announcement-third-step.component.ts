import { Component } from '@angular/core';
import { MatOption } from '@angular/material/autocomplete';
import { MatRadioButton } from '@angular/material/radio';
import { MatSelect } from '@angular/material/select';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatNativeDateModule, MatRipple } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInput, MatDatepickerModule } from '@angular/material/datepicker';
import { TranslateModule } from '@ngx-translate/core';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'create-announcement-third-step',
  standalone: true,
  imports: [
    MatOption,
    MatRadioButton,
    MatSelect,
    NgClass,
    FormsModule,
    MatIcon,
    MatRipple,
    MatDatepicker,
    MatDatepickerInput,
    TranslateModule,
    MatInput,
    MatDatepickerInput,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  templateUrl: './create-announcement-third-step.component.html',
  styleUrl: './create-announcement-third-step.component.scss'
})
export class CreateAnnouncementThirdStepComponent {
  currency: 'uzs' | 'usd' = 'uzs';
  discountType: number = 0;
  percentOrPriceType: 'percent' | 'uzs' | 'usd' | 'none' = 'none';
}
