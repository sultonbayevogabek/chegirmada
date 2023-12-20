import { Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { NgOptimizedImage } from '@angular/common';

@Component({
   selector: 'global-search',
   templateUrl: './global-search.component.html',
   styleUrls: [ './global-search.component.scss' ],
   imports: [
      MatIconModule,
      MatAutocompleteModule,
      MatInputModule,
      NgOptimizedImage
   ],
   standalone: true,
   encapsulation: ViewEncapsulation.None
})

export class GlobalSearchComponent {
   streets: string[] = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
}