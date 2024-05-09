import React, { useState } from "react";
import { useContextoIteracao } from "../../context/contextoIteracao";
import { Button, Modal } from "antd";
import { FaPlus, FaTrash } from "react-icons/fa";
import TableIteracoesSelect from "../../components/TableIteracoesSelect/TableIteracoesSelect";
import FormIteracao from "../../components/FormIteracao/FormIteracao";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { atualizarIteracao, criarIteracao, excluirIteracoes } from "../../../../services/iteracaoService";
import BotaoAdicionar from "../../../../components/Botoes/BotaoAdicionar/BotaoAdicionar";
import BotaoExcluir from "../../../../components/Botoes/BotaoExcluir/BotaoExcluir";

const CronogramaIteracoes = () => {

    const {
        dadosIteracao,
        setDadosIteracao,
        setIteracoes, 
        iteracoesSelecionadas, 
        setIteracoesSelecionadas
    } = useContextoIteracao()

    const {dadosProjeto} = useContextoGlobalProjeto()

    const [isFormSalvarVisivel, setIsFormSalvarVisivel] = useState(false)
    const [isBtnPlusDisabled, setIsBtnPlusDisabled] = useState(false)
    const isBtnTrashDisabled = iteracoesSelecionadas.length === 0
    const [acaoForm, setAcaoForm] = useState('criar')

    const handleCancelar = () => {
        setIsFormSalvarVisivel(false)
        setIsBtnPlusDisabled(false)
        setDadosIteracao(null)
        setAcaoForm('criar')
    }

    const handleReload = () => {
        setIsFormSalvarVisivel(false)
        setDadosIteracao(null)
        setIteracoes([])
        setIteracoesSelecionadas([])
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
            await atualizarIteracao(dadosIteracao.id, dadosForm)
        }
        handleReload()
    }

    const handleExcluirIteracoes = () => {
  
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Tem certeza que deseja excluir a(s) iteração(ões) ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                if (iteracoesSelecionadas !== null) {
                    const ids = iteracoesSelecionadas.map((item) => item.id)
                    await excluirIteracoes(ids)
                }
                handleReload() 
            }
        });
    };


    return (
        <React.Fragment>

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
            </div>
            <React.Fragment>

                { isFormSalvarVisivel ? (
                    <div className="global-div"> 
                        <FormIteracao onSubmit={handleSalvarIteracao} onCancel={handleCancelar}/>
                    </div> 

                ) : (
                    <TableIteracoesSelect onEdit={handleAtualizarIteracao} />
                )}

            </React.Fragment>
            
        </React.Fragment>
    )
}

export default CronogramaIteracoes