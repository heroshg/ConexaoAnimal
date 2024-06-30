import React, { useState } from 'react';
import { Endereco } from '../../models/Endereco';

const EnderecoCadastrar = () => {
    const [enderecoId, setEnderecoId] = useState();
    const [logradouro, setLogradouro] = useState("");
    const [cidade, setCidade] = useState("");
    const [UF, setUF] = useState("");
    const [cep, setCep] = useState("");
    const [numero, setNumero] = useState(0);

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

    function cadastrar(e: any) {
        e.preventDefault();
        const endereco: Endereco = {
            logradouro: logradouro,
            cidade: cidade,
            uf: UF,
            cep: cep,
            numero: numero
        };
        fetch("http://localhost:5187/enderecos/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(endereco),
        }).then((data) => {
            console.log(endereco);
            data.json().then((res) => {
                setEnderecoId(res.enderecoId);
                console.log(res.enderecoId);
            });
        }).catch((error) => console.log(error));
    }

    return (
        <form onSubmit={cadastrar} className="max-w-lg mx-auto p-4 border rounded shadow-lg space-y-4">
            <div className="flex flex-col">
                <label htmlFor="logradouro" className="mb-1 font-semibold">Logradouro:</label>
                <input
                    type="text"
                    name="logradouro"
                    className="border rounded px-3 py-2"
                    onChange={digitarLogradouro}
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="cidade" className="mb-1 font-semibold">Cidade:</label>
                <input
                    type="text"
                    name="cidade"
                    className="border rounded px-3 py-2"
                    onChange={digitarCidade}
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="uf" className="mb-1 font-semibold">UF:</label>
                <input
                    type="text"
                    name="uf"
                    className="border rounded px-3 py-2"
                    onChange={digitarUF}
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="cep" className="mb-1 font-semibold">CEP:</label>
                <input
                    type="text"
                    name="cep"
                    className="border rounded px-3 py-2"
                    onChange={digitarCep}
                />
            </div>
            <div className="flex flex-col">
                <label htmlFor="numero" className="mb-1 font-semibold">Número:</label>
                <input
                    type="number"
                    name="numero"
                    className="border rounded px-3 py-2"
                    onChange={digitarNumero}
                />
            </div>
            <button type="submit" className="w-full bg-stone-900 text-white font-bold py-2 px-4 rounded">Enviar</button>
        </form>
    );
}

export default EnderecoCadastrar;
