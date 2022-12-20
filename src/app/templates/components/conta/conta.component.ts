import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Conta } from 'src/app/entities/contas';
import { Transferencia } from 'src/app/entities/transferencia';
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
  dataSource!: MatTableDataSource<Transferencia>;
  nomeOperadorTransacao!: string;
  showTable!: boolean;

  @ViewChild(MatPaginator, { static: false }) set paginator(value: MatPaginator) { if (this.dataSource) this.dataSource.paginator = value }
  @ViewChild(MatSort, { static: false }) set sort(value: MatSort) { if (this.dataSource) this.dataSource.sort = value }

  constructor(
    private activatedRoute: ActivatedRoute,
    private facade: FacadeService
    
  ) { }
  
  ngOnInit(): void {
    
    this.columns = ['data', 'valor', 'tipo', 'nome-operador-transacao'];
    this.dataSource = new MatTableDataSource();

    this.activatedRoute.params.subscribe((x: any) => {

      if (x && x.id) {
        
        this.facade.contaFindById(x.id).subscribe({

          next: (conta) => {
            this.conta = conta;
          },

          error: (error) => {
            console.error(error);
            this.facade.notificationShow(MessageUtils.CONTA_GET_FAIL, NotificationType.FAIL);
          },
        });
      }
    })
  }

  buildTable(transferencias: Array<Transferencia>) {

    this.dataSource.data = transferencias;

    this.dataSource.sortingDataAccessor = (item: any, property: any) => {
      switch (property) {
        case 'data': return new Date(item.dataTransferencia);
        default: return item[property];
      }
    };

    this.showTable = true;
  }

  findTransferencias() {

    this.facade.contaFindTransferencias(this.conta.id, this.dataInicio, this.dataFim, this.nomeOperadorTransacao).subscribe({
      
      next: (transferencias) => {
        this.conta.transferencias = transferencias;
        this.buildTable(transferencias);
      },

      error: (error) => {
        console.error(error);
        this.facade.notificationShow(MessageUtils.TRANSFERENCIAS_GET_FAIL, NotificationType.FAIL);
      },
    });
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