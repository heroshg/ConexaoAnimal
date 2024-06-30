import { useEffect, useState } from "react";
import { Abrigo } from "../../models/Abrigo";
import { Pet } from "../../models/Pet";
import { Adocao } from "../../models/Adocao";

function AdocaoCadastrar() {
    const [menuCadastrar, setMenuCadastrar] = useState(false);
    const [pets, setPets] = useState<Pet[]>([]);
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
        const selectedPetId = parseInt(e.target.value);
        setPetId(selectedPetId);
    }

    function digitarAbrigo(e: any) {
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

    return (
        <>
            <button className="p-2 bg-stone-900 rounded font-bold text-white mt-4" onClick={() => setMenuCadastrar(!menuCadastrar)}>Cadastrar nova adoção</button>
            {menuCadastrar &&
                <dialog open className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <form className="bg-white p-6 rounded shadow-md space-y-4" onSubmit={cadastrarAdocao}>
                        <h1 className="text-xl font-bold mb-4">Cadastre a nova adoção no sistema</h1>
                        <div className="flex flex-col">
                            <label htmlFor="cpfTutor" className="mb-1 font-semibold">CPF do tutor:</label>
                            <input
                                id="cpfTutor"
                                type="text"
                                placeholder="Ex: 123.456.789-12"
                                className="border rounded px-3 py-2"
                                onChange={digitarCpfTutor}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="abrigo" className="mb-1 font-semibold">Abrigos</label>
                            <select id="abrigo" className="border rounded px-3 py-2" onChange={digitarAbrigo}>
                                <option value="">Selecione um abrigo</option>
                                {abrigos.map((abrigo) => (
                                    <option value={abrigo.abrigoId} key={abrigo.abrigoId}>
                                        {abrigo.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="pet" className="mb-1 font-semibold">Pets</label>
                            <select id="pet" className="border rounded px-3 py-2" onChange={digitarPet}>
                                <option value="">Selecione um pet</option>
                                {pets.map((pet) => (
                                    <option value={pet.petId} key={pet.petId}>
                                        {pet.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-between">
                            <button className="bg-sky-800 text-white font-bold py-2 px-4 rounded" type="submit">Enviar</button>
                            <button type="button" className="bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={() => setMenuCadastrar(!menuCadastrar)}>Fechar</button>
                        </div>
                    </form>
                </dialog>
            }
        </>
    );
}

export default AdocaoCadastrar;
