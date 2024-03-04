import { Component, ElementRef, ViewChild } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { DragAndDropDirective } from '../../../../../core/directives/drag-and-drop.directive';
import { IconButtonComponent } from '../../../../../shared/components/icon-button/icon-button.component';
import { MatDatepicker, MatDatepickerInput } from '@angular/material/datepicker';
import { MatIcon } from '@angular/material/icon';
import { DateAdapter, MatNativeDateModule, MatRipple } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    MatNativeDateModule
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

  onImagesDropped($event: FileList): void {
    console.log($event);
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
    this.onImagesDropped(($event.srcElement as HTMLInputElement).files);
    this.fileInput.nativeElement.value = null;
  }

  drop($event: CdkDragDrop<any, any>): void {
    moveItemInArray(this.imagesList, $event.previousIndex, $event.currentIndex);
  }
}
