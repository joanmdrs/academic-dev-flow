import React, { useEffect, useState } from "react";
import { useContextoArtefato } from "../../../Artefato/context/ContextoArtefato";
import { useContextoPontuacao } from "../../context/ContextoPontuacao";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { buscarArtefatoPeloId } from "../../../../services/artefatoService";
import { buscarPontuacaoPeloId } from "../../../../services/pontuacaoService";
import Loading from "../../../../components/Loading/Loading";
import PainelPontuacaoAluno from "../../components/PainelPontucaoAluno/PainelPontuacaoAluno";
import PainelPontuacaoProfessor from "../../components/PainelPontuacaoProfessor/PainelPontuacaoProfessor";

const GerenciarPontuacao = () => {

    const {dadosArtefato, setDadosArtefato} = useContextoArtefato()
    const {setDadosPontuacao} = useContextoPontuacao()
    const {grupo} = useContextoGlobalProjeto()

    const [loading, setLoading] = useState(true);

    const handlePossuiPontuacao = async () => {
        const resArtefato = await buscarArtefatoPeloId(dadosArtefato.id);
        const idScore = resArtefato.data.pontuacao;
        if (idScore) {
            const resPontuacao = await buscarPontuacaoPeloId(idScore);
            setDadosPontuacao(resPontuacao.data);
        }
    };

    const handleRefreshArtefato = async () => {
        const response = await buscarArtefatoPeloId(dadosArtefato.id)
        setDadosArtefato(response.data)
    }

    const handleReload = async () => {
        setLoading(true)
        await handleRefreshArtefato()
        await handlePossuiPontuacao()
    }

    useEffect(() => {
        const fetchData = async () => {
            if (dadosArtefato !== null) {
                await handlePossuiPontuacao();
                setLoading(false);
            }
        };
        fetchData();
    }, [dadosArtefato, loading]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            {grupo === "Discentes" ? (
                <PainelPontuacaoAluno />
            ) : (
                <PainelPontuacaoProfessor onReload={handleReload} />
            )}
        </div>
  );
};

export default GerenciarPontuacao;
