import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { Transacao } from '@shared/models';
import { Conta } from '@shared/models/conta.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrlConta = environment.url.conta;
  private apiUrlTransacaos = environment.url.transacaos;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  inserir(conta: Conta): Observable<Conta> {
    return this.http.post<Conta>(
      this.apiUrlConta,
      JSON.stringify(conta),
      this.httpOptions
    );
  }

  getAll(): Observable<Conta[]> {
    return this.http.get<Conta[]>(this.apiUrlConta + '/list');
  }

  getAllTransacaos(): Observable<Transacao[]> {
    return this.http.get<Transacao[]>(this.apiUrlTransacaos);
  }

  postTransacao(transacao: Transacao): Observable<Transacao> {
    return this.http.post<Transacao>(
      this.apiUrlTransacaos,
      JSON.stringify(transacao),
      this.httpOptions
    );
  }

  buscarContaPorId(id: number): Observable<Conta> {
    return this.http.get<Conta>(this.apiUrlConta + '/' + id, this.httpOptions);
  }

  buscarContaPorUserId(id: number): Observable<Conta[]> {
    return this.http.get<Conta[]>(
      this.apiUrlConta + '/' + id,
      this.httpOptions
    );
  }

  atualizarContaCliente(cliente: Conta): Observable<Conta> {
    return this.http.put<Conta>(
      this.apiUrlConta + '/' + cliente.id,
      JSON.stringify(cliente),
      this.httpOptions
    );
  }

  getClientesByGerente(idGerente: number): Observable<Conta[]> {
    return this.http.get<Conta[]>(
      this.apiUrlConta + '/por-gerente/' + idGerente,
      this.httpOptions
    );
  }

  getClientesPendenteByGerente(idGerente: number): Observable<Conta[]> {
    return this.http.get<Conta[]>(
      this.apiUrlConta + '/pendentes/' + idGerente,
      this.httpOptions
    );
  }
}
