import React, { useState } from "react";
import { Button, Modal } from "antd";
import FormPontuacao from "../FormPontuacao/FormPontuacao";
import { useContextoPontuacao } from "../../context/ContextoPontuacao";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { atualizarPontuacao, excluirPontuacao, registrarPontuacao } from "../../../../services/pontuacaoService";
import { atualizarArtefato } from "../../../../services/artefatoService";
import { useContextoArtefato } from "../../../Artefato/context/ContextoArtefato";
import ExibirPontuacao from "../ExibirPontuacao/ExibirPontuacao";

const PainelPontuacaoProfessor = ({onReload}) => {

    const {autor} = useContextoGlobalProjeto()
    const {dadosArtefato} = useContextoArtefato()
    const { dadosPontuacao, setDadosPontuacao } = useContextoPontuacao();
    const [isFormEditarVisivel, setIsFormEditarVisivel] = useState(false);
    const [acaoForm, setAcaoForm] = useState('criar')

    const handleCancelar = () => {
        setIsFormEditarVisivel(false)
    }

    const handleEditarPontuacao = () => {
        setAcaoForm('atualizar')
        setIsFormEditarVisivel(true)
    }

    const handleSalvarPontuacao = async (dados) => {
        dados['autor'] = autor.id_membro_projeto

        if (acaoForm === "criar") {
            const response = await registrarPontuacao(dados)
            if (!response.error) {  
                const dadosAtualizar = {
                    pontuacao: response.data.id
                }
                
                await atualizarArtefato(dadosArtefato.id, dadosAtualizar)
            }

        } else if (acaoForm === "atualizar") {
            await atualizarPontuacao(dadosPontuacao.id, dados)
        }
        onReload()
    };

    const handleExcluirPontuacao = () => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Tem certeza que deseja excluir a pontuação ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                await excluirPontuacao(dadosPontuacao.id)
                setDadosPontuacao(null)
                onReload()
            }
        });
    };

    return (
        <div>
            {dadosPontuacao ? (
                <div>
                    {isFormEditarVisivel ? (
                        <FormPontuacao onSubmit={handleSalvarPontuacao} onCancel={handleCancelar} />
                    ) : (
                        <div>
                            <div style={{
                                display: 'flex',
                                gap: '10px',
                                justifyContent: 'flex-end'
                            }}>
                                <Button type="primary" ghost onClick={handleEditarPontuacao}>
                                    Editar
                                </Button>
                                <Button danger ghost onClick={handleExcluirPontuacao}>
                                    Excluir
                                </Button>
                            </div>

                            <ExibirPontuacao />
                        </div>
                    )}
                </div>
            ) : (
                <FormPontuacao onSubmit={handleSalvarPontuacao} onCancel={handleCancelar} />
            )}
        </div>
    );
};

export default PainelPontuacaoProfessor;