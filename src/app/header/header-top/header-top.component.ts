import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LanguageComponent } from './language/language.component';
import { LinksComponent } from './links/links.component';
import { LocationComponent } from './location/location.component';

@Component({
    selector: 'header-top',
    templateUrl: './header-top.component.html',
    styleUrl: './header-top.component.scss',
   imports: [
      MatIconModule,
      LanguageComponent,
      LinksComponent,
      LocationComponent
   ],
    standalone: true
})

export class HeaderTopComponent {}
