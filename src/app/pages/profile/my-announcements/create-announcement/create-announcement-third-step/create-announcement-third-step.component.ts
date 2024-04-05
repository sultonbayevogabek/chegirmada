import { Component } from '@angular/core';
import { MatOption } from '@angular/material/autocomplete';
import { MatRadioButton } from '@angular/material/radio';
import { MatSelect } from '@angular/material/select';
import { NgClass } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatNativeDateModule, MatRipple } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInput, MatDatepickerModule } from '@angular/material/datepicker';
import { TranslateModule } from '@ngx-translate/core';
import { MatInput } from '@angular/material/input';
import { arrayMinLength } from '../../../../../core/validators/array-min-length.validator';

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

  thirdStepForm = new FormGroup({
    price: new FormControl(null, [Validators.required]),
    currency: new FormControl(1),
    product_counts: new FormControl(null, [Validators.required, Validators.max(2147483647), Validators.min(1)]),
    remainder: new FormControl(null, [Validators.required, Validators.max(2147483647)]),
    start_date: new FormControl(null, [Validators.required]),
    end_date: new FormControl(null, [Validators.required]),
    tags: new FormControl([], [arrayMinLength(1)])
  })
}
