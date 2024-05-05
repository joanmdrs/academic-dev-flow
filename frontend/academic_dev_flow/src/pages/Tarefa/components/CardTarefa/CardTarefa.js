import React from "react";
import "./CardTarefa.css"

const CardTarefa = ({tipo, titulo, descricao, atribuicao}) => {

    return (
        <div className="card-tarefa">
            <div className="tipo-tarefa"> Frontend </div>
            <div className="titulo-tarefa"> 
                <h4>Título da tarefa</h4>
            </div>
            <div className="descricao-tarefa">
                <p>Descrição da tarefa</p>
            </div>

            <div className="atribuicao-tarefa"> 

            </div>



        </div>

    )
}

export default CardTarefa
