import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';
import { User } from './../../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrlGerente = environment.url.gerente;
  private apiUrlCliente = environment.url.cliente;
  private apiUrlAuth = environment.url.auth;
  private apiUrlOrquestrador = environment.url.orquestrador;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getGerentes(): Observable<User[]> {
    return this.http.get<User[]>(
      this.apiUrlGerente + '/list',
      this.httpOptions
    );
  }

  getClientes(): Observable<User[]> {
    return this.http.get<User[]>(
      this.apiUrlCliente + '/list',
      this.httpOptions
    );
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.apiUrlAuth + '/' + id, this.httpOptions);
  }

  inserir(usuario: User): Observable<User> {
    return this.http.post<User>(
      this.apiUrlOrquestrador + '/cliente',
      JSON.stringify(usuario),
      this.httpOptions
    );
  }

  atualizarUser(usuario: User): Observable<User> {
    return this.http.put<User>(
      this.apiUrlCliente + '/' + usuario.id,
      JSON.stringify(usuario),
      this.httpOptions
    );
  }

  removerGerente(id: number): Observable<User> {
    return this.http.delete<User>(
      this.apiUrlGerente + '/' + id,
      this.httpOptions
    );
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(
      this.apiUrlCliente + '/por-email/' + email,
      this.httpOptions
    );
  }
  getClienteByCPF(cpf: string): Observable<User[]> {
    return this.http.get<User[]>(
      this.apiUrlCliente + '/por-cpf/' + cpf,
      this.httpOptions
    );
  }
  getGerenteByCPF(cpf: string): Observable<User[]> {
    return this.http.get<User[]>(
      this.apiUrlGerente + '/por-cpf/' + cpf,
      this.httpOptions
    );
  }

  getClienteByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(
      this.apiUrlCliente + '/por-email/' + email,
      this.httpOptions
    );
  }
  getGerenteByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(
      this.apiUrlCliente + '/por-email/' + email,
      this.httpOptions
    );
  }

  getUserByCPF(cpf: string): Observable<User[]> {
    return this.http.get<User[]>(
      this.apiUrlCliente + '/por-cpf/' + cpf,
      this.httpOptions
    );
  }
}
