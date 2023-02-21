import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '@components/auth/services/auth.service';
import { UserService } from '@components/auth/services/user.service';
import { ClienteService } from '@components/cliente/services';
import { City } from '@shared/models/city.model';
import { Conta } from '@shared/models/conta.model';
import { State } from '@shared/models/state.model';
import { User } from '@shared/models/user.model';
import { lastValueFrom, map } from 'rxjs';
const jsonCities = require('@shared/data/cities.json');
const jsonStates = require('@shared/data/states.json');

interface IClienteCompleto {
  conta: Conta;
  cliente: User;
  city: City;
  state: State;
}
@Component({
  selector: 'app-gerente-melhores-clientes',
  templateUrl: './gerente-melhores-clientes.component.html',
  styleUrls: ['./gerente-melhores-clientes.component.scss'],
})
export class GerenteMelhoresClientesComponent implements OnInit {
  clientes: IClienteCompleto[] = [];

  displayedColumns = ['id', 'nome', 'cpf', 'cidade', 'estado', 'saldo'];
  dataSource!: MatTableDataSource<IClienteCompleto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private contaService: ClienteService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  async ngOnInit(): Promise<void> {
    this.contaService
      .getClientesByGerente(this.authService.usuarioLogado.id!)
      .subscribe(async (contas: Conta[]) => {
        contas = contas
          .sort((a, b) => {
            return a.saldo! > b.saldo! ? -1 : 1;
          })
          .slice(0, 5);
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
                  this.dataSource = new MatTableDataSource(this.clientes);
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
                  const sortState: Sort = {
                    active: 'saldo',
                    direction: 'desc',
                  };
                  this.sort.direction = sortState.direction;
                  this.sort.sortChange.emit(sortState);
                })
              )
            );
          })
        );
      });
  }
}
