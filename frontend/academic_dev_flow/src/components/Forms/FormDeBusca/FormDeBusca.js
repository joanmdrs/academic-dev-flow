import React from "react";
import "./FormDeBusca.css"

const FormDeBusca = ({executeFuncao}) => {

    return (
        <div className="global-form component-form-de-busca">
            <div className="titulo">
                <p>FILTROS</p>
            </div>
            <div className="formulario">
                <form>
                    <div className="form-item">
                        <input id="input-nome" required/>
                        <label id="label-nome">Nome:</label>
                    </div>
                </form>
            </div>
            <div className="botoes">
                <button className="botao-filtrar" 
                    onClick={() => {
                        executeFuncao(document.getElementById("input-nome").value)}
                    }
                > FILTRAR </button>
                <button className="botao-limpar"> LIMPAR </button>
            </div>
        </div>
    )
}

export default FormDeBusca