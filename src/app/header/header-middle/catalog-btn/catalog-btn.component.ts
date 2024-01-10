import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'catalog-btn',
  templateUrl: 'catalog-btn.component.html',
  styleUrls: [ 'catalog-btn.component.scss' ],
  imports: [
    MatIconModule
  ],
  standalone: true
})

export class CatalogBtnComponent {
}
