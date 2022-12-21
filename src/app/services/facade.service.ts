import { Injectable } from '@angular/core';
import { ContaService } from './conta.service';
import { NotificationService } from './notification.service';
import { NotificationType } from '../enums/notification-type';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {
  
  constructor(
    private contaService: ContaService,
    private notificationService: NotificationService
  ) { }

  ////////////////////////////////////////////// CONTA //////////////////////////////////////////////

  /**
   * 
   * @returns 
   */
  contaFindAll() {
    return this.contaService.findAll();
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  contaFindById(id: any) {
    return this.contaService.findById(id);
  }

  /**
   * 
   * @param id 
   * @param dataInicio 
   * @param dataFim 
   * @param nomeOperadorTransacao 
   */
  contaFindTransacoes(id: number, dataInicio: string, dataFim: string, nomeOperadorTransacao: string) {
    return this.contaService.findTransacoes(id, dataInicio, dataFim, nomeOperadorTransacao);
  }

  ////////////////////////////////////////////// NOTIFICAÇÃO //////////////////////////////////////////////

  /**
   * 
   * @param message 
   * @param type 
   */
  notificationShow(message: string, type: NotificationType) {
    this.notificationService.show(message, type);
  }

  ////////////////////////////////////////////// TRANSFERÊNCIA //////////////////////////////////////////////

  
}