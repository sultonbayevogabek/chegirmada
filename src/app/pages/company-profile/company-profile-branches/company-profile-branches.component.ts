import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { IconButtonComponent } from '../../../core/components/icon-button/icon-button.component';

@Component({
  selector: 'company-profile-branches',
  templateUrl: 'company-profile-branches.component.html',
  styleUrl: 'company-profile-branches.component.scss',
   imports: [
      NgOptimizedImage,
      IconButtonComponent
   ],
  standalone: true
})

export class CompanyProfileBranchesComponent {}
