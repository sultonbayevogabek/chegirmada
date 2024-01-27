import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'category-filter',
  templateUrl: 'category-filter.component.html',
  styleUrl: 'category-filter.component.scss',
  imports: [
    MatExpansionModule,
    MatIconModule,
    MatRippleModule,
    NgxMaskDirective,
    MatSliderModule
  ],
  providers: [
    provideNgxMask()
  ],
  standalone: true
})

export class CategoryFilterComponent implements OnInit {

  ngOnInit() {

  }
}
