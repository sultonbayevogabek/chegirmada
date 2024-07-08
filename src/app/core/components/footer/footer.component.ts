import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatIcon } from '@angular/material/icon';
import { ImgWrapperComponent } from '../img-wrapper/img-wrapper.component';

@Component({
  selector: 'site-footer',
  templateUrl: 'footer.component.html',
  styleUrl: 'footer.component.scss',
  imports: [
    NgOptimizedImage,
    RouterLink,
    TranslateModule,
    MatIcon,
    ImgWrapperComponent
  ],
  standalone: true
})

export class FooterComponent {
  translateService = inject(TranslateService);
}
