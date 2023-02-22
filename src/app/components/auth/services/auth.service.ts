import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';
import { Login } from './../../../shared/models/login.model';
import { User } from './../../../shared/models/user.model';

const LS_USER: string = 'user';
const LS_CONTA: string = 'conta';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apUrlAuth = environment.url.auth;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public get usuarioLogado(): User {
    return localStorage[LS_USER] ? JSON.parse(localStorage[LS_USER]) : null;
  }

  public set usuarioLogado(usuario: User) {
    localStorage[LS_USER] = JSON.stringify(usuario);
  }

  public get contaCliente(): User {
    return localStorage[LS_CONTA] ? JSON.parse(localStorage[LS_CONTA]) : null;
  }

  public set contaCliente(usuario: User) {
    localStorage[LS_CONTA] = JSON.stringify(usuario);
  }

  login(login: Login): Observable<User> {
    return this.http.post<Login>(this.apUrlAuth + '/login', this.httpOptions);
  }

  logout(): Observable<Object> {
    delete localStorage[LS_USER];
    delete localStorage[LS_CONTA];
    return this.http.post<Login>(this.apUrlAuth + '/logout', this.httpOptions);
  }
}
