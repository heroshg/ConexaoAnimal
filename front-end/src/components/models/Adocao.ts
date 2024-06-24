import { Abrigo } from "./Abrigo";
import { Pet } from "./Pet";

export interface Adocao {
    id: number,
    AbrigoId: number,
    Abrigo: Abrigo,
    PetId: number,
    Pet: Pet,
    RealizadaEm: string,
    cpfTutor: string
}