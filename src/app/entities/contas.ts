import { AbstractEntity } from "./abstract-entity";
import { Transferencia } from "./transferencia";

export interface Conta extends AbstractEntity {
    nomeResponsavel: string;
    saldo: number;
    transferencias: Array<Transferencia>;
}