import { Component } from '@angular/core';
import { ProductsSectionComponent } from '../../shared/components/products-section/products-section.component';
import { UiButtonComponent } from '../../shared/components/ui-button/ui-button.component';
import { NgOptimizedImage } from '@angular/common';
import { SectionHeaderComponent } from '../../shared/components/section-header/section-header.component';

@Component({
  selector: 'wish-list',
  templateUrl: 'wish-list.component.html',
  styleUrl: 'wish-list.component.scss',
  imports: [
    ProductsSectionComponent,
    UiButtonComponent,
    NgOptimizedImage,
    SectionHeaderComponent
  ],
  standalone: true
})

export class WishListComponent {

}
