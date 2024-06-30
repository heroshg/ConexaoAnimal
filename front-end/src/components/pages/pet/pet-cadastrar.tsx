import { useEffect, useState } from "react";
import { Abrigo } from "../../models/Abrigo";
import { Pet } from "../../models/Pet";

function PetCadastrar() {
    const [menuCadastrar, setMenuCadastrar] = useState(false);
    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState(0);
    const [unidadeTempo, setUnidadeTempo] = useState("");
    const [porte, setPorte] = useState("");
    const [descricao, setDescricao] = useState("");
    const [abrigos, setAbrigos] = useState<Abrigo[]>([]);
    const [abrigoId, setAbrigoId] = useState<number | undefined>(undefined);

    useEffect(() => {
        buscarAbrigos();
    }, []);

    function digitarNome(e: React.ChangeEvent<HTMLInputElement>) {
        setNome(e.target.value);
    }
    function digitarIdade(e: React.ChangeEvent<HTMLInputElement>) {
        setIdade(parseInt(e.target.value));
    }
    function digitarUnidadeTempo(e: React.ChangeEvent<HTMLInputElement>) {
        setUnidadeTempo(e.target.value);
    }
    function digitarPorte(e: React.ChangeEvent<HTMLInputElement>) {
        setPorte(e.target.value);
    }
    function digitarDescricao(e: React.ChangeEvent<HTMLInputElement>) {
        setDescricao(e.target.value);
    }
    function digitarAbrigo(e: React.ChangeEvent<HTMLSelectElement>) {
        const selectedAbrigoId = parseInt(e.target.value);
        setAbrigoId(selectedAbrigoId);
    }

    function buscarAbrigos() {
        fetch("http://localhost:5187/abrigos/listar")
            .then((res) => res.json())
            .then((abrigos: Abrigo[]) => {
                setAbrigos(abrigos);
            })
            .catch((err) => console.log(err));
    }

    function cadastrarPet(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const pet: Pet = {
            nome: nome,
            idade: idade,
            unidadeTempo: unidadeTempo,
            porte: porte,
            descricao: descricao,
            abrigoId: abrigoId,
        };
        fetch("http://localhost:5187/pets/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pet),
        })
            .then(() => {
                window.location.reload();
            })
            .catch((err) => console.log(err));
    }

    return (
        <>
            <button
                className="p-2 bg-stone-900 rounded font-bold text-white mt-4"
                onClick={() => setMenuCadastrar(!menuCadastrar)}
            >
                Cadastrar novo pet
            </button>
            {menuCadastrar && (
                <dialog open>
                    <form className="flex flex-col items-center" onSubmit={cadastrarPet}>
                        <h1 className="mb-4 text-lg font-bold">Cadastre o novo pet no sistema</h1>
                        <label className="mb-2">Nome do pet:</label>
                        <input
                            placeholder="Nome"
                            className="border-2 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            onChange={digitarNome}
                        />
                        <label className="mb-2">Idade:</label>
                        <input
                            placeholder="Ex: 18"
                            className="border-2 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            onChange={digitarIdade}
                        />
                        <label className="mb-2">Unidade tempo:</label>
                        <input
                            placeholder="Ex: meses ou anos"
                            className="border-2 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            onChange={digitarUnidadeTempo}
                        />
                        <label className="mb-2">Porte:</label>
                        <input
                            placeholder="Ex: P, M, G"
                            className="border-2 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            onChange={digitarPorte}
                        />
                        <label className="mb-2">Descrição:</label>
                        <input
                            placeholder="Ex: Adorável e amável"
                            className="border-2 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            onChange={digitarDescricao}
                        />
                        <label className="mb-2">Abrigos:</label>
                        <select
                            onChange={digitarAbrigo}
                            className="border-2 rounded-lg px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Selecione um abrigo</option>
                            {abrigos.map((abrigo) => (
                                <option value={abrigo.abrigoId} key={abrigo.abrigoId}>
                                    {abrigo.nome}
                                </option>
                            ))}
                        </select>
                        <div className="flex">
                            <button
                                className="border-2 rounded-lg px-4 py-2 bg-blue-800 text-white mr-4"
                                type="submit"
                            >
                                Enviar
                            </button>
                            <button
                                type="button"
                                className="p-2 bg-blue-800 rounded-lg font-bold text-white"
                                onClick={() => setMenuCadastrar(false)}
                            >
                                Fechar
                            </button>
                        </div>
                    </form>
                </dialog>
            )}
        </>
    );
}

export default PetCadastrar;
