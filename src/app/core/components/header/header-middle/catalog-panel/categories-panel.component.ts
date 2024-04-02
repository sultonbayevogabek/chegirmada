import { Component, DestroyRef, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';
import { CATEGORIES } from '../../../../constants/categories';
import { TranslateModule } from '@ngx-translate/core';
import { MainCategory } from '../../../../models/categories.model';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { GeneralService } from '../../../../services/general.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface ICategory {
  parentCategoryName: string
  parentCategoryIcon: string
  active: boolean
  categoryGroupsFirstColumn: CategoryGroupsColumn[]
  categoryGroupsSecondColumn: CategoryGroupsColumn[]
  categoryGroupsThirdColumn: CategoryGroupsColumn[]
}

export interface CategoryGroupsColumn {
  categoryGroupName: string
  categories: Category[]
}

export interface Category {
  name: string
  url: string
}


@Component({
  selector: 'categories-panel',
  templateUrl: 'categories-panel.component.html',
  styleUrl: 'categories-panel.component.scss',
  imports: [
    NgTemplateOutlet,
    MatIcon,
    MatRipple,
    TranslateModule,
    MatProgressSpinner
  ],
  standalone: true,
  providers: [
    GeneralService
  ]
})

export class CategoriesPanelComponent {
  categories = CATEGORIES;
  selectedCategory: MainCategory;

  private _generalService = inject(GeneralService);
  private _destroyRef = inject(DestroyRef);

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
