import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';
import { ProfileEmptyListComponent } from '../profile-empty-list/profile-empty-list.component';
import { MatDialog } from '@angular/material/dialog';
import { BranchActionComponent } from '../branch-action/branch-action.component';
import { ConfirmationService } from '../../../core/services/confirmation.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { MyStoreService } from '../../../core/services/my-store.service';
import { AuthService } from '../../../core/services/auth.service';
import { UserModel } from '../../../core/models/user.model';
import { IconButtonComponent } from '../../../core/components/icon-button/icon-button.component';
import { SpinnerLoaderComponent } from '../../../core/components/spinner-loader/spinner-loader.component';
import { switchMap, tap } from 'rxjs';
import { BranchModel } from '../../../core/models/branch.model';
import { WEEKDAYS } from '../../../core/constants/weekdays';
import { LowerCasePipe } from '@angular/common';
import { PhoneNumberPipe } from '../../../core/pipes/phone-number.pipe';
import { UiButtonComponent } from '../../../core/components/ui-button/ui-button.component';
import { ToasterService } from '../../../core/services/toaster.service';

@Component({
  selector: 'branches',
  templateUrl: 'branches.component.html',
  styleUrl: 'branches.component.scss',
  imports: [
    MatIcon,
    MatRipple,
    ProfileEmptyListComponent,
    IconButtonComponent,
    BranchActionComponent,
    TranslateModule,
    SpinnerLoaderComponent,
    LowerCasePipe,
    PhoneNumberPipe,
    UiButtonComponent
  ],
  providers: [
    ConfirmationService,
    MyStoreService,
    ToasterService
  ],
  standalone: true
})

export class BranchesComponent implements OnInit {
  loading = true;
  currentUser: UserModel;
  branches: BranchModel[] = [];
  weekdays = WEEKDAYS;

  private _dialog = inject(MatDialog);
  private _confirmation = inject(ConfirmationService);
  private _myStoreService = inject(MyStoreService);
  private _authService = inject(AuthService);
  private _toasterService = inject(ToasterService);
  private _destroyRef = inject(DestroyRef);

  constructor() {
  }

  ngOnInit(): void {
    this.getBranches();
  }

  openBranchActionDialog(branchId?: number): void {
    const branchActionDialog = this._dialog.open(BranchActionComponent, {
      width: '100%',
      maxWidth: '75rem',
      data: {
        branchId
      }
    });

    branchActionDialog.afterClosed()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: data => {
          if (!data) return;

          this.getBranches();
        }
      })
  }

  getBranches(): void {
    this._myStoreService.getBranches(this._authService.currentUser?.store_id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: res => {
          this.loading = false;
          this.branches = res;
        },
        error: _ => {
          this.loading = false;
          this.branches = [];
        }
      })
  }

  deleteBranch(branchId: number): void {
    this._confirmation.confirmation()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        switchMap(res => {
          if (!res) {
            return [];
          }
          return this._myStoreService.deleteBranch(branchId);
        }),
      )
      .subscribe({
        next: () => {
          this.getBranches()
        },
        error: _ => {
          this._toasterService.open({
            message: 'error.occurred',
            type: 'error',
            title: 'attention'
          })
        }
      });
  }
}
