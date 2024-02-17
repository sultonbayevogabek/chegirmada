import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'product-details-info-block',
  templateUrl: 'product-details-info-block.component.html',
  styleUrl: 'product-details-info-block.component.scss',
  imports: [
    MatIcon,
    MatIconButton
  ],
  standalone: true
})

export class ProductDetailsInfoBlockComponent {}
