import { Directive, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[trim]',
  standalone: true
})

export class TrimDirective {
  control = inject(NgControl);

  @HostListener('input', [ '$event' ]) onInput(): void {
    let value: string = this.control?.control?.value;
    if (value) {
      value = value?.trimStart()?.replace(/  /g, ' ');
      this.control.control?.setValue(value);
    }
  }

  @HostListener('blur', [ '$event' ]) onBlur(): void {
    let value: string = this.control?.control?.value;
    this.control.control?.setValue(value?.trim());
  }
}
