import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe, DecimalPipe, NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
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
import { UiButtonComponent } from '../../../core/components/ui-button/ui-button.component';
import { OverlayComponent } from '../../../core/components/overlay-panel/overlay-panel.component';
import { ConfirmationService } from '../../../core/services/confirmation.service';
import { switchMap } from 'rxjs';
import { ToasterService } from '../../../core/services/toaster.service';

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
    DatePipe,
    DecimalPipe,
    UiButtonComponent,
    OverlayComponent
  ],
  providers: [
    ProductDetailsService,
    LoginProfileComponent,
    ConfirmationService,
    ToasterService
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
      Validators.maxLength(160)
    ])
  });

  private _destroyRef = inject(DestroyRef);
  private _productDetailsService = inject(ProductDetailsService);
  private _loginProfileComponent = inject(LoginProfileComponent);
  private _translateService = inject(TranslateService);
  private _confirmationService = inject(ConfirmationService);
  private _toasterService = inject(ToasterService);

  ngOnInit(): void {
    this.currentLang = this._translateService.defaultLang;
    this.getComments();
  }

  changeTab(tab: tabType): void {
    this.selectedTab = tab;
  }

  leaveComment(): void {
    const form = this.commentForm;

    if (form.invalid || form.disabled) {
      return;
    }

    form.disable();
    this._productDetailsService.leaveComment(this.details.pk, form.get('text').value)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: () => {
          form.enable();
          form.get('text').setValue('');
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
          this.comments = res?.results;
          if (this.comments?.length) {
            this.showCommentForm = true;
          }
        },
        error: () => {
          this.loading = false;
        }
      });
  }

  setCommonComment(commonComment: string): void {
    this.commentForm.get('text').setValue(commonComment);
  }

  deleteComment(commentAuthorId: number, overlayPanel: OverlayComponent): void {
    this._confirmationService.confirmation()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        switchMap(res => {
          if (!res) {
            return null
          }
          return this._productDetailsService.deleteComment(commentAuthorId);
        })
      )
      .subscribe({
        next: () => {
          this.getComments();
        },
        error: _ => {
          this._toasterService.open({
            message: 'error.occurred',
            type: 'error',
            title: 'attention'
          });
        }
      });
  }

  openCommentForm(): void {
    if (!this.currentUser) {
      this._loginProfileComponent.openLoginDialog();
      return;
    }

    this.showCommentForm = true;
  }
}
