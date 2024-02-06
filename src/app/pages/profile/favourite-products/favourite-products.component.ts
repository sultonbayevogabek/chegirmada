import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';
import { NgOptimizedImage } from '@angular/common';
import { ProfileEmptyListComponent } from '../profile-empty-list/profile-empty-list.component';

@Component({
  selector: 'favourite-products',
  templateUrl: 'favourite-products.component.html',
  styleUrl: 'favourite-products.component.scss',
  imports: [
    MatIcon,
    MatRipple,
    NgOptimizedImage,
    ProfileEmptyListComponent
  ],
  standalone: true
})

export class FavouriteProductsComponent {}
