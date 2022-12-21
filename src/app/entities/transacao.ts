import { AbstractEntity } from './abstract-entity';
import { Conta } from './contas';

export interface Transacao extends AbstractEntity {
    dataTransacao: Date;
    valor: number;
    tipo: string;
    nomeOperadorTransacao: string;
    conta: Conta;
}