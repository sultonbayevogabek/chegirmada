import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { BreadcrumbModel } from '../../models/breadcrumb.model';

@Component({
  selector: 'bread-crumbs',
  templateUrl: 'bread-crumbs.component.html',
  styleUrl: 'bread-crumbs.component.scss',
  imports: [
    MatIconModule,
    RouterLink
  ],
  standalone: true
})

export class BreadCrumbsComponent {
  @Input({
    required: true
  }) breadCrumbs: BreadcrumbModel[] = [];
}
