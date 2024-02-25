import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { IconButtonComponent } from '../../../../shared/components/icon-button/icon-button.component';
import { MatNativeDateModule, MatRipple } from '@angular/material/core';
import { NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { MatDatepicker, MatDatepickerInput, MatDatepickerModule } from '@angular/material/datepicker';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { DragAndDropDirective } from '../../../../core/directives/drag-and-drop.directive';
import { ToasterService } from '../../../../core/services/toaster.service';
import { CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'create-announcement',
  templateUrl: 'create-announcement.component.html',
  styleUrl: 'create-announcement.component.scss',
  standalone: true,
  imports: [
    IconButtonComponent,
    MatRipple,
    NgTemplateOutlet,
    MatDatepickerInput,
    MatDatepicker,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIcon,
    FormsModule,
    NgOptimizedImage,
    DragAndDropDirective,
    CdkDropList,
    CdkDrag,
    CdkDragPlaceholder
  ],
  providers: []
})

export class CreateAnnouncementComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;
  date: Date = new Date();
  imagesList: {
    file: File,
    buffer: string  | ArrayBuffer
  }[] = [];

  readonly Array = Array;
  private _toaster = inject(ToasterService);

  ngOnInit(): void {
  }

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
    console.log(this.imagesList);
  }
}
