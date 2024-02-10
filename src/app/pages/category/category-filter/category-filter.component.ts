import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { BlueButtonComponent } from '../../../shared/components/blue-button/blue-button.component';

@Component({
  selector: 'category-filter',
  templateUrl: 'category-filter.component.html',
  styleUrl: 'category-filter.component.scss',
  imports: [
    MatExpansionModule,
    MatIconModule,
    MatRippleModule,
    NgxMaskDirective,
    MatSliderModule,
    MatButtonModule,
    BlueButtonComponent
  ],
  providers: [
    provideNgxMask()
  ],
  standalone: true
})

export class CategoryFilterComponent implements OnInit {
  brands = [
    {
      name: 'Samsung',
      count: 13,
      selected: false
    },
    {
      name: 'Philips',
      count: 31,
      selected: true
    },
    {
      name: 'ZTE',
      count: 23,
      selected: false
    },
    {
      name: 'Nokia',
      count: 30,
      selected: true
    },
    {
      name: 'Fly',
      count: 35,
      selected: false
    },
    {
      name: 'Apple',
      count: 3,
      selected: false
    },
    {
      name: 'BQ',
      count: 333,
      selected: false
    },
    {
      name: 'Huawei',
      count: 37,
      selected: false
    }
  ];

  screenResolutions = [
    {
      name: '96x68',
      count: 23,
      selected: false
    },
    {
      name: '160x128',
      count: 1,
      selected: true
    },
    {
      name: '220x175',
      count: 18,
      selected: false
    },
    { name: '320x240', count: 18, selected: false },
    { name: '480x320', count: 18, selected: false },
    { name: '800x480', count: 18, selected: true },
    { name: '854x480', count: 18, selected: false },
    { name: '960x480', count: 18, selected: true },
    { name: '1280x720 (HD)', count: 18, selected: false },
    { name: '1440x720', count: 18, selected: false }
  ];


  ngOnInit() {

  }
}
