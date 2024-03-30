import { Component, ElementRef, ViewChild } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { DragAndDropDirective } from '../../../../../core/directives/drag-and-drop.directive';
import { MatDatepicker, MatDatepickerInput } from '@angular/material/datepicker';
import { MatIcon } from '@angular/material/icon';
import { DateAdapter, MatNativeDateModule, MatOption, MatRipple } from '@angular/material/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IconButtonComponent } from '../../../../../core/components/icon-button/icon-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatSelect } from '@angular/material/select';
import { CATEGORIES } from '../../../../../core/constants/categories';
import { UiButtonComponent } from '../../../../../core/components/ui-button/ui-button.component';
import { TrimDirective } from '../../../../../core/directives/trim.directive';
import { NgTemplateOutlet } from '@angular/common';

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
    NgTemplateOutlet
  ],
  templateUrl: 'create-announcement-first-step.component.html',
  styleUrl: 'create-announcement-first-step.component.scss'
})
export class CreateAnnouncementFirstStepComponent {
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;
  date: Date = new Date();
  imagesList: {
    file: File,
    buffer: string  | ArrayBuffer
  }[] = [];

  categories = CATEGORIES;
  firstStepForm = new FormGroup({
    title_uz: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    title_ru: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    main_category: new FormControl(null, [ Validators.required ]),
    sub_category: new FormControl(null, [ Validators.required ]),
    category: new FormControl(null, [ Validators.required ]),
  })

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
      const buffer = event.target.result
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

  }
}
