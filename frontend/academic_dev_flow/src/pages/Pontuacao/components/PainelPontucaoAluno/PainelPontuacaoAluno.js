import React from "react";
import { useContextoArtefato } from "../../../Artefato/context/ContextoArtefato";
import ExibirPontuacao from "../ExibirPontuacao/ExibirPontuacao";
import { Empty } from "antd";

const PainelPontuacaoAluno = () => {

    const {dadosArtefato} = useContextoArtefato()
    
    return (
        <div>
            {dadosArtefato && dadosArtefato.pontuacao ? (
                <ExibirPontuacao />
            ) : (
                <Empty
                    description="O professor ainda não registrou notas."
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
            )}
        </div>
    )
}

export default PainelPontuacaoAluno