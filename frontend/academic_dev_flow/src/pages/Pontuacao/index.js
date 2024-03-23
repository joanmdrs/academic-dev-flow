import React, { useEffect, useState } from "react";
import FormPontuacao from "./FormPontuacao/FormPontuacao";
import { useProjetoContext } from "../../context/ProjetoContext";
import { atualizarDocumento, buscarDocumentoPeloId } from "../../services/documentoService";
import ExibirPontuacao from "./ExibirPontuacao/ExibirPontuacao";
import { buscarPontuacaoPeloId, registrarPontuacao } from "../../services/pontuacaoService";
import Loading from "../../components/Loading/Loading";
import { Empty } from "antd";

const GerenciarPontuacao = () => {
    const { dadosDocumento, setDadosPontuacao, autor, userGroup } = useProjetoContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (dadosDocumento) {
                await handleHasScore();
                setLoading(false);
                console.log(dadosDocumento.pontuacao)
            }
        };
        fetchData();
    }, [dadosDocumento]);

    const handleHasScore = async () => {
        const response = await buscarDocumentoPeloId(dadosDocumento.id);
        const idScore = response.data.pontuacao;
        if (idScore) {
            const response1 = await buscarPontuacaoPeloId(idScore);
            setDadosPontuacao(response1.data);
        }
    };

    const handleSavePontuacao = async (dados) => {
        dados['autor'] = autor;
        const response = await registrarPontuacao(dados);
        const newData = { pontuacao: response.data.id };
        await atualizarDocumento(dadosDocumento.id, newData);
        await handleHasScore();
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            {userGroup === 'Alunos' ? (
                <div>
                    {(dadosDocumento.pontuacao !== undefined && dadosDocumento.pontuacao !== null)  ? <ExibirPontuacao /> : <Empty description="O professor ainda não registrou notas." image={Empty.PRESENTED_IMAGE_SIMPLE} />}
                </div>
            ) : (
                <div>{(dadosDocumento.pontuacao !== undefined && dadosDocumento.pontuacao !== null) ? <ExibirPontuacao /> : <FormPontuacao onSubmit={handleSavePontuacao} />}</div>
            )}
        </div>
    );
};

export default GerenciarPontuacao;
