import { ChangeDetectorRef, Component, DestroyRef, ElementRef, inject, NgZone, ViewChild } from '@angular/core';
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

@Component({
  selector: 'create-announcement-first-step',
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
    GeneralService
  ],
  templateUrl: 'create-announcement-first-step.component.html',
  styleUrl: 'create-announcement-first-step.component.scss'
})
export class CreateAnnouncementFirstStepComponent {
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;
  @ViewChild('videoPreviewPanel') videoPreviewPanel: OverlayComponent;
  date: Date = new Date();
  imagesList: {
    file: File,
    buffer: string | ArrayBuffer
  }[] = [];

  categories = CATEGORIES;
  secondLevelCategories: SecondLevelCategory[] = [];
  thirdLevelCategories: ThirdLevelCategory[] = [];
  firstStepForm = new FormGroup({
    main_category: new FormControl(null, [ Validators.required ]),
    subcategory: new FormControl(null, [ Validators.required ]),
    category: new FormControl(null, [ Validators.required ]),
    desc_uz: new FormControl('', [ Validators.required, Validators.maxLength(1500) ]),
    desc_ru: new FormControl('', [ Validators.required, Validators.maxLength(1500) ]),
    title_uz: new FormControl('', [ Validators.required, Validators.maxLength(255) ]),
    title_ru: new FormControl('', [ Validators.required, Validators.maxLength(255) ]),
    video_link: new FormControl('', [ Validators.maxLength(200) ])
  });

  private _generalService = inject(GeneralService);
  private _destroyRef = inject(DestroyRef);
  private _cdr = inject(ChangeDetectorRef);
  private _zone = inject(NgZone);

  onImagesDropped($event: FileList): void {
    for (const file of Array.from($event)) {
      if (![ 'image/jpeg', 'image/png', 'image/webp' ].includes(file.type)) {
        continue;
      }

      this.transformImageFile(file);
    }
  }

  transformImageFile(file: File): void {
    const reader = new FileReader();
    reader.onload = event => {
      const buffer = event.target.result;
      if (this.imagesList.find(image => image.buffer === buffer)) {
        return;
      }
      this.imagesList.push({
        file,
        buffer
      });
    };
    reader.readAsDataURL(file);
  }

  removeImage(i: number): void {
    this.imagesList.splice(i, 1);
  }

  onImagesSelectedByFileInput($event: Event): void {
    this.onImagesDropped(($event.target as HTMLInputElement).files);
    this.fileInput.nativeElement.value = null;
  }

  drop($event: CdkDragDrop<any, any>): void {
    moveItemInArray(this.imagesList, $event.previousIndex, $event.currentIndex);
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
    }, 0)
  }
}
