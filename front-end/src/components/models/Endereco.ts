import { Abrigo } from "./Abrigo"

export interface Endereco {
    enderecoId?: number,
    logradouro: string,
    cidade: string
    uf: string,
    cep: string,
    numero: number,
    dataCriacao?: string,
    abrigo?: Abrigo
}
