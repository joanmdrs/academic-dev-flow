import React from "react";
import { useContextoPontuacao } from "../../context/ContextoPontuacao";

const ExibirPontuacao = () => {

    const {dadosPontuacao} = useContextoPontuacao()

    return (
        <div>
            <div style={{ color: '#01DF74', fontSize: '20px'}}>
                <h2> Nota: {dadosPontuacao.nota} </h2>
            </div>
            
            <div>
                <h4>Comentário(s):</h4>
                <p style={{ 
                    border: '1px solid #d9d9d9',
                    padding: '10px',
                    width: '70%',
                    height: '100px',
                    borderRadius: '5px'
                }}> {dadosPontuacao.comentario} </p>
            </div>
            <div className="score-autor">
                <h4>
                    {" "}
                    Professor:{" "}
                    <span style={{ fontWeight: "400" }}>
                        {" "}
                        {dadosPontuacao.nome_autor}{" "}
                    </span>
                </h4>
            </div>
        </div>
    )
}

export default ExibirPontuacao