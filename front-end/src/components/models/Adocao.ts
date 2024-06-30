import { Abrigo } from "./Abrigo";
import { Pet } from "./Pet";

export interface Adocao {
    id?: number,
    abrigoId?: number,
    abrigo?: Abrigo,
    petId?: number,
    pet?: Pet,
    realizadaEm?: string,
    cpfTutor: string
}