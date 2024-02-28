import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { IconButtonComponent } from '../../../shared/components/icon-button/icon-button.component';
import { MatDialogClose, MatDialogContent } from '@angular/material/dialog';
import { MatOption } from '@angular/material/autocomplete';
import { MatSelect } from '@angular/material/select';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { UiButtonComponent } from '../../../shared/components/ui-button/ui-button.component';
import { ScrollbarDirective } from '../../../shared/directives/scrollbar/scrollbar.directive';
import { YandexMapsService } from '../../../core/services/yandex-maps.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    provideNgxMask(),
    YandexMapsService
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class BranchActionComponent implements OnInit {
  private _yandexMapsService: YandexMapsService = inject(YandexMapsService);
  private _destroyRef = inject(DestroyRef);

  constructor() {
  }

  ngOnInit(): void {
    const coordinates = JSON.parse(localStorage.getItem('coordinates'));
    this._yandexMapsService.setSingleLocationPoint('map', coordinates);

    this._yandexMapsService.coordinates$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(coordinates => {
        localStorage.setItem('coordinates', JSON.stringify(coordinates));
      });
  }
}
