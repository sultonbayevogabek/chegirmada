import { Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import {
  MatAutocomplete,
  MatAutocompleteOrigin, MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatOption
} from '@angular/material/autocomplete';
import { MatRadioButton } from '@angular/material/radio';
import { MatSelect } from '@angular/material/select';
import { JsonPipe, LowerCasePipe, NgClass, NgTemplateOutlet } from '@angular/common';
import { Form, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatNativeDateModule, MatRipple } from '@angular/material/core';
import { MatDatepicker, MatDatepickerInput, MatDatepickerModule } from '@angular/material/datepicker';
import { TranslateModule } from '@ngx-translate/core';
import { MatInput } from '@angular/material/input';
import { arrayMinLength } from '../../../../../core/validators/array-min-length.validator';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MyAnnouncementsService } from '../../../../../core/services/my-announcements.service';
import { UiButtonComponent } from '../../../../../core/components/ui-button/ui-button.component';
import { TagModel } from '../../../../../core/models/tag.model';
import { OverlayComponent } from '../../../../../core/components/overlay-panel/overlay-panel.component';
import { ScrollbarDirective } from '../../../../../core/directives/scrollbar.directive';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MyStoreService } from '../../../../../core/services/my-store.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { BranchModel } from '../../../../../core/models/branch.model';
import { ToasterService } from '../../../../../core/services/toaster.service';
import { newPrice } from '../../../../../core/validators/new-price.validator';
import { ProductDetails } from '../../../../../core/models/product-details.model';

@Component({
  selector: 'edit-announcement-second-step',
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
    ReactiveFormsModule,
    NgTemplateOutlet,
    UiButtonComponent,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatAutocompleteOrigin,
    OverlayComponent,
    ScrollbarDirective,
    NgxMaskDirective,
    LowerCasePipe,
    JsonPipe
  ],
  providers: [
    MyAnnouncementsService,
    MyStoreService,
    provideNgxMask(),
    ToasterService
  ],
  templateUrl: 'edit-announcement-second-step.component.html',
  styleUrls: [
    'edit-announcement-second-step.component.scss',
    '../../create-announcement/create-announcement-second-step/create-announcement-second-step.component.scss'
  ]
})

export class EditAnnouncementSecondStepComponent implements OnInit {
  @Output() onFormStateChanged: EventEmitter<{ form: FormGroup<any>, step: number }> = new EventEmitter<{
    form: FormGroup<any>,
    step: number
  }>();

  @Output() onStepChanged: EventEmitter<number> = new EventEmitter<number>();
  @Input() productDetails: ProductDetails;

  tags: {
    searchedTags: TagModel[];
    selectedTags: TagModel[];
  } = {
    searchedTags: [],
    selectedTags: []
  };
  customPatterns = {
    B: { pattern: new RegExp('[a-zA-Z_]') }
  };
  branches: BranchModel[] = [];

  private _destroyRef = inject(DestroyRef);
  private _myAnnouncementsService = inject(MyAnnouncementsService);
  private _myStoreService = inject(MyStoreService);
  private _authService = inject(AuthService);
  private _toasterService = inject(ToasterService);

  secondStepForm = new FormGroup({
    price: new FormControl<number>(null, [ Validators.required ]),
    currency: new FormControl<1 | 2>(1),
    product_counts: new FormControl<number>(100, [ Validators.max(2147483647) ]),
    remainder: new FormControl<number>(76, [ Validators.max(2147483647) ]),
    start_date: new FormControl<Date>(new Date(), [ Validators.required ]),
    end_date: new FormControl<Date>(new Date(), [ Validators.required ]),
    tags: new FormControl<number[]>([]),
    new_tags: new FormControl<string[]>([]),
    store_branches: new FormControl<number[]>([]),

    // regular
    discount_amount: new FormControl(45, [
      Validators.required,
      Validators.min(1), Validators.max(100)
    ]),
    discount_amount_is_percent: new FormControl(true),

    // helper fields
    discount_type: new FormControl<string>('regular'),
    regular_discount_type: new FormControl('percent')
  });

  ngOnInit(): void {
    this._authService.currentUser$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: user => {
          this.getBranches(user.store_id);
        }
      });

    // watch regular_discount_type change
    this.secondStepForm.get('regular_discount_type').valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(value => {
        const discountAmountControl = this.secondStepForm.get('discount_amount');
        discountAmountControl.markAsTouched();
        this.secondStepForm.get('discount_amount_is_percent')
          .setValue(value === 'percent');

        if (value === 'percent') {
          discountAmountControl.setValidators([
            Validators.min(1),
            Validators.max(100)
          ]);
          this.secondStepForm.removeValidators([ newPrice ]);
        } else {
          discountAmountControl.clearValidators();
          discountAmountControl.setValidators([ Validators.required ]);
          this.secondStepForm.addValidators([ newPrice ]);
        }
        discountAmountControl.updateValueAndValidity();
      });

    this.secondStepForm.valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(_ => {
        console.log('FormGroup', this.secondStepForm);
        if (this.secondStepForm.invalid) {
          return;
        }
        this.onFormStateChanged.emit({ form: this.secondStepForm, step: 2 });
      });
  }

  changeCurrency(currency: 1 | 2): void {
    this.secondStepForm.get('currency').setValue(currency);
    const regularDiscountType = this.secondStepForm.get('regular_discount_type');
    if (regularDiscountType.value !== 'percent') {
      regularDiscountType.setValue(currency === 1 ? 'uzs' : 'usd');
    }
  }

  searchTags(search: string): void {
    if (search.trim().length < 2) {
      return;
    }

    this._myAnnouncementsService.getTags(search)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(res => {
        this.tags.searchedTags = res.tags;
      });
  }

  displayFn(value: TagModel): string {
    return value.name;
  }

  selectTag($event: MatAutocompleteSelectedEvent): void {
    const id = $event.option.value.pk;
    const ids: number[] = this.secondStepForm.get('tags').value;
    if (!ids.includes(id)) {
      ids.push(id);
      this.secondStepForm.get('tags').setValue(ids);
      this.tags.selectedTags.push($event.option.value);
    }
  }

  removeTag(i: number, tagType: 'selected' | 'new') {
    if (tagType === 'selected') {
      const ids: number[] = this.secondStepForm.get('tags').value;
      ids.splice(i, 1);
      this.secondStepForm.get('tags').setValue(ids);
      this.tags.selectedTags.splice(i, 1);
    }
    if (tagType === 'new') {
      const newTags: string[] = this.secondStepForm.get('new_tags').value;
      newTags.splice(i, 1);
      this.secondStepForm.get('new_tags').setValue(newTags);
    }
  }

  addNewTag(newTagInput: HTMLInputElement): void {
    const newTag = newTagInput.value;
    const newTags: string[] = this.secondStepForm.get('new_tags').value;
    if (!newTags.includes(newTag)) {
      newTags.push(newTag);
      this.secondStepForm.get('new_tags').setValue(newTags);
      newTagInput.value = '';
    }
  }

  getBranches(storeId: number): void {
    this._myStoreService.getBranches(storeId)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(res => {
        this.branches = res;
      });
  }

  goToThirdStep(): void {
    this.secondStepForm.markAllAsTouched();

    if (this.secondStepForm.invalid) {
      this._toasterService.open({
        message: 'fill.in.the.required.fields',
        title: 'dear.user',
        type: 'warning'
      });
      return;
    }

    if (this.secondStepForm.disabled) {
      return;
    }

    this.onStepChanged.emit(3);
  }

  back(): void {
    this.onStepChanged.emit(1);
  }
}
