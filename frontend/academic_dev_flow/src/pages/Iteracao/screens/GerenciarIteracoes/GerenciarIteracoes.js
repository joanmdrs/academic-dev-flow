import React, { useState } from "react";
import Titulo from "../../../../components/Titulo/Titulo";
import { Button, Modal } from "antd";
import { FaPlus, FaSearch } from "react-icons/fa";
import FormGenericBusca from "../../../../components/Forms/FormGenericBusca/FormGenericBusca";
import ListaIteracoes from "../../components/ListaIteracoes/ListaIteracoes";
import FormIteracao from "../../components/FormIteracao/FormIteracao";
import SelecionarProjeto from "../../components/SelecionarProjeto/SelecionarProjeto"
import { useContextoIteracao } from "../../context/contextoIteracao";
import { atualizarIteracao, criarIteracao, excluirIteracoes } from "../../../../services/iteracaoService";
import { buscarProjetoPeloId } from "../../../../services/projetoService";

const GerenciarIteracoes = () => {

    const [isFormBuscarVisivel, setIsFormBuscarVisivel] = useState(false)
    const [isFormSalvarVisivel, setIsFormSalvarVisivel] = useState(false)
    const [acaoForm, setAcaoForm] = useState('criar')
    const {setIteracoes, dadosProjeto, setDadosProjeto, dadosIteracao, setDadosIteracao} = useContextoIteracao()

    const handleCancelar = () => {
        setIsFormBuscarVisivel(false)
        setIsFormSalvarVisivel(false)
        setDadosProjeto(null)
        setDadosIteracao(null)
        setAcaoForm('criar')
    }

    const handleReload = () => {
        setIsFormSalvarVisivel(false)
        setIsFormBuscarVisivel(false)
        setDadosProjeto(null)
        setDadosIteracao(null)
        setIteracoes([])
    }

    const handleBuscarIteracao = () => {
        setIsFormBuscarVisivel(true)
        setIsFormSalvarVisivel(false)
    }

    const handleBuscarProjeto = async (id) => {
        const response = await buscarProjetoPeloId(id)
        setDadosProjeto(response.data)
    }

    const handleAdicionarIteracao = () => {
        setIsFormSalvarVisivel(true)
        setIsFormBuscarVisivel(false)
        setAcaoForm('criar')
        setDadosIteracao(null)
        setDadosProjeto(null)
    }

    const handleAtualizarIteracao = async (record) => {
        await handleBuscarProjeto(record.projeto)
        setIsFormSalvarVisivel(true)
        setIsFormBuscarVisivel(false)
        setAcaoForm('atualizar')
        setDadosIteracao(record)
    }

    const handleSalvarIteracao = async (dadosForm) => {
        dadosForm['projeto'] = dadosProjeto.id
        if (acaoForm === 'criar'){
            console.log(dadosForm)
            await criarIteracao(dadosForm)
        } else {
            await atualizarIteracao(dadosIteracao.id, dadosForm)
        }
    }

    const handleExcluirIteracao = async (id) => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Você está seguro de que deseja excluir este(s) item(s) ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                await excluirIteracoes([id])
                handleReload()
            }
        });
    }


    return (

        <React.Fragment>
            <Titulo
                titulo="Iterações"
                paragrafo="Iterações > Gerenciar iterações"
            />

            <div className="button-menu"> 
                <Button
                    icon={<FaSearch />} 
                    type="primary"
                    onClick={handleBuscarIteracao}
                >
                    Buscar
                </Button>
                <Button 
                    icon={<FaPlus />} 
                    type="primary" 
                    onClick={handleAdicionarIteracao}
                >
                    Criar Iteração
                </Button>
            </div>

            {isFormBuscarVisivel && (
                <div className="global-div" style={{width: '50%'}}>   
                    <FormGenericBusca />
                </div>
            )}

            <div className="global-div"> 
                {isFormSalvarVisivel && acaoForm === 'criar' && (
                    <FormIteracao 
                        additionalFields={<SelecionarProjeto />} 
                        onCancel={handleCancelar}
                        onSubmit={handleSalvarIteracao}
                        
                    />
                )}

                {!isFormSalvarVisivel  && (
                    <ListaIteracoes onEdit={handleAtualizarIteracao} onDelete={handleExcluirIteracao} />
                )}
            </div>
        </React.Fragment>
    )
}

export default GerenciarIteracoes