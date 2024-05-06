import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UiButtonComponent } from '../../../core/components/ui-button/ui-button.component';

@Component({
  selector: 'balance',
  templateUrl: 'balance.component.html',
  styleUrl: 'balance.component.scss',
  imports: [
    TranslateModule,
    UiButtonComponent
  ],
  providers: [
  ],
  standalone: true
})

export class BalanceComponent implements OnInit {
  private _destroyRef = inject(DestroyRef);

  ngOnInit(): void {

  }


}
