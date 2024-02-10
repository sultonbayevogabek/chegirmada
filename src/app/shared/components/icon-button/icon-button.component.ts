import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();
  @Input() type: 'simple' | 'blue' | 'red' = 'simple';
  @Input() icon = 'icon:x';
  @Input() iconWidth = 1;

  matRippleColor = '#F8FAFC50';

  ngOnInit() {
    switch (this.type) {
      case 'blue':
        this.matRippleColor = '#0CA4FA20';
        break;
      case 'red':
        this.matRippleColor = '#FF034C20';
        break;
    }
  }
}
