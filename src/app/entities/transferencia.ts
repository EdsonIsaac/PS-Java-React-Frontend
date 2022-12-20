import { AbstractEntity } from './abstract-entity';
import { Conta } from './contas';

export interface Transferencia extends AbstractEntity {
    dataTransferencia: Date;
    valor: number;
    tipo: string;
    nomeOperadorTransacao: string;
    conta: Conta;
}