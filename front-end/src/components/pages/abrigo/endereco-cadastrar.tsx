import React, { useState } from 'react';
import { Endereco } from '../../models/Endereco';


// Interface Endereco


// Componente do formulário
const EnderecoCadastrar= () => {
    const [enderecoId, setEnderecoId] = useState();
    const [logradouro, setLogradouro] = useState("");
    const [cidade, setCidade] = useState("");
    const [UF, setUF] = useState("");
    const [cep, setCep] = useState("");
    const [numero, setNumero] = useState(0);
    
    function digitarLogradouro(e : any) {
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
        e.preventDefault()
        const endereco: Endereco = {
            logradouro: logradouro,
            cidade: cidade,
            uf: UF,
            cep: cep,
            numero: numero
        }
        fetch("http://localhost:5187/enderecos/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(endereco),
            }).then((data) => {
                console.log(endereco);
                data.json()
                .then((res) => {
                    setEnderecoId(res.enderecoId)
                    console.log(res.enderecoId)
            })
            }).catch((error) => console.log(error))
        }
    
    return (
        <form onSubmit={cadastrar}>
            <div>
                <label htmlFor="logradouro">Logradouro:</label>
                <input type="text" name="logradouro"  onChange={digitarLogradouro} />
            </div>
            <div>
                <label htmlFor="cidade">Cidade:</label>
                <input type="text" name="cidade"  onChange={digitarCidade} />
            </div>
            <div>
                <label htmlFor="uf">UF:</label>
                <input type="text" name="uf"  onChange={digitarUF} />
            </div>
            <div>
                <label htmlFor="cep">CEP:</label>
                <input type="text" name="cep"  onChange={digitarCep} />
            </div>
            <div>
                <label htmlFor="numero">Número:</label>
                <input type="number" name="numero"  onChange={digitarNumero} />
            </div>
            <button type='submit'>Enviar</button>
        </form>
    );
}

export default EnderecoCadastrar;