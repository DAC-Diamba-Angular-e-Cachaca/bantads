import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { AngularMaterialModule } from 'app/angular-material.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgxMaskModule } from 'ngx-mask';
import { ClienteAlterarComponent } from './cliente-alterar/cliente-alterar.component';
import { ClienteDepositarComponent } from './cliente-depositar/cliente-depositar.component';
import { ClienteExtratoComponent } from './cliente-extrato/cliente-extrato.component';
import { ClienteHomeComponent } from './cliente-home/cliente-home.component';
import { ClienteSaqueComponent } from './cliente-saque/cliente-saque.component';
import { ClienteTransferenciaComponent } from './cliente-transferencia/cliente-transferencia.component';

@NgModule({
  declarations: [
    ClienteHomeComponent,
    ClienteAlterarComponent,
    ClienteDepositarComponent,
    ClienteSaqueComponent,
    ClienteTransferenciaComponent,
    ClienteExtratoComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CurrencyMaskModule,
    MatTableModule,
    AngularMaterialModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    ClienteHomeComponent,
    ClienteAlterarComponent,
    ClienteDepositarComponent,
    ClienteSaqueComponent,
    ClienteTransferenciaComponent,
    ClienteExtratoComponent,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class ClienteModule {}
