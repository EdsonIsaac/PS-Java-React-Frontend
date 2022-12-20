import { Component, OnInit } from '@angular/core';
import { Conta } from 'src/app/entities/contas';
import { NotificationType } from 'src/app/enums/notification-type';
import { FacadeService } from 'src/app/services/facade.service';
import { MessageUtils } from 'src/app/utils/message';

@Component({
  selector: 'app-contas',
  templateUrl: './contas.component.html',
  styleUrls: ['./contas.component.sass']
})
export class ContasComponent implements OnInit {

  contas!: Array<Conta>;
  contasToShow!: Array<Conta>;

  constructor(
    private facade: FacadeService
  ) { }

  ngOnInit(): void {
    
    this.facade.contaFindAll().subscribe({

      next: (contas) => {
        this.contas = contas.sort((a, b) => a.nomeResponsavel.toUpperCase() > b.nomeResponsavel.toUpperCase() ? 1 : -1);
        this.contasToShow = this.contas;
      },

      error: (error) => {
        console.error(error);
        this.facade.notificationShow(MessageUtils.CONTAS_GET_FAIL, NotificationType.FAIL);   
      }
    })
  }

  filter(value: string) {
    this.contasToShow = this.contas.filter(conta => conta.nomeResponsavel.toUpperCase().includes(value.toUpperCase()));
  }
}
