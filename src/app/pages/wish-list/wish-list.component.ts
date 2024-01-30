import { Component } from '@angular/core';
import { ProductsSectionComponent } from '../../shared/components/products-section/products-section.component';

@Component({
  selector: 'wish-list',
  templateUrl: 'wish-list.component.html',
  styleUrl: 'wish-list.component.scss',
  imports: [
    ProductsSectionComponent
  ],
  standalone: true
})

export class WishListComponent {

}
