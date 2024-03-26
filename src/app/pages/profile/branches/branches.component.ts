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
import { tap } from 'rxjs';

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
    SpinnerLoaderComponent
  ],
  providers: [
    ConfirmationService,
    MyStoreService
  ],
  standalone: true
})

export class BranchesComponent implements OnInit {
  loading = true;
  currentUser: UserModel;
  branches = [];

  private _dialog = inject(MatDialog);
  private _confirmation = inject(ConfirmationService);
  private _myStoreService = inject(MyStoreService);
  private _authService = inject(AuthService);
  private _destroyRef = inject(DestroyRef);

  constructor() {
  }

  ngOnInit(): void {
    this.getBranches();
  }

  openBranchActionDialog(): void {
    this._dialog.open(BranchActionComponent, {
      width: '100%',
      maxWidth: '75rem'
    });
  }

  openConfirmation(): void {
    this._confirmation.confirmation({})
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(d => {
        console.log(d);
      });
  }

  getBranches(): void {
    this.loading = true;
    this._myStoreService.getBranches(this._authService.currentUser?.store_id)
      .pipe(
        tap(_ => this.loading = false),
        takeUntilDestroyed(this._destroyRef)
      )
      .subscribe({
        next: res => {

        }
      })
  }
}
