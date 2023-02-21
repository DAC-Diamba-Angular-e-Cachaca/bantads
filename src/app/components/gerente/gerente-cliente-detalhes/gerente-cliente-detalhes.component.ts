import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@components/auth/services/user.service';
import { ClienteService } from '@components/cliente/services';
import { City } from '@shared/models/city.model';
import { Conta } from '@shared/models/conta.model';
import { State } from '@shared/models/state.model';
import { User } from '@shared/models/user.model';
const jsonCities = require('@shared/data/cities.json');
const jsonStates = require('@shared/data/states.json');

@Component({
  selector: 'app-gerente-cliente-detalhes',
  templateUrl: './gerente-cliente-detalhes.component.html',
  styleUrls: ['./gerente-cliente-detalhes.component.scss'],
})
export class GerenteClienteDetalhesComponent implements OnInit {
  cpfFocus: string = '';
  user!: User | null;
  gerente!: User | null;
  conta!: Conta | null;
  errorMessage!: string | null;
  city!: City | null;
  state!: State | null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private contaService: ClienteService
  ) {}

  ngOnInit(): void {
    this.cpfFocus = this.route.snapshot.params['cpf'];
    this.user =
      this.gerente =
      this.conta =
      this.errorMessage =
      this.city =
      this.state =
        null;
    this.userService.getUserByCPF(this.cpfFocus).subscribe((users: User[]) => {
      if (users.length === 0) {
        this.errorMessage = 'Nenhuma conta encontrada com esse CPF';
        return;
      }
      this.user = users[0];
      this.state = jsonStates.find(
        (state: State) => (state.id = this.user?.estado)
      );
      this.city = jsonCities.find(
        (city: City) => (city.id = this.user?.cidade)
      );
      this.contaService
        .buscarContaPorUserId(this.user.id!)
        .subscribe((conta: Conta[]) => {
          this.conta = conta[0];
          this.userService
            .getUserById(this.conta.idGerente!)
            .subscribe((gerente: User) => (this.gerente = gerente));
        });
    });
  }
}
