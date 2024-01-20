import { Component } from '@angular/core';
import { SectionHeaderComponent } from '../section-header/section-header.component';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'products-section',
  templateUrl: 'products-section.component.html',
  styleUrls: [ 'products-section.component.scss' ],
  imports: [
    SectionHeaderComponent,
    ProductCardComponent
  ],
  standalone: true
})

export class ProductsSectionComponent {

}
