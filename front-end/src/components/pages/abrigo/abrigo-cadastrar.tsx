import { useState } from "react";
import { Endereco } from "../../models/Endereco";
import { Abrigo } from "../../models/Abrigo";

function AbrigoCadastrar() {
    const [menuCadastrar, setMenuCadastrar] = useState(false);
    const [nome, setNome] = useState("");
    const [qtdPets, setQtdPets] = useState(0);
    const [enderecoId, setEnderecoId] = useState(0);
    const [logradouro, setLogradouro] = useState("");
    const [cidade, setCidade] = useState("");
    const [UF, setUF] = useState("");
    const [cep, setCep] = useState("");
    const [numero, setNumero] = useState(0);

    function digitarNomeAbrigo(e: any) {
        setNome(e.target.value);
    }

    function digitarQtdPets(e: any) {
        let qtdPets = e.target.value;
        setQtdPets(parseInt(qtdPets));
    }

    function digitarLogradouro(e: any) {
        setLogradouro(e.target.value);
    }

    function digitarCidade(e: any) {
        setCidade(e.target.value);
    }

    function digitarUF(e: any) {
        setUF(e.target.value);
    }

    function digitarCep(e: any) {
        setCep(e.target.value);
    }

    function digitarNumero(e: any) {
        let numero = e.target.value;
        setNumero(parseInt(numero));
    }

    function cadastrarEndereco(e: any) {
        e.preventDefault();
        const endereco: Endereco = {
            logradouro: logradouro,
            cidade: cidade,
            uf: UF,
            cep: cep,
            numero: numero,
        };
        fetch("http://localhost:5187/enderecos/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(endereco),
        })
            .then((data) => {
                data.json().then((res) => {
                    setEnderecoId(res.enderecoId);
                });
            })
            .catch((error) => console.log(error));
    }

    function cadastrarAbrigo(e: any) {
        e.preventDefault();
        const abrigo: Abrigo = {
            nome: nome,
            qtdPets: qtdPets,
            enderecoId: enderecoId,
        };

        fetch("http://localhost:5187/abrigos/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(abrigo),
        })
            .then((data) => {
                console.log(abrigo);
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
                Cadastrar novo abrigo
            </button>
            {menuCadastrar && (
                <dialog
                    open
                    className="flex flex-col bg-white p-8 rounded shadow-lg w-1/2 mx-auto mt-4"
                >
                    <form
                        className="flex flex-col space-y-4"
                        onSubmit={cadastrarEndereco}
                    >
                        <h1 className="text-lg font-semibold">
                            Digite seu endereço
                        </h1>
                        <label>Logradouro:</label>
                        <input
                            className="border-2 p-2 rounded"
                            type="text"
                            placeholder="Ex: Rua Carlos de Campos"
                            onChange={digitarLogradouro}
                        />
                        <label>Cidade:</label>
                        <input
                            className="border-2 p-2 rounded"
                            type="text"
                            placeholder="Ex: Curitiba"
                            onChange={digitarCidade}
                        />
                        <label>UF:</label>
                        <input
                            className="border-2 p-2 rounded"
                            type="text"
                            placeholder="Ex: PR"
                            onChange={digitarUF}
                        />
                        <label>CEP:</label>
                        <input
                            className="border-2 p-2 rounded"
                            type="text"
                            placeholder="Ex: 83410-810"
                            onChange={digitarCep}
                        />
                        <label>Número:</label>
                        <input
                            className="border-2 p-2 rounded"
                            type="text"
                            placeholder="Ex: 100"
                            onChange={digitarNumero}
                        />
                        <button
                            className="bg-blue-500 text-white p-2 rounded mt-4"
                            type="submit"
                        >
                            Enviar
                        </button>
                    </form>

                    <form
                        className="flex flex-col space-y-4 mt-8"
                        onSubmit={cadastrarAbrigo}
                    >
                        <h1 className="text-lg font-semibold">
                            Agora cadastre o abrigo
                        </h1>
                        <label>Nome do abrigo:</label>
                        <input
                            className="border-2 p-2 rounded"
                            type="text"
                            placeholder="Ex: Amigo Animal"
                            onChange={digitarNomeAbrigo}
                        />
                        <label>Quantidade de Pets do abrigo:</label>
                        <input
                            className="border-2 p-2 rounded"
                            type="text"
                            placeholder="Ex: 50"
                            onChange={digitarQtdPets}
                        />
                        <div className="flex space-x-4">
                            <button
                                className="bg-green-500 text-white p-2 rounded mt-4"
                                type="submit"
                            >
                                Enviar
                            </button>
                            <button
                                className="bg-red-500 text-white p-2 rounded mt-4"
                                onClick={() => setMenuCadastrar(!menuCadastrar)}
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

export default AbrigoCadastrar;
