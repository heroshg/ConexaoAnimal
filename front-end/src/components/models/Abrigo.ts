import { Adocao } from "./Adocao"
import { Endereco } from "./Endereco"
import { Pet } from "./Pet"

export interface Abrigo {
    abrigoId?: number,
    nome: string,
    qtdPets: number,
    dataCriacao?: string,
    enderecoId: number,
    endereco?: Endereco,
    pets?: Pet[],
    adocoes?: Adocao[]
}