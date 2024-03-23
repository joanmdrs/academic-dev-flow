import React from "react";

const ExibirPontuacao = ({pontuacao}) => {
      

    return (
        <div>
            <div> Nota: {pontuacao.nota} </div>
            <div> Comentários: {pontuacao.comentario} </div>
            <div> Professor: {pontuacao.autor} </div>
        </div>
    )
}

export default ExibirPontuacao