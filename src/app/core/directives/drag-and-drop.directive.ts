import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output
} from '@angular/core';

@Directive({
  selector: '[dragAndDrop]',
  standalone: true
})

export class DragAndDropDirective {
  @HostBinding('class.file-over') fileOver: boolean;
  @Output() fileDropped: EventEmitter<FileList> = new EventEmitter<FileList>();

  @HostBinding()
  @HostListener('dragover', [ '$event' ]) Dragover(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = true;
  }

  // Dragleave listener
  @HostListener('dragleave', [ '$event' ])
  public DragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;
  }

  // Drop listener
  @HostListener('drop', [ '$event' ])
  public Dropped(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.fileOver = false;
    const files: FileList = event.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }
}
