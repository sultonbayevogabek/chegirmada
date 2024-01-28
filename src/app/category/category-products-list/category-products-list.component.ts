import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'category-products-list',
  templateUrl: 'category-products-list.component.html',
  styleUrl: 'category-products-list.component.scss',
  imports: [
    MatExpansionModule,
    MatIconModule,
    MatRippleModule,
    MatButtonModule
  ],
  standalone: true
})

export class CategoryProductsListComponent implements OnInit {

  ngOnInit() {

  }
}
