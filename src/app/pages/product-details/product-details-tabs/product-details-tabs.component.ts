import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe, NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { RatingStarsComponent } from '../../../core/components/rating-stars/rating-stars.component';
import { ScrollbarDirective } from '../../../core/directives/scrollbar.directive';
import { ProductDetails } from '../../../core/models/product-details.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProductDetailsService } from '../../../core/services/product-details.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SpinnerLoaderComponent } from '../../../core/components/spinner-loader/spinner-loader.component';
import { UserModel } from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TrimDirective } from '../../../core/directives/trim.directive';
import { CommentModel } from '../../../core/models/comment.model';
import {
  LoginProfileComponent
} from '../../../core/components/header/header-middle/login-button/login-profile.component';

type tabType = 'about' | 'characteristics' | 'comments'

@Component({
  selector: 'product-details-tabs',
  templateUrl: 'product-details-tabs.component.html',
  styleUrl: 'product-details-tabs.component.scss',
  imports: [
    MatIconModule,
    RatingStarsComponent,
    NgTemplateOutlet,
    NgOptimizedImage,
    MatRippleModule,
    ScrollbarDirective,
    TranslateModule,
    SpinnerLoaderComponent,
    ReactiveFormsModule,
    TrimDirective,
    DatePipe
  ],
  providers: [
    ProductDetailsService,
    LoginProfileComponent
  ],
  standalone: true
})

export class ProductDetailsTabsComponent implements OnInit {
  @Input({
    required: true
  }) details: ProductDetails;
  @Input({
    required: true
  }) currentUser: UserModel;

  currentLang = 'uz';
  loading = true;
  showCommentForm = false;
  selectedTab: tabType = 'about';
  tabs: { id: tabType, title: string }[] = [
    {
      id: 'about',
      title: 'about.product'
    },
    {
      id: 'comments',
      title: 'comments'
    }
  ];
  comments: CommentModel[] = [];
  commentForm = new FormGroup({
    text: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(255)
    ])
  });
  commonComments = [
    {
      uz: 'Juda yaxshi',
      ru: 'Очень хороший',
    },
    {
      uz: 'Katta rahmat',
      ru: 'Большое спасибо'
    },
    {
      uz: 'Sifatli tovar',
      ru: 'Качественный продукт'
    }
  ]

  private _destroyRef = inject(DestroyRef);
  private _productDetailsService = inject(ProductDetailsService);
  private _loginProfileComponent = inject(LoginProfileComponent);
  private _translateService = inject(TranslateService);

  ngOnInit(): void {
    this.currentLang  = this._translateService.defaultLang;
  }

  changeTab(tab: tabType): void {
    this.selectedTab = tab;

    if (this.selectedTab === 'comments' && !this.comments.length) {
      this.getComments();
    }
  }

  leaveComment(): void {
    if (!this.currentUser) {
      this._loginProfileComponent.openLoginDialog();
      return;
    }

    const form = this.commentForm;

    if (form.invalid || form.disabled) {
      return;
    }

    form.disable();
    this._productDetailsService.leaveComment(this.details.pk, form.get('text').value)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: () => {
          this.showCommentForm = false;
          form.enable();
          this.getComments();
        }
      });
  }

  getComments(): void {
    this._productDetailsService.getComments(this.details.pk)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: res => {
          this.loading = false;
          this.comments = res.results;
        },
        error: () => {
          this.loading = false;
        }
      });
  }

  setCommonComment(commonComment: string): void {
    this.commentForm.get('text').setValue(commonComment);
  }
}
