import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AdminListarGerenteComponent } from '@components/admin/admin-listar-gerente/admin-listar-gerente.component';
import { GerenteClienteDetalhesComponent } from '@components/gerente/gerente-cliente-detalhes';
import { AdminHomeComponent } from './components/admin';
import { AdminAddEditGerenteComponent } from './components/admin/admin-add-edit-gerente/admin-add-edit-gerente.component';
import { AdminRelatorioComponent } from './components/admin/admin-relatorio/admin-relatorio.component';
import { AuthGuard } from './components/auth/auth.guard';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import {
  ClienteAlterarComponent,
  ClienteDepositarComponent,
  ClienteExtratoComponent,
  ClienteHomeComponent,
  ClienteSaqueComponent,
  ClienteTransferenciaComponent,
} from './components/cliente';
import { GerenteClientesComponent } from './components/gerente/gerente-clientes';
import { GerenteHomeComponent } from './components/gerente/gerente-home';
import { GerenteMelhoresClientesComponent } from './components/gerente/gerente-melhores-clientes';
import { GerentePesquisaComponent } from './components/gerente/gerente-pesquisa';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },

  // rotas auth
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // rotas cliente
  {
    path: 'cliente/home',
    component: ClienteHomeComponent,
    canActivate: [AuthGuard],
    data: { role: 'Cliente' },
  },
  {
    path: 'cliente/alterar',
    component: ClienteAlterarComponent,
    canActivate: [AuthGuard],
    data: { role: 'Cliente' },
  },
  {
    path: 'cliente/depositar',
    component: ClienteDepositarComponent,
    canActivate: [AuthGuard],
    data: { role: 'Cliente' },
  },
  {
    path: 'cliente/saque',
    component: ClienteSaqueComponent,
    canActivate: [AuthGuard],
    data: { role: 'Cliente' },
  },
  {
    path: 'cliente/extrato',
    component: ClienteExtratoComponent,
    canActivate: [AuthGuard],
    data: { role: 'Cliente' },
  },
  {
    path: 'cliente/transferencia',
    component: ClienteTransferenciaComponent,
    canActivate: [AuthGuard],
    data: { role: 'Cliente' },
  },

  // rotas admin
  { path: 'admin', redirectTo: 'admin/listar-gerente' },
  {
    path: 'admin/home',
    component: AdminHomeComponent,
    canActivate: [AuthGuard],
    data: { role: 'Administrador' },
  },
  {
    path: 'admin/listar-gerente',
    component: AdminListarGerenteComponent,
    canActivate: [AuthGuard],
    data: { role: 'Administrador' },
  },
  {
    path: 'admin/relatorio',
    component: AdminRelatorioComponent,
    canActivate: [AuthGuard],
    data: { role: 'Administrador' },
  },
  {
    path: 'admin/adicionar-gerente',
    component: AdminAddEditGerenteComponent,
    canActivate: [AuthGuard],
    data: { role: 'Administrador' },
  },
  {
    path: 'admin/editar-gerente/:id',
    component: AdminAddEditGerenteComponent,
    canActivate: [AuthGuard],
    data: { role: 'Administrador' },
  },
  {
    path: 'admin/relatorio',
    component: AdminRelatorioComponent,
    canActivate: [AuthGuard],
    data: { role: 'Administrador' },
  },

  // rotas gerente
  {
    path: 'gerente/home',
    component: GerenteHomeComponent,
    canActivate: [AuthGuard],
    data: { role: 'Gerente' },
  },
  {
    path: 'gerente/melhores-clientes',
    component: GerenteMelhoresClientesComponent,
    canActivate: [AuthGuard],
    data: { role: 'Gerente' },
  },
  {
    path: 'gerente/clientes',
    component: GerenteClientesComponent,
    canActivate: [AuthGuard],
    data: { role: 'Gerente' },
  },
  {
    path: 'gerente/pesquisa',
    component: GerentePesquisaComponent,
    canActivate: [AuthGuard],
    data: { role: 'Gerente' },
  },
  {
    path: 'gerente/home',
    component: GerenteHomeComponent,
    canActivate: [AuthGuard],
    data: { role: 'Gerente' },
  },
  {
    path: 'gerente/melhores-clientes',
    component: GerenteMelhoresClientesComponent,
    canActivate: [AuthGuard],
    data: { role: 'Gerente' },
  },
  {
    path: 'gerente/cliente/detalhes/:cpf',
    component: GerenteClienteDetalhesComponent,
    canActivate: [AuthGuard],
    data: { role: 'Gerente' },
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule, BrowserModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
