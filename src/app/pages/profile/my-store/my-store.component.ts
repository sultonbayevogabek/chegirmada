import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../../core/services/auth.service';
import { ProfileEmptyListComponent } from '../profile-empty-list/profile-empty-list.component';
import { UserModel } from '../../../core/models/user.model';
import { RegisterStoreComponent } from './register-store/register-store.component';
import { EditStoreComponent } from './edit-store/edit-store.component';

@Component({
  selector: 'my-store',
  templateUrl: 'my-store.component.html',
  styleUrl: 'my-store.component.scss',
  imports: [
    ProfileEmptyListComponent,
    RegisterStoreComponent,
    EditStoreComponent
  ],
  providers: [

  ],
  standalone: true
})

export class MyStoreComponent implements OnInit {
  private _authService = inject(AuthService);
  private _destroyRef = inject(DestroyRef);

  currentUser: UserModel;
  mode: 'empty' | 'register' | 'edit'  = 'empty'
  ngOnInit(): void {
    this._authService.currentUser$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(user => {
        this.currentUser = user;

        if (this.currentUser?.store_id) {
          this.mode = 'edit';
        }
      });
  }
}
