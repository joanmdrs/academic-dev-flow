import React, { useState } from "react";
import { useContextoIteracao } from "../../context/contextoIteracao";
import { Button, Modal } from "antd";
import { FaPlus, FaTrash } from "react-icons/fa";
import TableIteracoesSelect from "../../components/TableIteracoesSelect/TableIteracoesSelect";
import FormIteracao from "../../components/FormIteracao/FormIteracao";
import { atualizarIteracao, criarIteracao, excluirIteracoes, listarIteracoesPorProjeto } from "../../../../services/iteracaoService";
import Aviso from "../../../../components/Aviso/Aviso";
import { BsQuestionCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";

const CronogramaIteracoes = () => {

    const {
        dadosIteracao,
        setDadosIteracao,
        iteracoesSelecionadas, 
        setIteracoesSelecionadas,
        setIteracoes
    } = useContextoIteracao()

    const {dadosProjeto, grupo} = useContextoGlobalProjeto()

    const [isFormSalvarVisivel, setIsFormSalvarVisivel] = useState(false)
    const [isBtnPlusDisabled, setIsBtnPlusDisabled] = useState(false)
    const isBtnTrashDisabled = iteracoesSelecionadas.length === 0
    const [acaoForm, setAcaoForm] = useState('criar')
    const [isAvisoVisivel, setIsAvisoVisivel] = useState(false);

    const navigate = useNavigate();


    const handleDuvidaClick = () => {
        setIsAvisoVisivel(true);
    };

    const handleAvisoClose = () => {
        setIsAvisoVisivel(false);
    };

    const handleCancelar = () => {
        setIsFormSalvarVisivel(false)
        setIsBtnPlusDisabled(false)
        setDadosIteracao(null)
        setAcaoForm('criar')
    }

    const handleReload = async () => {
        setIsBtnPlusDisabled(false)
        setIsFormSalvarVisivel(false)
        setDadosIteracao(null)
        setIteracoesSelecionadas([])
        await handleGetIteracoes()
    }

    const handleAdicionarIteracao = () => {
        setIsFormSalvarVisivel(true)
        setIsBtnPlusDisabled(true)
        setAcaoForm('criar')
        setDadosIteracao(null)
    }

    const handleAtualizarIteracao = (record) => {
        setIsFormSalvarVisivel(true)
        setDadosIteracao(record)
        setAcaoForm('atualizar')
    }

    const handleSalvarIteracao = async (dadosForm) => {
        dadosForm['projeto'] = dadosProjeto.id

        if (acaoForm === 'criar'){
            await criarIteracao(dadosForm)
        } else if (acaoForm === 'atualizar'){
            console.log(dadosIteracao)
            console.log(dadosForm)
            await atualizarIteracao(dadosIteracao.id, dadosForm)
        }
        await handleReload()
    }

    const handleExcluirIteracoes = () => {
  
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Tem certeza que deseja prosseguir com a exclusão ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                if (iteracoesSelecionadas !== null) {
                    const ids = iteracoesSelecionadas.map((item) => item.id)
                    await excluirIteracoes(ids)
                }
                await handleReload() 
            }
        });
    };

    const handleGetIteracoes = async () => {
        const response = await listarIteracoesPorProjeto(dadosProjeto.id)
        console.log(response.data)

        if (!response.error && response.data.length > 0){
            const iteracoesOrdenadas = response.data.sort((a, b) => a.numero - b.numero);
            setIteracoes(iteracoesOrdenadas)
        } else if (!response.error && response.data.length === 0){
            setIteracoes([])
        }
    }

    const handleVisualizarIteracao = (record) => {
        const parametros = {
            id: record.id,
            idProjeto: record.projeto
        }

        if (grupo === 'Docentes') {
            navigate("/professor/iteracoes/visualizar", {
                state: parametros
            });
        } else if (grupo === 'Discentes') {
            navigate("/aluno/iteracoes/visualizar", {
                state: parametros
            });
        } else if (grupo === 'Administradores') {
            navigate("/admin/iteracoes/visualizar", {
                state: parametros
            });
        }
    }


    return (
        <React.Fragment>

            {isAvisoVisivel && (
                <Aviso
                    titulo="AVISO"
                    descricao="Nesta tela, o usuário cadastra as iterações que estão previstas para o projeto. "
                    visible={isAvisoVisivel}
                    onClose={handleAvisoClose}
                />
            )}

            <div style={{display: 'flex', justifyContent: 'flex-end', gap: '10px'}}> 
                <Button 
                    icon={<FaPlus />}
                    type="primary"
                    onClick={handleAdicionarIteracao}
                    disabled={isBtnPlusDisabled}
                >
                    Criar Iteração
                </Button>

                <Button
                    icon={<FaTrash />}
                    danger
                    onClick={handleExcluirIteracoes}
                    disabled={isBtnTrashDisabled}
                >
                    Excluir
                </Button>
                <Button
                    icon={<BsQuestionCircle />}
                    onClick={handleDuvidaClick}
                />
            </div>
            <React.Fragment>

                { isFormSalvarVisivel ? (
                    <div className="global-div"> 
                        <FormIteracao onSubmit={handleSalvarIteracao} onCancel={handleCancelar}/>
                    </div> 

                ) : (
                    <TableIteracoesSelect onEdit={handleAtualizarIteracao} onView={handleVisualizarIteracao}/>
                )}

            </React.Fragment>
            
        </React.Fragment>
    )
}

export default CronogramaIteracoes