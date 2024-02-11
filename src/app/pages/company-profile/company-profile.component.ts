import { Component } from '@angular/core';
import { BreadCrumbsComponent } from '../../shared/components/bread-crumbs/bread-crumbs.component';
import { NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { UiButtonComponent } from '../../shared/components/ui-button/ui-button.component';

@Component({
  selector: 'company-profile',
  templateUrl: 'company-profile.component.html',
  styleUrl: 'company-profile.component.scss',
  imports: [
    BreadCrumbsComponent,
    NgOptimizedImage,
    MatIcon,
    UiButtonComponent
  ],
  standalone: true
})

export class CompanyProfileComponent {
  breadCrumbs = [
    {
      text: 'Главная',
      url: 'home'
    },
    {
      text: 'Смартфоны',
      url: 'smartphones'
    },
    {
      text: 'Мобильные телефоны',
      url: ''
    }
  ]
}
