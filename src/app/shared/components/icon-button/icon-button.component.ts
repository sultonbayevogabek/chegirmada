import { Component, Input, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatRipple } from '@angular/material/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'icon-button',
  templateUrl: 'icon-button.component.html',
  styleUrl: 'icon-button.component.scss',
  imports: [
    MatIcon,
    MatRipple,
    NgStyle
  ],
  standalone: true
})

export class IconButtonComponent implements OnInit {
  @Input() buttonType: 'simple' | 'blue' | 'red' | 'icon-secondary' | 'red-flat' = 'simple';
  @Input() icon = 'icon:x';
  @Input() iconWidth = 1;

  matRippleColor = '#F8FAFC50';

  ngOnInit() {
    switch (this.buttonType) {
      case 'blue':
        this.matRippleColor = '#0CA4FA20';
        break;
      case 'red':
        this.matRippleColor = '#FF034C20';
        break;
    }
  }
}
