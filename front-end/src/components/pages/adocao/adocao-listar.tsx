import { useEffect, useState } from "react";
import { Adocao } from "../../models/Adocao";
import AdocaoCadastrar from "./adocao-cadastrar";

function AdocaoListar() {
    const [adocoes, setAdocoes] = useState<Adocao[]>([]);


    useEffect(() => {
        carregarAdocoes();
    }, []); 

  

    function carregarAdocoes() {
        fetch("http://localhost:5187/adocoes/listar")
            .then((res) => res.json())
            .then((adocoes: Adocao[]) => {
                setAdocoes(adocoes);
            })
            .catch((err) => {
                console.log("Deu erro" + err);
            });
    }

    return (
        <>
            <div className="flex justify-center mb-4 gap-4">
            <AdocaoCadastrar />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                        
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Abrigo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Realizada em</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPF do tutor</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {adocoes.map((adocao) => (
                            <tr key={adocao.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{adocao.id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{adocao.abrigo?.nome}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{adocao.pet?.nome}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{adocao.realizadaEm ? new Date(adocao.realizadaEm).toLocaleDateString() : 'Data não disponível'}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{adocao.cpfTutor}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            
        </>
    );
}

export default AdocaoListar;