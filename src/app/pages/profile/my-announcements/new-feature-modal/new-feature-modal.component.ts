import { Component, inject, Inject } from '@angular/core';
import { IconButtonComponent } from '../../../../core/components/icon-button/icon-button.component';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { UiButtonComponent } from '../../../../core/components/ui-button/ui-button.component';
import { TrimDirective } from '../../../../core/directives/trim.directive';

@Component({
  selector: 'new-feature-modal',
  templateUrl: 'new-feature-modal.component.html',
  styleUrl: 'new-feature-modal.component.scss',
  imports: [
    IconButtonComponent,
    MatDialogClose,
    MatDialogContent,
    MatOption,
    MatSelect,
    ReactiveFormsModule,
    TranslateModule,
    UiButtonComponent,
    TrimDirective
  ],
  standalone: true
})

export class NewFeatureModalComponent {
  @Inject(MAT_DIALOG_DATA) data: {
    dialogType: 'value' | 'template'
  } = inject(MAT_DIALOG_DATA);

  private _dialogRef = inject(MatDialogRef)

  newFeatureForm = new FormGroup({
    control: new FormControl('', [Validators.required])
  })

  cancel(): void {
    this._dialogRef.close();
  }

  save(): void {
    this._dialogRef.close(this.newFeatureForm.get('control').value);
  }
}
