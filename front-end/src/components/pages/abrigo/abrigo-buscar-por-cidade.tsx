import { useState } from "react";
import { Abrigo } from "../../models/Abrigo";

function BuscarAbrigoPorCidade() {
    const [cidade, setCidade] = useState("");
    const [menuCadastrar, setMenuCadastrar] = useState(false);
    const [abrigos, setAbrigos] = useState<Abrigo[]>([]);

    function digitarCidade(e: React.ChangeEvent<HTMLInputElement>) {
        setCidade(e.target.value);
    }

    function limparCampos() {
        setCidade("");
        setAbrigos([]);
    }

    function buscar(e: React.ChangeEvent<HTMLInputElement>) {
        const cidade = e.target.value;
        fetch(`http://localhost:5187/abrigos/buscar-por-cidade/${cidade}`)
            .then((res) => res.json())
            .then((res: Abrigo[]) => setAbrigos(res))
            .catch((err) => console.log(err));
    }

    return(
        <>
            <button className="p-1 bg-stone-900 rounded font-bold text-white" onClick={() => {
                setMenuCadastrar(!menuCadastrar);
                if (menuCadastrar) {
                    limparCampos();
                }
            }}>
                Buscar abrigo por cidade
            </button>

            {menuCadastrar && (
                <dialog open className="flex flex-col">
                    <form className="flex flex-col p-32 border-2">
                        <label>Digite o nome da cidade!</label>
                        <input className="border-4" value={cidade} onChange={(e) => {
                            digitarCidade(e);
                            buscar(e);
                        }} />
                    </form>

                    <h1 className="text-center">Abrigos retornados:</h1>
                    <table>
                        <tbody>
                            {abrigos.map((abrigo) => (
                                <tr key={abrigo.abrigoId}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{abrigo.abrigoId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{abrigo.nome}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{abrigo.qtdPets}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{abrigo.dataCriacao ? new Date(abrigo.dataCriacao).toLocaleDateString() : 'Data não disponível'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{abrigo.endereco?.logradouro}, {abrigo.endereco?.numero}, {abrigo.endereco?.cidade}, {abrigo.endereco?.uf}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={() => {
                        setMenuCadastrar(false);
                        limparCampos();
                    }}>Fechar</button>
                </dialog>
            )}
        </>
    );
}

export default BuscarAbrigoPorCidade;