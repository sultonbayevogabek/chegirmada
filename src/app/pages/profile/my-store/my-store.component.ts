import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BaseComponent } from '../../../core/components/base/base.component';
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

export class MyStoreComponent extends BaseComponent implements OnInit {
  private _authService = inject(AuthService);

  currentUser: UserModel;
  mode: 'empty' | 'register' | 'edit'  = 'empty'

  constructor() {
    super();
  }

  ngOnInit(): void {
    this._authService.currentUser$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(user => {
        this.currentUser = user;

        if (this.currentUser?.store_id) {
          this.mode = 'edit';
        }
      });
  }
}
