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

    function digitarNome(e: any) {
        setNome(e.target.value);
    }
    function digitarIdade(e: any) {
        let idade = e.target.value;
        setIdade(parseInt(idade));
    }
    function digitarUnidadeTempo(e: any) {
        setUnidadeTempo(e.target.value);
    }
    function digitarPorte(e: any) {
        setPorte(e.target.value);
    }
    function digitarDescricao(e: any) {
        setDescricao(e.target.value);
    }
    function digitarAbrigo(e: any) {
        const selectedAbrigoId = parseInt(e.target.value);
        setAbrigoId(selectedAbrigoId);
        console.log(selectedAbrigoId);
    }

    function buscarAbrigos() {
        fetch("http://localhost:5187/abrigos/listar")
            .then((res) => res.json())
            .then((abrigos: Abrigo[]) => {
                setAbrigos(abrigos);
            })
            .catch((err) => console.log(err));
    }

    function cadastrarPet(e: any) {
        e.preventDefault();
        const pet: Pet = {
            nome: nome,
            idade: idade,
            unidadeTempo: unidadeTempo,
            porte: porte,
            descricao: descricao,
            abrigoId: abrigoId
        };
        fetch("http://localhost:5187/pets/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pet),
        }).then(() => {
            window.location.reload();
        }).catch((err) => console.log(err));
    }

    return (
        <>
            <button className="p-2 bg-blue-600 rounded font-bold text-white hover:bg-blue-800" onClick={() => setMenuCadastrar(!menuCadastrar)}>Cadastrar novo pet</button>
            {menuCadastrar &&
                <dialog open className="p-4 bg-white shadow-md rounded-md">
                    <form className="flex flex-col items-center" onSubmit={cadastrarPet}>
                        <h1 className="text-xl font-bold mb-4">Cadastre o novo pet no sistema</h1>
                        <label className="mb-2 font-semibold">Nome do pet:</label>
                        <input placeholder="Nome" className="mb-4 p-2 border-2 rounded w-full" type="text" onChange={digitarNome} />
                        
                        <label className="mb-2 font-semibold">Idade:</label>
                        <input placeholder="Ex: 18" className="mb-4 p-2 border-2 rounded w-full" type="text" onChange={digitarIdade} />
                        
                        <label className="mb-2 font-semibold">Unidade tempo:</label>
                        <input placeholder="Ex: meses ou anos" className="mb-4 p-2 border-2 rounded w-full" type="text" onChange={digitarUnidadeTempo} />
                        
                        <label className="mb-2 font-semibold">Porte:</label>
                        <input placeholder="Ex: P, M, G" className="mb-4 p-2 border-2 rounded w-full" type="text" onChange={digitarPorte} />
                        
                        <label className="mb-2 font-semibold">Descrição:</label>
                        <input placeholder="Ex: Adorável e amável" className="mb-4 p-2 border-2 rounded w-full" type="text" onChange={digitarDescricao} />
                        
                        <label className="mb-2 font-semibold">Abrigos:</label>
                        <select className="mb-4 p-2 border-2 rounded w-full" onChange={digitarAbrigo}>
                            <option value="">Selecione um abrigo</option>
                            {abrigos.map((abrigo) => (
                                <option value={abrigo.abrigoId} key={abrigo.abrigoId}>
                                    {abrigo.nome}
                                </option>
                            ))}
                        </select>
                        
                        <div className="flex space-x-4">
                            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-800" type="submit">Enviar</button>
                            <button type="button" className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800" onClick={() => setMenuCadastrar(!menuCadastrar)}>Fechar</button>
                        </div>
                    </form>
                </dialog>
            }
        </>
    );
}

export default PetCadastrar;
