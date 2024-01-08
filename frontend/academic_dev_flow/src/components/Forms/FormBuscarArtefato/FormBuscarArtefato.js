import React from "react";
import Form from "antd/es/form/Form";
import { Button, Input } from "antd";
import "./FormBuscarArtefato.css"

const FormBuscarArtefato = () => {

    return (
        <div className="form-box">
            <div className="titulo">
                <p>FILTROS</p>
            </div>
            <div className="formulario">
                <form>
                    <div className="form-item">
                        <input />
                        <label>Nome:</label>
                    </div>
                    <div className="form-item">
                        <input />
                        <label>Descrição:</label>
                    </div>
                </form>
            </div>
            <div className="butoes">
                <button className="botao-filtrar"> FILTRAR </button>
                <button className="botao-limpar"> LIMPAR </button>
            </div>
        </div>
    )
}

export default FormBuscarArtefato