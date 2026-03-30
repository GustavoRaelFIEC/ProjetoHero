import { useState } from "react";
import { z } from "zod";

function Formulario() {
    
    const[nome, setNome] = useState("");
    const[classe, setClasse] = useState("");
    const[mensagem, setMensagem] = useState("");


    function handleSubmit(e) {
        e.prevenDefault();
        console.log(nome)
    }

    return(
        <div className="flex flex-col items-center">
            <div className="flex flex-col items-center w-full h-screen">
                <h1 className="mt-0">Formulário</h1>
                <form className="flex flex-col justify-center items-center w-2/3 h-1/3 gap-y-9" onSubmit={handleSubmit} method="post">
                    <label htmlFor="nomePersonagem">Nome</label>
                    <input id="nomePersonagem" onChange={(e)=> setNome(e.target.value)} value={nome} type="text" placeholder="Digite o nome do seu personagem"/>
                    <label htmlFor="classePersonagem">Classe</label>
                    <input id="classePersonagem" onChange={(e)=> setClasse(e.target.value)} value={classe} type="text" placeholder="Digite a classe do seu personagem"/>
                </form>
            </div>
        </div>
    )
}

export default Formulario;