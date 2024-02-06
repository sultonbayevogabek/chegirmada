import { Component, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'profile-empty-list',
  templateUrl: 'profile-empty-list.component.html',
  styleUrl: 'profile-empty-list.component.scss',
  imports: [
    NgOptimizedImage
  ],
  standalone: true
})

export class ProfileEmptyListComponent {
  @Input({ required: true }) emptyListText = 'Список пустой';
}
