import React, { useState } from "react";
import { Button, Modal, Space, Tooltip } from "antd";
import { FaFilter, FaPlus } from "react-icons/fa";
import { useContextoIteracao } from "../../context/contextoIteracao";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { atualizarIteracao, criarIteracao, excluirIteracoes, filtrarIteracoesPeloNomeEPeloProjeto } from "../../../../services/iteracaoService";
import { buscarProjetoPeloId } from "../../../../services/projetoService";
import Titulo from "../../../../components/Titulo/Titulo";
import FormIteracao from "../../components/FormIteracao/FormIteracao";
import TableIteracoes from "../../components/TableIteracoes/TableIteracoes";
import RenderDate from "../../../../components/RenderDate/RenderDate";
import RenderStatus from "../../../../components/RenderStatus/RenderStatus";
import { optionsStatusIteracoes } from "../../../../services/optionsStatus";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import SelectProject from "../../../Release/components/SelectProject/SelectProject";
import FormAdminFiltrarIteracoes from "../../components/FormAdminFiltrarIteracoes/FormAdminFiltrarIteracoes";

const AdminIteracoes = () => {

    const [isFormBuscarVisivel, setIsFormBuscarVisivel] = useState(false)
    const [isFormSalvarVisivel, setIsFormSalvarVisivel] = useState(false)
    const [acaoForm, setAcaoForm] = useState('criar')
    const {iteracoes, setIteracoes, dadosIteracao, setDadosIteracao} = useContextoIteracao()
    const {dadosProjeto, setDadosProjeto} = useContextoGlobalProjeto()

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
        setIsFormBuscarVisivel(!isFormBuscarVisivel)
        setIsFormSalvarVisivel(false)
    }

    const handleFiltrarIteracoes = async (dados) => {
        const response = await filtrarIteracoesPeloNomeEPeloProjeto(dados.nome_iteracao, dados.id_projeto)
        if (!response.error) {
            setIteracoes(response.data)
        }
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
            await criarIteracao(dadosForm)
        } else {
            await atualizarIteracao(dadosIteracao.id, dadosForm)
        }
        handleReload()
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

    const columnsTableIteracoes = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome'
        },
        {
            title: 'Data de Início',
            dataIndex: 'data_inicio',
            key: 'data_inicio',
            render: (_, record) => (
                <RenderDate dateType="inicio" dateValue={record.data_inicio} />
            )
        },
        {
            title: 'Data de Término (Previsão)',
            dataIndex: 'data_termino',
            key: 'data_termino',
            render: (_, record) => (
                <RenderDate dateType="fim" dateValue={record.data_termino} />
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => (
                <RenderStatus optionsStatus={optionsStatusIteracoes} propStatus={record.status} />
            )
        },
        {
            title: 'Projeto', 
            dataIndex: 'nome_projeto', 
            key: 'nome_projeto', 
        },
        {
            title: 'Ações',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Tooltip title="Editar">
                        <span 
                            style={{cursor: 'pointer', color: 'var(--primary-color)'}} 
                            onClick={() => handleAdicionarIteracao(record)}
                        ><IoMdCreate /></span>
                    </Tooltip>

                    <Tooltip title="Excluir">
                        <span 
                            style={{cursor: 'pointer', color: 'var(--primary-color)'}} 
                            onClick={() => handleExcluirIteracao(record.id)}
                            ><IoMdTrash /></span>
                    </Tooltip>
                </Space>
            )
        }
    ]




    return (

        <div className="content">
            <Titulo
                titulo="Iterações"
                paragrafo="Iterações > Gerenciar iterações"
            />

            { !isFormSalvarVisivel && (
                <div className="button-menu"> 
                    <Button
                        icon={<FaFilter />} 
                        type="primary"
                        onClick={handleBuscarIteracao}
                    >
                        Filtrar
                    </Button>
                    <Button 
                        icon={<FaPlus />} 
                        type="primary" 
                        onClick={handleAdicionarIteracao}
                    >
                        Criar Iteração
                    </Button>
                </div>
            )}

            {isFormBuscarVisivel && (
                <div style={{width: '50%'}}>
                    <FormAdminFiltrarIteracoes onCancel={handleCancelar} onFilter={handleFiltrarIteracoes} />
                </div>
            )}

            {isFormSalvarVisivel && (
                <div>
                    <FormIteracao 
                        additionalFields={<SelectProject />} 
                        onCancel={handleCancelar}
                        onSubmit={handleSalvarIteracao}
                    />
                </div>
            )}

            {!isFormSalvarVisivel  && (
                <div>
                    <TableIteracoes data={iteracoes} columns={columnsTableIteracoes} />
                </div>
            )}
        </div>
    )
}

export default AdminIteracoes