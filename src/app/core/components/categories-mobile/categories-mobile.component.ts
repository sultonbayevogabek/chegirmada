import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { GeneralService } from '../../services/general.service';
import { CATEGORIES } from '../../constants/categories';
import { MainCategory } from '../../models/categories.model';
import { IconButtonComponent } from '../icon-button/icon-button.component';

@Component({
  selector: 'categories-mobile',
  templateUrl: 'categories-mobile.component.html',
  styleUrl: 'categories-mobile.component.scss',
  imports: [
    NgTemplateOutlet,
    MatIcon,
    MatRipple,
    TranslateModule,
    MatProgressSpinner,
    RouterLink,
    IconButtonComponent
  ],
  standalone: true,
  providers: [
    GeneralService
  ]
})

export class CategoriesMobileComponent implements OnInit {
  categories = CATEGORIES;
  selectedCategoriesIndex: {
    main?: number;
    secondary?: number;
  } = {}
  categoriesTab = 1;

  private _generalService = inject(GeneralService);
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
  }

  selectMainCategory(id: number): void {
    this.selectedCategoriesIndex.main = id;

    if (this.categories[id]?.subcategories?.length) {
      this.categoriesTab = 2;
    } else {
      this._generalService.getSubcategories(id)
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe(res => {
          this.categories[id].subcategories = res || [];
          this.categoriesTab = 2;
        })
    }
  }

  back(tab: number): void {
    this.categoriesTab = tab;
  }

  selectSecondaryCategory(i: number) {
    this.selectedCategoriesIndex.secondary = i;
    this.categoriesTab = 3;
  }
}
