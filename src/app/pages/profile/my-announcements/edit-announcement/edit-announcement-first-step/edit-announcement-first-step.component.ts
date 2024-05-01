import { Component, DestroyRef, ElementRef, EventEmitter, inject, OnInit, Output, ViewChild } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { DragAndDropDirective } from '../../../../../core/directives/drag-and-drop.directive';
import { MatDatepicker, MatDatepickerInput } from '@angular/material/datepicker';
import { MatIcon } from '@angular/material/icon';
import { MatNativeDateModule, MatOption, MatRipple } from '@angular/material/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
    MatProgressSpinner
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
export class EditAnnouncementFirstStepComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;
  @ViewChild('videoPreviewPanel') videoPreviewPanel: OverlayComponent;

  @Output() onFormStateChanged: EventEmitter<{ form: FormGroup<any>, step: number }> = new EventEmitter<{
    form: FormGroup<any>,
    step: number
  }>();
  @Output() onStepChanged: EventEmitter<number> = new EventEmitter<number>();

  date: Date = new Date();
  imagesBuffers: (string | ArrayBuffer)[] = [];

  categories = CATEGORIES;
  secondLevelCategories: SecondLevelCategory[] = [];
  thirdLevelCategories: ThirdLevelCategory[] = [];
  firstStepForm = new FormGroup({
    main_category: new FormControl(null, [ Validators.required ]),
    subcategory: new FormControl(null, [ Validators.required ]),
    category: new FormControl(null, [ Validators.required ]),
    desc_uz: new FormControl(`iPhone 15 Pro Max - bu Apple kompaniyasining yangi smartfonlar qatorining eng yaxshi modeli bo'lib, u me'yordan ham oshib ketadi. U eng yangi 3nm A17 Bionic protsessoriga ega boʻlib, 8K video tahrirlashdan tortib eng ilgʻor grafik oʻyinlargacha boʻlgan barcha narsalar uchun yashin tezligida ishlash imkonini beradi.

Ajoyib displey

2796x1290 pikselli 6,7 dyuymli katta Super Retina XDR displey sizga filmlar, o‘yinlar va veb-sahifalarni ajoyib tomosha qilish tajribasini taqdim etadi. OLED texnologiyasi yuqori kontrast, boy ranglar va ajoyib qora chuqurlikni kafolatlaydi.

Professional kamera

iPhone 15 Pro Max kamera tizimi mobil suratga olishni keyingi bosqichga olib chiqadi. Asosiy kamera endi 48 megapikselli ruxsatga ega bo'lib, ajoyib darajada batafsil suratga olish imkonini beradi. Kengaytirilgan kam yorug'likdagi tortishish rejimi tunda ham aniq va yorqin suratlarni ta'minlaydi.`, [ Validators.required, Validators.maxLength(1500) ]),
    desc_ru: new FormControl(`iPhone 15 Pro Max — это топовая модель новой линейки смартфонов Apple, которая выходит за рамки привычного. Он оснащен новейшим процессором A17 Bionic, изготовленным по 3-х нанометровому техпроцессу, что обеспечивает молниеносную производительность для любых задач, от редактирования видео 8K до игр с самой продвинутой графикой.

Шикарный дисплей

Большой 6.7-дюймовый Super Retina XDR дисплей с разрешением 2796x1290 пикселей подарит вам невероятные впечатления от просмотра фильмов, игр и веб-страниц. Технология OLED гарантирует высокую контрастность, сочные цвета и потрясающую глубину черного.

Профессиональная камера

Система камер iPhone 15 Pro Max выводит мобильную фотографию на новый уровень. Основная камера теперь имеет разрешение 48 мегапикселей, позволяя делать невероятно детализированные снимки. Усовершенствованный режим съемки при слабом освещении обеспечит четкие и яркие фотографии даже ночью.
`, [ Validators.required, Validators.maxLength(1500) ]),
    title_uz: new FormControl('iPhone 15 Pro Max (Dubay versiya)', [ Validators.required, Validators.maxLength(255) ]),
    title_ru: new FormControl('iPhone 15 Pro Max (Дубай версия)', [ Validators.required, Validators.maxLength(255) ]),
    video_link: new FormControl('https://youtube.com/shorts/EI1KHTgbwSk?si=7ipiTajPVQJEb97B', [ Validators.maxLength(200), youtubeVideoURL ]),
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

  onImagesDropped($event: FileList): void {
    if (this.imagesBuffers.length === 8) {
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
      const buffer = event.target.result;
      if (this.imagesBuffers.find(item => item === buffer) || this.imagesBuffers.length === 8) {
        return;
      }
      this.imagesBuffers.push(buffer);
      const images: File[] = this.firstStepForm.get('images').value;
      images.push(file);
      this.firstStepForm.get('images').setValue(images);
    };
    reader.readAsDataURL(file);
  }

  removeImage(i: number): void {
    this.imagesBuffers.splice(i, 1);
    const images: File[] = this.firstStepForm.get('images').value;
    images.splice(i, 1);
    this.firstStepForm.get('images').setValue(images);
  }

  onImagesSelectedByFileInput($event: Event): void {
    this.onImagesDropped(($event.target as HTMLInputElement).files);
    this.fileInput.nativeElement.value = null;
  }

  drop($event: CdkDragDrop<any, any>): void {
    const images: File[] = this.firstStepForm.get('images').value;
    moveItemInArray(this.imagesBuffers, $event.previousIndex, $event.currentIndex);
    moveItemInArray(images, $event.previousIndex, $event.currentIndex);
    this.firstStepForm.get('images').setValue(images);
  }

  onMainCategoryChanged(): void {
    this.secondLevelCategories = [];
    this.thirdLevelCategories = [];
    this.firstStepForm.get('subcategory').setValue(null);
    this.firstStepForm.get('category').setValue(null);
    this.firstStepForm.get('subcategory').markAsUntouched();
    this.firstStepForm.get('category').markAsUntouched();
    this._generalService.getSubcategories(this.firstStepForm.get('main_category').value)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: res => {
          this.secondLevelCategories = res;
        },
        error: () => {
          this.secondLevelCategories = [];
        }
      });
  }

  onSubcategoryChanged(): void {
    this.thirdLevelCategories = [];
    this.firstStepForm.get('category').setValue(null);
    this.firstStepForm.get('category').markAsUntouched();
    this.thirdLevelCategories = (this.secondLevelCategories.find(category => {
      return category.pk === this.firstStepForm.get('subcategory').value;
    })).children;
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
