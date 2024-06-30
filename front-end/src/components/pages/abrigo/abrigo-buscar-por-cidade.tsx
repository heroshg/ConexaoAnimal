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

    return (
        <>
            <button
                className="p-2 bg-stone-900 rounded font-bold text-white mt-4"
                onClick={() => {
                    setMenuCadastrar(!menuCadastrar);
                    if (menuCadastrar) {
                        limparCampos();
                    }
                }}
            >
                Buscar abrigo por cidade
            </button>

            {menuCadastrar && (
                <dialog open className="flex flex-col bg-white p-8 rounded shadow-lg w-1/2 mx-auto mt-4">
                    <form className="flex flex-col space-y-4">
                        <label className="text-lg font-semibold">Digite o nome da cidade!</label>
                        <input
                            className="border-2 p-2 rounded"
                            value={cidade}
                            onChange={(e) => {
                                digitarCidade(e);
                                buscar(e);
                            }}
                        />
                    </form>

                    <h1 className="text-center text-xl font-bold mt-4">Abrigos retornados:</h1>
                    <table className="min-w-full bg-white mt-4 border">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 border-b-2">ID</th>
                                <th className="px-6 py-3 border-b-2">Nome</th>
                                <th className="px-6 py-3 border-b-2">Qtd. Pets</th>
                                <th className="px-6 py-3 border-b-2">Data Criação</th>
                                <th className="px-6 py-3 border-b-2">Endereço</th>
                            </tr>
                        </thead>
                        <tbody>
                            {abrigos.map((abrigo) => (
                                <tr key={abrigo.abrigoId} className="border-b">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{abrigo.abrigoId}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{abrigo.nome}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{abrigo.qtdPets}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{abrigo.dataCriacao ? new Date(abrigo.dataCriacao).toLocaleDateString() : 'Data não disponível'}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {abrigo.endereco?.logradouro}, {abrigo.endereco?.numero}, {abrigo.endereco?.cidade}, {abrigo.endereco?.uf}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button
                        className="mt-4 p-2 bg-red-500 text-white rounded"
                        onClick={() => {
                            setMenuCadastrar(false);
                            limparCampos();
                        }}
                    >
                        Fechar
                    </button>
                </dialog>
            )}
        </>
    );
}

export default BuscarAbrigoPorCidade;
