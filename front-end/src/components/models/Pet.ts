import { Abrigo } from "./Abrigo";
import { Adocao } from "./Adocao";

export interface Pet {
    
    petId?: number,
    nome: string,
    idade: number,
    unidadeTempo: string,
    porte: string,
    descricao: string,
    criadoEm?: string,
    abrigoId?: number,
    abrigo?: Abrigo
    adocao?: Adocao
}