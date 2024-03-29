import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from '@components/auth/services/auth.service';
import { UserService } from '@components/auth/services/user.service';
import { ClienteService } from '@components/cliente/services/cliente.service';
import { City } from '@shared/models/city.model';
import { Conta } from '@shared/models/conta.model';
import { State } from '@shared/models/state.model';
import { lastValueFrom, map } from 'rxjs';
import { User } from './../../../shared/models/user.model';
const jsonCities = require('@shared/data/cities.json');
const jsonStates = require('@shared/data/states.json');

interface IClienteCompleto {
  conta: Conta;
  cliente: User;
  city: City;
  state: State;
}
@Component({
  selector: 'app-gerente-clientes',
  templateUrl: './gerente-clientes.component.html',
  styleUrls: ['./gerente-clientes.component.scss'],
})
export class GerenteClientesComponent implements OnInit {
  clientes: IClienteCompleto[] = [];
  clientesFiltrados: IClienteCompleto[] = [];
  filtroFocus: string = '';
  displayedColumns = ['id', 'nome', 'cpf', 'cidade', 'estado', 'saldo', '_']; //CPF, Nome, Cidade, Estado e Saldo
  dataSource!: MatTableDataSource<IClienteCompleto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private contaService: ClienteService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  navigate(id: number) {
    this.router.navigate(['gerente/cliente/detalhes/' + id]);
  }

  async ngOnInit(): Promise<void> {
    this.contaService
      .getClientesByGerente(this.authService.usuarioLogado.id!)
      .subscribe(async (contas: Conta[]) => {
        await Promise.all(
          contas.map(async (item) => {
            await lastValueFrom(
              this.userService.getUserById(item.idUsuario!).pipe(
                map((user: User) => {
                  const estado: State = jsonStates.find(
                    (state: State) => (state.id = user.estado)
                  );
                  const cidade: City = jsonCities.find(
                    (city: City) => (city.id = user.cidade)
                  );
                  this.clientes.push({
                    conta: item,
                    cliente: user,
                    city: cidade,
                    state: estado,
                  });
                  this.checkFiltro();
                })
              )
            );
          })
        );
      });
  }

  filtroChange(cpfValue: string): void {
    this.filtroFocus = cpfValue;
    this.checkFiltro();
  }

  checkFiltro(): void {
    var expression = new RegExp(this.filtroFocus, 'i');
    if (this.filtroFocus.length == 0) {
      this.clientesFiltrados = this.clientes;
    } else {
      this.clientesFiltrados = this.clientes.filter(
        (item) =>
          item.cliente.nome &&
          item.cliente.cpf &&
          (expression.test(item.cliente.nome) ||
            expression.test(item.cliente.cpf))
      );
    }

    this.dataSource = new MatTableDataSource(this.clientesFiltrados);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (
      item: IClienteCompleto,
      property: string
    ) => {
      switch (property) {
        case 'id':
          return item.cliente.id;
        case 'nome':
          return item.cliente.nome;
        case 'cpf':
          return item.cliente.cpf;
        case 'saldo':
          return item.conta.saldo;
        case 'cidade':
          return item.city.nome;
        case 'estado':
          return item.city.estado;

        default:
          return (item as any)[property];
      }
    };
    const sortState: Sort = { active: 'nome', direction: 'asc' };
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }
}
