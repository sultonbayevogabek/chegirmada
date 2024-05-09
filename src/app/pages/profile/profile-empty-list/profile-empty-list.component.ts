import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { UiButtonComponent } from '../../../core/components/ui-button/ui-button.component';

@Component({
  selector: 'profile-empty-list',
  templateUrl: 'profile-empty-list.component.html',
  styleUrl: 'profile-empty-list.component.scss',
  imports: [
    NgOptimizedImage,
    UiButtonComponent,
    TranslateModule
  ],
  standalone: true
})

export class ProfileEmptyListComponent {
  @Output() onEmptyListButtonClick: EventEmitter<void> = new EventEmitter<void>();
  @Input() emptyListText = 'no.data.found';
  @Input() emptyListImg = '/assets/empty-list-icons/favourite-companies.svg';
  @Input() emptyListButton: string;

  emptyListButtonClick(): void {
    this.onEmptyListButtonClick.emit();
  }
}
