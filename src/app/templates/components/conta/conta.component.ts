import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Conta } from 'src/app/entities/contas';
import { Transacao } from 'src/app/entities/transacao';
import { NotificationType } from 'src/app/enums/notification-type';
import { FacadeService } from 'src/app/services/facade.service';
import { MessageUtils } from 'src/app/utils/message';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.sass']
})
export class ContaComponent implements OnInit {

  conta!: Conta;
  columns!: Array<String>;
  dataInicio!: string;
  dataFim!: string;
  dataSource!: MatTableDataSource<Transacao>;
  nomeOperadorTransacao!: string;
  saldoPeriodo!: number;
  saldoTotal!: number;

  @ViewChild(MatPaginator, { static: false }) set paginator(value: MatPaginator) { if (this.dataSource) this.dataSource.paginator = value }
  @ViewChild(MatSort, { static: false }) set sort(value: MatSort) { if (this.dataSource) this.dataSource.sort = value }

  constructor(
    private activatedRoute: ActivatedRoute,
    private facade: FacadeService
    
  ) { }
  
  ngOnInit(): void {
    
    this.columns = ['data', 'valor', 'tipo', 'nome-operador-transacao'];
    this.dataSource = new MatTableDataSource();
    this.saldoPeriodo = 0;
    this.saldoTotal = 0;

    this.activatedRoute.params.subscribe((x: any) => {

      if (x && x.id) {
        
        this.facade.contaFindById(x.id).subscribe({

          next: (conta) => {
            this.conta = conta;
            this.buildSaldoTotal();
          },

          error: (error) => {
            console.error(error);
            this.facade.notificationShow(MessageUtils.CONTA_GET_FAIL, NotificationType.FAIL);
          },
        });
      }
    });

    this.dataSource.sortingDataAccessor = (item: any, property: any) => {
      switch (property) {
        case 'data': return new Date(item.dataTransacao);
        default: return item[property];
      }
    };
  }

  buildSaldoPeriodo() {

    this.facade.contaFindTransacoes(this.conta.id, this.dataInicio, this.dataFim, this.nomeOperadorTransacao).subscribe({
      
      next: (transacoes) => {
        this.buildTable(transacoes);
        this.conta.transacoes = transacoes;
        this.saldoPeriodo = transacoes
          .sort((a, b) => new Date(a.dataTransacao).getTime() > new Date(b.dataTransacao).getTime() ? 1 : -1)
          .map(t => t.valor)
          .reduce((a, b) => a + b, 0);
      },

      error: (error) => {
        console.error(error);
        this.facade.notificationShow(MessageUtils.TRANSACOES_GET_FAIL, NotificationType.FAIL);
      }
    });
  }

  buildSaldoTotal() {

    this.facade.contaFindTransacoes(this.conta.id, '', '', '').subscribe({

      next: (transacoes) => {
        this.saldoTotal = transacoes
          .sort((a, b) => new Date(a.dataTransacao).getTime() > new Date(b.dataTransacao).getTime() ? 1 : -1)
          .map(t => t.valor)
          .reduce((a, b) => a + b, 0);
      },

      error: (error) => {
        console.error(error);
        this.facade.notificationShow(MessageUtils.TRANSACOES_GET_FAIL, NotificationType.FAIL);
      }
    });
  }

  buildTable(transacoes: Array<Transacao>) {
    this.dataSource.data = transacoes;
    this.dataSource._updateChangeSubscription();
  }

  setDataInicio(value: string) {
    this.dataInicio = value;
  }

  setDataFim(value: string) {
    this.dataFim = value;
  }

  setNomeOperadorTransacao(value: string) {
    this.nomeOperadorTransacao = value;
  }
}