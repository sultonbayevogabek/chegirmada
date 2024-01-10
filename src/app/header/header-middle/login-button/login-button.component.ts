import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'login-button',
  templateUrl: 'login-button.component.html',
  styleUrls: [ 'login-button.component.scss' ],
  imports: [
    MatIconModule
  ],
  standalone: true
})

export class LoginButtonComponent implements OnInit {
  dialog = inject(MatDialog);

  ngOnInit(): void {
    this.openLoginDialog();
  }

  openLoginDialog(): void {
    this.dialog.open(LoginDialogComponent, {
      closeOnNavigation: true,
      panelClass: 'login-dialog',
      width: '27rem',
      maxWidth: '100%'
    });
  }
}
