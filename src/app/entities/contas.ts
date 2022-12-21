import { AbstractEntity } from "./abstract-entity";
import { Transacao } from "./transacao";

export interface Conta extends AbstractEntity {
    nomeResponsavel: string;
    transacoes: Array<Transacao>;
}