import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { BlueButtonComponent } from '../../../shared/components/blue-button/blue-button.component';

@Component({
  selector: 'profile-empty-list',
  templateUrl: 'profile-empty-list.component.html',
  styleUrl: 'profile-empty-list.component.scss',
  imports: [
    NgOptimizedImage,
    BlueButtonComponent
  ],
  standalone: true
})

export class ProfileEmptyListComponent {
  @Output() onEmptyListButtonClick: EventEmitter<void> = new EventEmitter<void>();
  @Input({ required: true }) emptyListText = 'Список пустой';
  @Input() emptyListImg = '/assets/empty-list-icons/favourite-companies.svg';
  @Input() emptyListButton: string;

  emptyListButtonClick(): void {
    this.onEmptyListButtonClick.emit();
  }
}
