import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule, MatOption, MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../../core/components/product-card/product-card.component';
import { PRODUCTS } from '../../../core/constants/products';

@Component({
  selector: 'category-products-list',
  templateUrl: 'category-products-list.component.html',
  styleUrl: 'category-products-list.component.scss',
  imports: [
    MatExpansionModule,
    MatIconModule,
    MatRippleModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule, FormsModule, ProductCardComponent, MatSelect, MatOption, RouterLink
  ],
  standalone: true
})

export class CategoryProductsListComponent implements OnInit {
  startDate = new Date();
  endDate = new Date();

  products = PRODUCTS;

  ngOnInit() {

  }
}
