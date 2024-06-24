import { useEffect, useState } from "react";
import { Endereco } from "../../models/Endereco";
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

    function digitarNome(e : any) {
        setNome(e.target.value);
    }
    function digitarIdade(e : any) {
        let idade = e.target.value;
        setIdade(parseInt(idade));
    }
    function digitarUnidadeTempo(e : any) {
        setUnidadeTempo(e.target.value);
    }
    function digitarPorte(e : any) {
        setPorte(e.target.value);
    }
    function digitarDescricao(e : any) {
        setDescricao(e.target.value);
    }
    function digitarAbrigo(e : any) {
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
        }).then((data) => {
            console.log(pet);
        }).catch((err) => console.log(err));
    }

    return(
        <>
        <button className="p-1 bg-sky-800 rounded font-bold text-white" onClick={() => setMenuCadastrar(!menuCadastrar)}>Cadastrar novo pet</button>
        {menuCadastrar &&
            <dialog open>
                <form className="flex flex-col items-center" onSubmit={cadastrarPet}>
                    <h1>Cadastre o novo pet no sistema</h1>
                    <label>Nome do pet:</label>
                    <input className="border-4" type="text" onChange={digitarNome} />
                    <br />
                    <label>Idade:</label>
                    <input className="border-4" type="text" onChange={digitarIdade} />
                    <br />
                    <label>Unidade tempo:</label>
                    <input className="border-2" type="text" onChange={digitarUnidadeTempo} />
                    <br />
                    <label>Porte: </label>
                    <input className="border-2" type="text" onChange={digitarPorte} />
                    <br />
                    <label>Descrição</label>
                    <input className="border-2" type="text" onChange={digitarDescricao} />
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
                    <button className="border-2" type="submit">Enviar</button>
                    <button type="button" className="p-1 bg-sky-800 rounded font-bold text-white" onClick={() => setMenuCadastrar(!menuCadastrar)}>Fechar</button>
                </form>
            </dialog>
        }
        </>
    );
}

export default PetCadastrar;