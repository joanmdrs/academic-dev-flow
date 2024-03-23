import React, { useEffect, useState } from "react";
import FormPontuacao from "./FormPontuacao/FormPontuacao";
import { useProjetoContext } from "../../context/ProjetoContext";
import { atualizarDocumento, buscarDocumentoPeloId } from "../../services/documentoService";
import ExibirPontuacao from "./ExibirPontuacao/ExibirPontuacao";
import { atualizarPontuacao, buscarPontuacaoPeloId, registrarPontuacao } from "../../services/pontuacaoService";
import Loading from "../../components/Loading/Loading";
import { Empty } from "antd";

const GerenciarPontuacao = () => {
    const { dadosDocumento, dadosPontuacao, setDadosPontuacao, autor, userGroup } = useProjetoContext();
    const [loading, setLoading] = useState(true);
    const [actionForm, setActionForm] = useState('create')

    const handleHasScore = async () => {
        const response = await buscarDocumentoPeloId(dadosDocumento.id);
        const idScore = response.data.pontuacao;
        if (idScore) {
            const response1 = await buscarPontuacaoPeloId(idScore);
            setDadosPontuacao(response1.data);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (dadosDocumento) {
                await handleHasScore();
                setLoading(false);
            }
        };
        fetchData();
    }, [dadosDocumento, loading]);

    const handleEdit = () => {
        setActionForm('update')
    }

    const handleSavePontuacao = async (dados) => {

        if (actionForm === 'create') {
            dados['autor'] = autor;
            const response = await registrarPontuacao(dados);
            const newData = { pontuacao: response.data.id };
            await atualizarDocumento(dadosDocumento.id, newData);
           
        } else if (actionForm === 'update'){
            await atualizarPontuacao(dadosPontuacao.id, dados)
            setActionForm('create')
        }
        setLoading(true)
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
                <div>{(dadosDocumento.pontuacao !== undefined && dadosDocumento.pontuacao !== null && actionForm !== 'update' ) ? <ExibirPontuacao onEdit={handleEdit} /> : <FormPontuacao onSubmit={handleSavePontuacao} />}</div>
            )}
        </div>
    );
};

export default GerenciarPontuacao;
