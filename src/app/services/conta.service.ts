import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Conta } from '../entities/contas';
import { Transacao } from '../entities/transacao';

type Filters = {[key: string] : string}

@Injectable({
  providedIn: 'root'
})
export class ContaService {
  
  constructor(private http: HttpClient) { }

  /**
   * 
   * @returns 
   */
  findAll() {
    return this.http.get<Array<Conta>>(environment.apiURL + '/contas');
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  findById(id: any) {
    return this.http.get<Conta>(environment.apiURL + '/contas/' + id);
  }

  /**
   * 
   * @param id 
   * @param dataInicio 
   * @param dataFim 
   * @param nomeOperadorTransacao 
   */
  findTransacoes(id: number, dataInicio: string, dataFim: string, nomeOperadorTransacao: string) {

    const params: Filters = {};

    if (dataInicio) {
      let array = dataInicio.split('/');
      params['inicio'] = array[2] + '-' + array[1] + '-' + array[0] + 'T00:00:00';
    }

    if (dataFim) {
      let array = dataFim.split('/');
      params['fim'] = array[2] + '-' + array[1] + '-' + array[0] + 'T00:00:00';
    }

    if (nomeOperadorTransacao) {
      params['operador'] = nomeOperadorTransacao;
    }

    return this.http.get<Array<Transacao>>(environment.apiURL + '/contas/' + id + '/transacoes' , {
      params: params
    });
  }
}