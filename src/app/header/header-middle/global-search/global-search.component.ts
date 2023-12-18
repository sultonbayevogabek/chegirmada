import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

@Component({
   selector: 'global-search',
   templateUrl: './global-search.component.html',
   styleUrls: [ './global-search.component.scss' ],
   imports: [
      MatIconModule,
      MatAutocompleteModule,
      MatInputModule
   ],
   standalone: true
})

export class GlobalSearchComponent {
   streets: string[] = ['Champs-Élysées', 'Lombard Street', 'Abbey Road', 'Fifth Avenue'];
}