import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ProductsSectionComponent } from '../../core/components/products-section/products-section.component';
import { UiButtonComponent } from '../../core/components/ui-button/ui-button.component';
import { SectionHeaderComponent } from '../../core/components/section-header/section-header.component';

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
