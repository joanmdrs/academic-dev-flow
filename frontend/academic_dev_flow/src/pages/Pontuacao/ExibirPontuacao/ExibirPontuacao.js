import "./ExibirPontuacao.css"
import React from "react";
import { useProjetoContext } from "../../../context/ProjetoContext";
import { Button } from "antd";
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

const ExibirPontuacao = () => {

    const {dadosPontuacao, userGroup} = useProjetoContext()

    return (

        <div className="global-form">
            {   userGroup === "Professores" && (
                    <div className="score-buttons"> 
                        <Button type="primary" ghost> <FaEdit /> Editar </Button>
                        <Button danger> <FaTrash /> Excluir </Button>
                    </div>
                )  
            }
            <div className="score-container">
                <div className="score-note"> 
                    <h2> Nota: {dadosPontuacao.nota} </h2> 
                </div>
                <div className="score-comment">
                    <h4>Comentário(s):</h4> 
                    <p> {dadosPontuacao.comentario} </p>
                    
                </div>
                <div className="score-autor"> 
                    <h4> Professor: <span style={{fontWeight: '400'}}> {dadosPontuacao.nome_autor}  </span></h4> 
                </div>
            </div>
        </div>

        
        
    )
}

export default ExibirPontuacao