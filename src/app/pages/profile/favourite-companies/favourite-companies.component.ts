import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'my-information',
  templateUrl: 'favourite-companies.component.html',
  styleUrl: 'favourite-companies.component.scss',
  imports: [
    MatIcon,
    MatRipple,
    NgOptimizedImage
  ],
  standalone: true
})

export class FavouriteCompaniesComponent {}
