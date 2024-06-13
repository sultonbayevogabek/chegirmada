import {
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { DragAndDropDirective } from '../../../../../core/directives/drag-and-drop.directive';
import { MatDatepicker, MatDatepickerInput } from '@angular/material/datepicker';
import { MatIcon } from '@angular/material/icon';
import { MatNativeDateModule, MatOption, MatRipple } from '@angular/material/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IconButtonComponent } from '../../../../../core/components/icon-button/icon-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatSelect } from '@angular/material/select';
import { CATEGORIES } from '../../../../../core/constants/categories';
import { UiButtonComponent } from '../../../../../core/components/ui-button/ui-button.component';
import { TrimDirective } from '../../../../../core/directives/trim.directive';
import { NgTemplateOutlet } from '@angular/common';
import { GeneralService } from '../../../../../core/services/general.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SecondLevelCategory, ThirdLevelCategory } from '../../../../../core/models/categories.model';
import { OverlayComponent } from '../../../../../core/components/overlay-panel/overlay-panel.component';
import { YoutubePlayer } from '../../../../../core/components/youtube-player/youtube-player.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { youtubeVideoURL } from '../../../../../core/validators/youtube-video.validator';
import { arrayMinLength } from '../../../../../core/validators/array-min-length.validator';
import { ToasterService } from '../../../../../core/services/toaster.service';
import { DiscountUpdateData } from '../../../../../core/models/discount-update-data.model';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'edit-announcement-first-step',
  standalone: true,
  imports: [
    CdkDrag,
    CdkDropList,
    DragAndDropDirective,
    IconButtonComponent,
    MatDatepicker,
    MatDatepickerInput,
    MatIcon,
    MatRipple,
    ReactiveFormsModule,
    FormsModule,
    MatNativeDateModule,
    TranslateModule,
    MatSelect,
    MatOption,
    UiButtonComponent,
    TrimDirective,
    NgTemplateOutlet,
    CdkDragPlaceholder,
    OverlayComponent,
    YoutubePlayer,
    MatProgressSpinner,
    MatTooltip
  ],
  providers: [
    GeneralService,
    ToasterService
  ],
  templateUrl: 'edit-announcement-first-step.component.html',
  styleUrls: [
    'edit-announcement-first-step.component.scss',
    '../../create-announcement/create-announcement-first-step/create-announcement-first-step.component.scss'
  ]
})

export class EditAnnouncementFirstStepComponent implements OnInit, OnChanges {
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;
  @ViewChild('videoPreviewPanel') videoPreviewPanel: OverlayComponent;

  @Output() onFormStateChanged: EventEmitter<{ form: FormGroup<any>, step: number }> = new EventEmitter<{
    form: FormGroup<any>,
    step: number
  }>();
  @Output() onStepChanged: EventEmitter<number> = new EventEmitter<number>();
  @Input() productDetails: DiscountUpdateData;

  date: Date = new Date();

  categories = CATEGORIES;
  secondLevelCategories: SecondLevelCategory[] = [];
  thirdLevelCategories: ThirdLevelCategory[] = [];
  firstStepForm = new FormGroup({
    main_category: new FormControl({ value: null, disabled: true }, [ Validators.required ]),
    subcategory: new FormControl({ value: null, disabled: true }, [ Validators.required ]),
    category: new FormControl({ value: null, disabled: true }, [ Validators.required ]),
    desc_uz: new FormControl('', [ Validators.required, Validators.maxLength(1500) ]),
    desc_ru: new FormControl('', [ Validators.required, Validators.maxLength(1500) ]),
    title_uz: new FormControl('', [ Validators.required, Validators.maxLength(255) ]),
    title_ru: new FormControl('', [ Validators.required, Validators.maxLength(255) ]),
    video_link: new FormControl('', [ Validators.maxLength(200), youtubeVideoURL ]),
    images: new FormControl([], [ arrayMinLength(1) ])
  });

  private _generalService = inject(GeneralService);
  private _toasterService = inject(ToasterService);
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.firstStepForm.valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(_ => {
        if (this.firstStepForm.invalid) {
          return;
        }
        this.onFormStateChanged.emit({ form: this.firstStepForm, step: 1 });
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.secondLevelCategories = [this.productDetails.categories[1]];
    this.thirdLevelCategories = [this.productDetails.categories[2]];

    this.firstStepForm.get('main_category').setValue(this.productDetails?.categories[0]?.pk);
    this.firstStepForm.get('subcategory').setValue(this.productDetails?.categories[1]?.pk);
    this.firstStepForm.get('category').setValue(this.productDetails?.categories[2]?.pk);
    this.firstStepForm.get('title_uz').setValue(this.productDetails?.title_uz);
    this.firstStepForm.get('title_ru').setValue(this.productDetails?.title_ru);
    this.firstStepForm.get('desc_uz').setValue(this.productDetails?.desc_uz);
    this.firstStepForm.get('desc_ru').setValue(this.productDetails?.desc_ru);
    this.firstStepForm.get('video_link').setValue(this.productDetails?.video_link);
    this.firstStepForm.get('images').setValue(this.productDetails?.images);

    this.onFormStateChanged.emit({ form: this.firstStepForm, step: 1 });
  }

  onImagesDropped($event: FileList): void {
    if (this.firstStepForm.get('images').value.length === 8) {
      this._toasterService.open({
        title: 'dear.user',
        message: 'you.can.upload.up.to.8.images',
        type: 'warning'
      });
      return;
    }
    for (const file of Array.from($event)) {
      if (![ 'image/jpeg', 'image/png' ].includes(file.type)) {
        continue;
      }

      this.transformImageFile(file);
    }
    this.firstStepForm.get('images').markAsTouched();
  }

  transformImageFile(file: File): void {
    const reader = new FileReader();
    reader.onload = event => {
      const buffer = event.target.result as ArrayBuffer;
      const images: (string | { file: File; buffer: ArrayBuffer})[] = this.firstStepForm.get('images').value;
      if (images.find(item => (typeof item === 'object' && item?.buffer === buffer)) || images.length === 8) {
        return;
      }
      images.push({
        file,
        buffer
      })
      this.firstStepForm.get('images').setValue(images);
    };
    reader.readAsDataURL(file);
  }

  removeImage(i: number): void {
    const images: (string | { file: File; buffer: ArrayBuffer})[] = this.firstStepForm.get('images').value;
    images.splice(i, 1);
    this.firstStepForm.get('images').setValue(images);
  }

  onImagesSelectedByFileInput($event: Event): void {
    this.onImagesDropped(($event.target as HTMLInputElement).files);
    this.fileInput.nativeElement.value = null;
  }

  drop($event: CdkDragDrop<any, any>): void {
    const images: (string | { file: File; buffer: ArrayBuffer})[] = this.firstStepForm.get('images').value;
    moveItemInArray(images, $event.previousIndex, $event.currentIndex);
    this.firstStepForm.get('images').setValue(images);
  }

  openVideoPreview($event: MouseEvent): void {
    $event.preventDefault();
    this.videoPreviewPanel.openPanel();
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }

  goToSecondStep(): void {
    if (this.firstStepForm.invalid) {
      return;
    }

    this.onStepChanged.emit(2);
  }
}
