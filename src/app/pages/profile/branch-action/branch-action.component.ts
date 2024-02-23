import { Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { IconButtonComponent } from '../../../shared/components/icon-button/icon-button.component';
import { MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { UiButtonComponent } from '../../../shared/components/ui-button/ui-button.component';
import { ScrollbarDirective } from '../../../shared/directives/scrollbar/scrollbar.directive';

@Component({
  selector: 'branch-action',
  templateUrl: 'branch-action.component.html',
  styleUrl: 'branch-action.component.scss',
  imports: [
    MatIconButton,
    IconButtonComponent,
    MatDialogClose,
    MatDialogContent,
    MatOption,
    MatSelect,
    NgxMaskDirective,
    MatRadioButton,
    MatRadioGroup,
    UiButtonComponent,
    ScrollbarDirective
  ],
  providers: [
    provideNgxMask()
  ],
  standalone: true
})

export class BranchActionComponent {}
