import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';
import { CATEGORIES } from '../../../../constants/categories';
import { TranslateModule } from '@ngx-translate/core';
import { MainCategory } from '../../../../models/categories.model';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { GeneralService } from '../../../../services/general.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'categories-panel',
  templateUrl: 'categories-panel.component.html',
  styleUrl: 'categories-panel.component.scss',
  imports: [
    NgTemplateOutlet,
    MatIcon,
    MatRipple,
    TranslateModule,
    MatProgressSpinner,
    RouterLink
  ],
  standalone: true,
  providers: [
    GeneralService
  ]
})

export class CategoriesPanelComponent implements OnInit {
  categories = CATEGORIES;
  selectedCategory: MainCategory;

  private _generalService = inject(GeneralService);
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.selectParentCategory(this.categories[0]);
  }

  selectParentCategory(category: MainCategory): void {
    this.categories.forEach(category => {
      category.active = false;
      category.loading = false;
    });

    category.active = true;

    if (category.children) {
      this.selectedCategory = category;
      return
    }

    category.children = {
      '1': [],
      '2': [],
      '3': [],
    }

    this._generalService.getSubcategories(category.id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(res => {
        const partLength = Math.ceil(res.length / 3)
        for (let i = 1; i <= 3; i++) {
          if (i < 3) {
            category.children[i] = res.slice((i - 1) * partLength, i * partLength);
          } else {
            category.children[i] = res.slice((i - 1) * partLength);
          }
        }
        this.selectedCategory = category;
      })
  }
}
