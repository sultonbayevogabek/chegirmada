import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';
import { ProfileEmptyListComponent } from '../profile-empty-list/profile-empty-list.component';
import { MatDialog } from '@angular/material/dialog';
import { BranchActionComponent } from '../branch-action/branch-action.component';
import { IconButtonComponent } from '../../../shared/components/icon-button/icon-button.component';

@Component({
  selector: 'branches',
  templateUrl: 'branches.component.html',
  styleUrl: 'branches.component.scss',
  imports: [
    MatIcon,
    MatRipple,
    ProfileEmptyListComponent,
    IconButtonComponent
  ],
  standalone: true
})

export class BranchesComponent {
  dialog = inject(MatDialog);

  constructor() {
  }
  openBranchActionDialog(): void {
    this.dialog.open(BranchActionComponent, {
      width: '60%'
    })
  }
}
