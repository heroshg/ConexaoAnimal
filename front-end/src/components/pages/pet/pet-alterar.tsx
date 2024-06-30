import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Abrigo } from "../../models/Abrigo";
import { Pet } from "../../models/Pet";

function AlterarPet() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState(0);
    const [unidadeTempo, setUnidadeTempo] = useState("");
    const [porte, setPorte] = useState("");
    const [descricao, setDescricao] = useState("");
    const [abrigos, setAbrigos] = useState<Abrigo[]>([]);
    const [abrigoId, setAbrigoId] = useState<number | undefined>(undefined);

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5187/pets/buscar/${id}`)
                .then((resposta) => resposta.json())
                .then((pet: Pet) => {
                    setNome(pet.nome);
                    setIdade(pet.idade);
                    setUnidadeTempo(pet.unidadeTempo);
                    setPorte(pet.porte);
                    setDescricao(pet.descricao);
                    setAbrigoId(pet.abrigoId);
                });
        }
        buscarAbrigos();
    }, [id]);

    function digitarNome(e: any) {
        setNome(e.target.value);
    }
    function digitarIdade(e: any) {
        setIdade(Number(e.target.value));
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
        setAbrigoId(Number(e.target.value));
    }
    function buscarAbrigos() {
        fetch("http://localhost:5187/abrigos/listar")
            .then((res) => res.json())
            .then((abrigos: Abrigo[]) => {
                setAbrigos(abrigos);
            })
            .catch((err) => console.log(err));
    }
    function alterar(e: any) {
        e.preventDefault();
        const pet: Pet = {
            petId: id,
            nome: nome,
            idade: idade,
            unidadeTempo: unidadeTempo,
            porte: porte,
            descricao: descricao,
            abrigoId: abrigoId
        };
        console.log(pet);
        fetch(`http://localhost:5187/pets/alterar/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(pet),
        })
            .then(() => {
                navigate("/pets");
            });
    }

    return (
        <>
            <form className="flex flex-col items-center p-4 bg-white shadow-md rounded-md" onSubmit={alterar}>
                <h1 className="text-xl font-bold mb-4">Atualize o pet</h1>
                <label className="text-left w-full">Nome do pet:</label>
                <input value={nome} className="w-full mb-4 p-2 border-2 rounded" type="text" onChange={digitarNome} />
                
                <label className="text-left w-full">Idade:</label>
                <input value={idade} className="w-full mb-4 p-2 border-2 rounded" type="number" onChange={digitarIdade} />
                
                <label className="text-left w-full">Unidade Tempo:</label>
                <input value={unidadeTempo} className="w-full mb-4 p-2 border-2 rounded" type="text" onChange={digitarUnidadeTempo} />
                
                <label className="text-left w-full">Porte:</label>
                <input value={porte} className="w-full mb-4 p-2 border-2 rounded" type="text" onChange={digitarPorte} />
                
                <label className="text-left w-full">Abrigo:</label>
                <select value={abrigoId} className="w-full mb-4 p-2 border-2 rounded" onChange={digitarAbrigo}>
                    <option value="">Selecione um abrigo</option>
                    {abrigos.map((abrigo) => (
                        <option value={abrigo.abrigoId} key={abrigo.abrigoId}>
                            {abrigo.nome}
                        </option>
                    ))}
                </select>
                
                <label className="text-left w-full">Descrição:</label>
                <input value={descricao} className="w-full mb-4 p-2 border-2 rounded" type="text" onChange={digitarDescricao} />
                
                <div className="flex gap-4">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" type="submit">Enviar</button>
                    <Link className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700" to={"/pets"}>Ver Pets</Link>
                </div>
            </form>
        </>
    );
}

export default AlterarPet;
