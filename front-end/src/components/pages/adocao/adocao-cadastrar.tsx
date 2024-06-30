import { useEffect, useState } from "react";
import { Abrigo } from "../../models/Abrigo";
import { Pet } from "../../models/Pet";
import { Adocao } from "../../models/Adocao";

function AdocaoCadastrar() {
    const [menuCadastrar, setMenuCadastrar] = useState(false);
    const [pets, setPets] = useState<Pet[]>([])
    const [petId, setPetId] = useState<number | undefined>(undefined);
    const [abrigos, setAbrigos] = useState<Abrigo[]>([]);
    const [abrigoId, setAbrigoId] = useState<number | undefined>(undefined);
    const [cpfTutor, setCpfTutor] = useState("");

    useEffect(() => {
        buscarAbrigos();
        buscarPets();
    }, []); 

    function digitarCpfTutor(e: any) {
        setCpfTutor(e.target.value);
    }
   function digitarPet(e: any) {
    const selectedPetId = parseInt(e.target.value)
    setPetId(selectedPetId);
   }
    function digitarAbrigo(e : any) {
        const selectedAbrigoId = parseInt(e.target.value);
        setAbrigoId(selectedAbrigoId);
        console.log(selectedAbrigoId);
    }

    function buscarPets() {
        fetch("http://localhost:5187/pets/listar")
            .then((res) => res.json())
            .then((pets: Pet[]) => {
                setPets(pets);
            })
            .catch((err) => console.log(err));
    }

    function buscarAbrigos() {
        fetch("http://localhost:5187/abrigos/listar")
            .then((res) => res.json())
            .then((abrigos: Abrigo[]) => {
                setAbrigos(abrigos);
            })
            .catch((err) => console.log(err));
    }

    function cadastrarAdocao(e: any) {
        e.preventDefault();
        const adocao: Adocao = {
            petId: petId,
            abrigoId: abrigoId,
            cpfTutor: cpfTutor
        };
        fetch("http://localhost:5187/adocoes/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(adocao),
        }).then((data) => {
            console.log(adocao);
            window.location.reload();
        })
        .catch((err) => console.log(err));
    }

    return(
        <>
        <button className="p-1 bg-sky-800 rounded font-bold text-white" onClick={() => setMenuCadastrar(!menuCadastrar)}>Cadastrar nova adoção</button>
        {menuCadastrar &&
            <dialog open>
                <form className="flex flex-col items-center" onSubmit={cadastrarAdocao}>
                    <h1>Cadastre a nova adoção no sistema</h1>
                    <label>CPF do tutor:</label>
                    <input placeholder="Ex: 123.456.789-12" className="border-4" type="text" onChange={digitarCpfTutor} />
                    <br />
                    <label>Abrigos</label>
                    <select onChange={digitarAbrigo}>
                        <option value="">Selecione um abrigo</option>
                        {abrigos.map((abrigo) => (
                            <option value={abrigo.abrigoId} key={abrigo.abrigoId}>
                                {abrigo.nome}
                            </option>
                        ))}
                    </select>
                    <br />
                    <select onChange={digitarPet}>
                        <option value="">Selecione um pet</option>
                        {pets.map((pets) => (
                            <option value={pets.petId} key={pets.petId}>
                                {pets.nome}
                            </option>
                        ))}
                    </select>
                    <button className="border-2" type="submit">Enviar</button>
                    <button type="button" className="p-1 bg-sky-800 rounded font-bold text-white" onClick={() => setMenuCadastrar(!menuCadastrar)}>Fechar</button>
                </form>
            </dialog>
        }
        </>
    );
}

export default AdocaoCadastrar;