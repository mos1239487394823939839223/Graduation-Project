import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AbstractControl } from '@angular/forms';
import { getValidatorErrorMessage } from './validators-utils';


@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent{

  @Input()
  control!: AbstractControl;
  get errorMessage() {
    for (const validatorName in this.control?.errors) {
      if (this.control.touched)
        return getValidatorErrorMessage(
          validatorName,
          this.control.errors[validatorName]
        );
    }
    return null;
  }
}
