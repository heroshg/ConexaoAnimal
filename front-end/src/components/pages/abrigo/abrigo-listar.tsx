import { useEffect, useState } from "react";
import { Abrigo } from "../../models/Abrigo";
import AbrigoCadastrar from "./abrigo-cadastrar";
import BuscarAbrigoPorCidade from "./abrigo-buscar-por-cidade";

function AbrigoListar() {
    const [abrigos, setAbrigos] = useState<Abrigo[]>([]);


    useEffect(() => {
        carregarAbrigos();
    }, []); 

    function deletarAbrigo(id: any) {
        fetch(`http://localhost:5187/abrigos/excluir/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(() => {
            window.location.reload();
        })
        .catch((err) => {
            console.log("Deu erro" + err);
        })
        
    }

    function carregarAbrigos() {
        fetch("http://localhost:5187/abrigos/listar")
            .then((res) => res.json())
            .then((abrigos: Abrigo[]) => {
                setAbrigos(abrigos);
            })
            .catch((err) => {
                console.log("Deu erro" + err);
            });
    }

    return (
        <>
            <div className="flex justify-center mb-4 gap-4">
            <AbrigoCadastrar />
            <BuscarAbrigoPorCidade />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade de Pets</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Criação</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Endereço</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {abrigos.map((abrigo) => (
                            <tr key={abrigo.abrigoId}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{abrigo.abrigoId}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{abrigo.nome}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{abrigo.qtdPets}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{abrigo.dataCriacao ? new Date(abrigo.dataCriacao).toLocaleDateString() : 'Data não disponível'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{abrigo.endereco?.logradouro}, {abrigo.endereco?.numero}, {abrigo.endereco?.cidade}, {abrigo.endereco?.uf}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button className="text-red-600 hover:text-red-900" onClick={() => deletarAbrigo(abrigo.abrigoId) }>Deletar </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            
        </>
    );
}

export default AbrigoListar;