import { useEffect, useState } from "react";
import { Pet } from "../../models/Pet";
import PetCadastrar from "./pet-cadastrar";

function ListarPet() {
    const [pets, setPets] = useState<Pet[]>([]);


    useEffect(() => {
        carregarPets();
    }, []); 

    function deletarPet(id: any) {
        fetch(`http://localhost:5187/pets/excluir/${id}`, {
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

    function carregarPets() {
        fetch("http://localhost:5187/pets/listar")
            .then((res) => res.json())
            .then((pets: Pet[]) => {
                setPets(pets);
            })
            .catch((err) => {
                console.log("Deu erro" + err);
            });
    }

    return (
        <>
            <div className="flex justify-center mb-4 gap-4">
            <PetCadastrar />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Idade</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidade tempo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Porte</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Criado em</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Abrigo pertencente</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {pets.map((pet) => (
                            <tr key={pet.petId}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pet.petId}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pet.nome}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pet.idade}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pet.unidadeTempo}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pet.porte}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pet.descricao}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pet.abrigo?.nome}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pet.criadoEm ? new Date(pet.criadoEm).toLocaleDateString() : 'Data não disponível'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button className="text-red-600 hover:text-red-900" onClick={() => deletarPet(pet.petId) }>Deletar </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            
        </>
    );
}

export default ListarPet;