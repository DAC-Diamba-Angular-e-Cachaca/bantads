import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AdminAdicionarGerenteComponent } from '@components/admin/admin-adicionar-gerente/admin-adicionar-gerente.component';
import { AdminEditarGerenteComponent } from '@components/admin/admin-editar-gerente/admin-editar-gerente.component';
import { AdminListarGerenteComponent } from '@components/admin/admin-listar-gerente/admin-listar-gerente.component';
import { AdminRemoverGerenteComponent } from '@components/admin/admin-remover-gerente/admin-remover-gerente.component';
import { AdminHomeComponent } from './components/admin';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ClienteHomeComponent } from './components/cliente';
import { GerenteClientesComponent } from './components/gerente/gerente-clientes';
import { GerenteHomeComponent } from './components/gerente/gerente-home';
import { GerenteMelhoresClientesComponent } from './components/gerente/gerente-melhores-clientes';
import { GerentePesquisaComponent } from './components/gerente/gerente-pesquisa';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cliente/home', component: ClienteHomeComponent },

  // rotas admin
  { path: 'admin/home', component: AdminHomeComponent },
  { path: 'admin', redirectTo: 'admin/listar-gerente' },
  { path: 'admin/listar-gerente', component: AdminListarGerenteComponent },
  {
    path: 'admin/adicionar-gerente',
    component: AdminAdicionarGerenteComponent,
  },
  { path: 'admin/remover-gerente', component: AdminRemoverGerenteComponent },
  { path: 'admin/editar-gerente/:id', component: AdminEditarGerenteComponent },

  // rotas gerente
  { path: 'gerente/home', component: GerenteHomeComponent },
  {
    path: 'gerente/melhores-clientes',
    component: GerenteMelhoresClientesComponent,
  },
  { path: 'gerente/clientes', component: GerenteClientesComponent },
  { path: 'gerente/pesquisa', component: GerentePesquisaComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule, BrowserModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
