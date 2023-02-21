import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ClienteService } from '@components/cliente/services/cliente.service';
import { City } from '@shared/models/city.model';
import { State } from '@shared/models/state.model';
import { Conta } from './../../../shared/models/conta.model';
import { User } from './../../../shared/models/user.model';
import { UserService } from './../../auth/services/user.service';
const jsonCities = require('@shared/data/cities.json');
const jsonStates = require('@shared/data/states.json');

@Component({
  selector: 'app-gerente-pesquisa',
  templateUrl: './gerente-pesquisa.component.html',
  styleUrls: ['./gerente-pesquisa.component.scss'],
})
export class GerentePesquisaComponent implements OnInit {
  user!: User | null;
  gerente!: User | null;
  conta!: Conta | null;
  errorMessage!: string | null;
  city!: City | null;
  state!: State | null;

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private contaService: ClienteService,
    private userService: UserService
  ) {
    this.form = this.formBuilder.group({
      cpf: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(\d{3}\.){2}\d{3}\-\d{2}$/),
        Validators.minLength(14),
        Validators.maxLength(14),
      ]),
    });
  }

  ngOnInit(): void {}

  getCliente(cpf: string): void {
    this.user =
      this.gerente =
      this.conta =
      this.errorMessage =
      this.city =
      this.state =
        null;
    this.userService.getUserByCPF(cpf).subscribe((users: User[]) => {
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

  cpfChange(): void {
    let cpfValue: string = this.form.value.cpf;
    let numeric = cpfValue.replace(/[^0-9]+/g, '');
    let cpfLength = numeric.length;

    let partOne = numeric.slice(0, 3) + '.';
    let partTwo = numeric.slice(3, 6) + '.';
    let partThree = numeric.slice(6, 9) + '-';

    if (cpfLength < 4) {
      this.form.controls['cpf'].setValue(numeric);
    } else if (cpfLength >= 4 && cpfLength < 7) {
      let formatCPF = partOne + numeric.slice(3);
      this.form.controls['cpf'].setValue(formatCPF);
    } else if (cpfLength >= 7 && cpfLength < 10) {
      let formatCPF = partOne + partTwo + numeric.slice(6);
      this.form.controls['cpf'].setValue(formatCPF);
    } else if (cpfLength >= 10 && cpfLength < 12) {
      let formatCPF = partOne + partTwo + partThree + numeric.slice(9);
      this.form.controls['cpf'].setValue(formatCPF);
    } else if (cpfLength >= 12) {
      let formatCPF = partOne + partTwo + partThree + numeric.slice(9, 11);
      this.form.controls['cpf'].setValue(formatCPF);
    }
  }
}
