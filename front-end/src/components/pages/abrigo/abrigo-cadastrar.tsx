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

    function digitarNomeAbrigo(e : any) {
        setNome(e.target.value);
    }
    function digitarQtdPets(e : any) {
        let qtdPets = e.target.value
        setQtdPets(parseInt(qtdPets));
    }

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

    function cadastrarEndereco(e: any) {
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
                    console.log(enderecoId)
            })
            }).catch((error) => console.log(error))
        }

        function cadastrarAbrigo(e : any) {
            e.preventDefault();
            const abrigo: Abrigo = {
                nome: nome,
                qtdPets: qtdPets,
                enderecoId: enderecoId
            }

            fetch("http://localhost:5187/abrigos/cadastrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(abrigo),
            }).then((data) => {
                console.log(abrigo);
                window.location.reload();
            }).catch((err) => console.log(err))
        }
    return(
        <>
        <button className="p-1 bg-sky-800 rounded font-bold text-white" onClick={() => setMenuCadastrar(!menuCadastrar)}>Cadastrar novo abrigo</button>
        { menuCadastrar &&
            <dialog open>
        <form className="flex flex-col items-center" onSubmit={cadastrarEndereco}>
                <h1>Digite seu endereço</h1>
                <label >Logradouro:</label>
                <input className="border-4" type="text"  onChange={digitarLogradouro}/>
                <br />
                <label >Cidade:</label>
                <input className="border-4" type="text"  onChange={digitarCidade}/>
                <br />
                <label >UF:</label>
                <input className="border-2" type="text"  onChange={digitarUF}/>
                <br />
                <label >CEP</label>
                <input className="border-2" type="text"  onChange={digitarCep}/>
                <br />
                <label >Número</label>
                <input className="border-2" type="text"  onChange={digitarNumero}/>
                <br />
                <button className="border-2" type="submit">Enviar</button>
                </form>
                
            <form className="flex flex-col items-center"  onSubmit={cadastrarAbrigo}>
            <h1>Agora cadastre o abrigo</h1>
                <label>Nome do abrigo:</label>
                <input className="border-2" type="text"   onChange={digitarNomeAbrigo}/>
                <br />
                <label>Quantidade de Pets do abrigo: </label>
                <input className="border-2" type="text" onChange={digitarQtdPets} />
                <br />
                <button className="gap-4" type="submit">Enviar</button>
                <button  onClick={() => setMenuCadastrar(!menuCadastrar)}>Fechar</button>
            </form>

            
            </dialog>
        }
        
            
        </>
    )
}

export default AbrigoCadastrar;