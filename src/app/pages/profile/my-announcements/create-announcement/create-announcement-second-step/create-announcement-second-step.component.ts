import { Component, DestroyRef, EventEmitter, inject, OnInit, Output } from '@angular/core';
import {
  MatAutocomplete,
  MatAutocompleteOrigin, MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatOption
} from '@angular/material/autocomplete';
import { MatRadioButton } from '@angular/material/radio';
import { MatSelect } from '@angular/material/select';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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

@Component({
  selector: 'create-announcement-second-step',
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
    NgxMaskDirective
  ],
  providers: [
    MyAnnouncementsService,
    MyStoreService,
    provideNgxMask(),
    ToasterService
  ],
  templateUrl: './create-announcement-second-step.component.html',
  styleUrl: './create-announcement-second-step.component.scss'
})

export class CreateAnnouncementSecondStepComponent implements OnInit {
  @Output() onFormStateChanged: EventEmitter<{ form: FormGroup<any>, step: number }> = new EventEmitter<{
    form: FormGroup<any>,
    step: number
  }>();

  @Output() onStepChanged: EventEmitter<number> = new EventEmitter<number>();

  tags: {
    searchedTags: TagModel[];
    selectedTags: TagModel[];
  } = {
    searchedTags: [],
    selectedTags: []
  }
  customPatterns = {
    B: { pattern: new RegExp('[a-zA-Z_]') }
  };
  branches: BranchModel[] = [];

  private _destroyRef = inject(DestroyRef);
  private _myAnnouncementsService = inject(MyAnnouncementsService);
  private _myStoreService = inject(MyStoreService);
  private _authService = inject(AuthService);
  private _toasterService = inject(ToasterService);

  thirdStepForm = new FormGroup({
    price: new FormControl(100000, [ Validators.required ]),
    currency: new FormControl<1 | 2>(1),
    product_counts: new FormControl<number>(100, [ Validators.required, Validators.max(2147483647), Validators.min(1) ]),
    remainder: new FormControl<number>(76, [ Validators.required, Validators.max(2147483647) ]),
    start_date: new FormControl<Date>(new Date(), [ Validators.required ]),
    end_date: new FormControl<Date>(new Date(), [ Validators.required ]),
    tags: new FormControl<number[]>([10115], [ arrayMinLength(1) ]),
    new_tags: new FormControl<string[]>(['telefonlar', 'elektronika'], [ arrayMinLength(1) ]),
    store_branches: new FormControl<number[]>([], [ arrayMinLength(1) ]),

    // regular
    discount_amount: new FormControl(45, [ Validators.required ]),
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
      })

    // watch regular_discount_type change
    this.thirdStepForm.get('regular_discount_type').valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(value => {
        this.thirdStepForm.get('discount_amount_is_percent')
          .setValue(value === 'percent');
      });
  }

  changeCurrency(currency: 1 | 2): void {
    this.thirdStepForm.get('currency').setValue(currency);
    const regularDiscountType = this.thirdStepForm.get('regular_discount_type');
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
    const ids: number[] = this.thirdStepForm.get('tags').value;
    if (!ids.includes(id)) {
      ids.push(id);
      this.thirdStepForm.get('tags').setValue(ids);
      this.tags.selectedTags.push($event.option.value);
    }
  }

  removeTag(i: number, tagType: 'selected' | 'new') {
    if (tagType === 'selected') {
      const ids: number[] = this.thirdStepForm.get('tags').value;
      ids.splice(i, 1);
      this.thirdStepForm.get('tags').setValue(ids);
      this.tags.selectedTags.splice(i, 1);
    }
    if (tagType === 'new') {
      const newTags: string[] = this.thirdStepForm.get('new_tags').value;
      newTags.splice(i, 1);
      this.thirdStepForm.get('new_tags').setValue(newTags);
    }
  }

  addNewTag(newTagInput: HTMLInputElement): void {
    const newTag = newTagInput.value;
    const newTags: string[] = this.thirdStepForm.get('new_tags').value;
    if (!newTags.includes(newTag)) {
      newTags.push(newTag);
      this.thirdStepForm.get('new_tags').setValue(newTags);
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
    this.thirdStepForm.markAllAsTouched();

    if (this.thirdStepForm.invalid) {
      this._toasterService.open({
        message: 'fill.in.the.required.fields',
        title: 'dear.user',
        type: 'warning'
      })
      return;
    }

    if (this.thirdStepForm.disabled) {
      return;
    }

    this.onStepChanged.emit(2);
  }
}
