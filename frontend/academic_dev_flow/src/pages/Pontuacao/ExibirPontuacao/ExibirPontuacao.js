import "./ExibirPontuacao.css"
import React from "react";
import { useProjetoContext } from "../../../context/ProjetoContext";

const ExibirPontuacao = () => {

    const {dadosPontuacao} = useProjetoContext()

    return (
        <div className="global-form score-container">
            <div className="score-note"> 
                <h2> Nota: {dadosPontuacao.nota} </h2> 
            </div>
            <div className="score-comment">
                <h4>Comentário(s):</h4> 
                <p> {dadosPontuacao.comentario} </p>
                
            </div>
            <div className="score-autor"> 
                <h4> Professor: <span style={{fontWeight: '400'}}> {dadosPontuacao.autor}  </span></h4> 
            </div>
        </div>
    )
}

export default ExibirPontuacao