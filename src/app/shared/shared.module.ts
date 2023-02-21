import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CpfValidatorDirective } from './directives/cpf-validator.directive';
import { NumericoDirective } from './directives/numerico.directive';

@NgModule({
  declarations: [NumericoDirective, CpfValidatorDirective],
  imports: [CommonModule],
  exports: [NumericoDirective, CpfValidatorDirective],
})
export class SharedModule {}
