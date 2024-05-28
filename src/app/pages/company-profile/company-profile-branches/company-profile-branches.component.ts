import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { LowerCasePipe, NgOptimizedImage } from '@angular/common';
import { IconButtonComponent } from '../../../core/components/icon-button/icon-button.component';
import { BranchModel } from '../../../core/models/branch.model';
import { MyStoreService } from '../../../core/services/my-store.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { SpinnerLoaderComponent } from '../../../core/components/spinner-loader/spinner-loader.component';
import { ProfileEmptyListComponent } from '../../profile/profile-empty-list/profile-empty-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { PhoneNumberPipe } from '../../../core/pipes/phone-number.pipe';
import { WEEKDAYS } from '../../../core/constants/weekdays';

@Component({
  selector: 'company-profile-branches',
  templateUrl: 'company-profile-branches.component.html',
  styleUrl: 'company-profile-branches.component.scss',
  imports: [
    NgOptimizedImage,
    IconButtonComponent,
    SpinnerLoaderComponent,
    ProfileEmptyListComponent,
    TranslateModule,
    PhoneNumberPipe,
    LowerCasePipe
  ],
  providers: [
    MyStoreService
  ],
  standalone: true
})

export class CompanyProfileBranchesComponent implements OnInit {
  loading = true;
  branches: BranchModel[] = [];
  weekdays = WEEKDAYS;

  private _myStoreService = inject(MyStoreService);
  private _destroyRef = inject(DestroyRef);
  private _activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this._activatedRoute.parent.params.subscribe((params: { storeId: string }) => {
      if (!params?.storeId) return;

      this.getStoreBranches(+params.storeId);
    });
  }

  getStoreBranches(id: number): void {
    this._myStoreService.getBranches(id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(res => {
        this.loading = false;
        this.branches = res;
      })
  }
}
