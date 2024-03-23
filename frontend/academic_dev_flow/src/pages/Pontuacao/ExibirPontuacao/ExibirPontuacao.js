import React from "react";
import { useProjetoContext } from "../../../context/ProjetoContext";

const ExibirPontuacao = () => {

    const {dadosPontuacao} = useProjetoContext()

    return (
        <div>
            <div> Nota: {dadosPontuacao.nota} </div>
            <div> Comentários: {dadosPontuacao.comentario} </div>
            <div> Professor: {dadosPontuacao.autor} </div>
        </div>
    )
}

export default ExibirPontuacao