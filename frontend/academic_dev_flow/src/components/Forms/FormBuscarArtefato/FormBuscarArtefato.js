import React from "react";
import "./FormBuscarArtefato.css"

const FormBuscarArtefato = ({executeFuncao}) => {

    return (
        <div className="form-box">
            <div className="titulo">
                <p>FILTROS</p>
            </div>
            <div className="formulario">
                <form>
                    <div className="form-item">
                        <input id="input-nome" required/>
                        <label>Nome:</label>
                    </div>
                </form>
            </div>
            <div className="butoes">
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

export default FormBuscarArtefato