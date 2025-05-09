import React, { useEffect, useState } from "react";
import { Button, Modal, Space, Tooltip } from "antd";
import { FaFilter, FaPlus } from "react-icons/fa";
import { useContextoIteracao } from "../../context/contextoIteracao";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { atualizarIteracao, criarIteracao, excluirIteracoes, filtrarIteracoesPeloNomeEPeloProjeto, listarIteracoes } from "../../../../services/iteracaoService";
import { buscarProjetoPeloId } from "../../../../services/projetoService";
import Titulo from "../../../../components/Titulo/Titulo";
import FormIteracao from "../../components/FormIteracao/FormIteracao";
import TableIteracoes from "../../components/TableIteracoes/TableIteracoes";
import RenderDate from "../../../../components/RenderDate/RenderDate";
import RenderStatus from "../../../../components/RenderStatus/RenderStatus";
import { optionsStatusIteracoes } from "../../../../services/optionsStatus";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import FormAdminFiltrarIteracoes from "../../components/FormAdminFiltrarIteracoes/FormAdminFiltrarIteracoes";
import SelectProject from "../../components/SelectProject/SelectProject";

const AdminIteracoes = () => {

    const [isFormBuscarVisivel, setIsFormBuscarVisivel] = useState(false)
    const [isFormSalvarVisivel, setIsFormSalvarVisivel] = useState(false)
    const {iteracoes, setIteracoes, dadosIteracao, setDadosIteracao, actionForm, setActionForm} = useContextoIteracao()
    const {dadosProjeto, setDadosProjeto} = useContextoGlobalProjeto()

    const handleCancelar = async () => {
        setIsFormBuscarVisivel(false)
        setIsFormSalvarVisivel(false)
        setDadosProjeto(null)
        setDadosIteracao(null)
        setActionForm('create')
        await handleListarIteracoes()

    }

    const handleReload = async () => {
        setIsFormSalvarVisivel(false)
        setIsFormBuscarVisivel(false)
        setDadosProjeto(null)
        setDadosIteracao(null)
        setIteracoes([])
        await handleListarIteracoes()
    }

    const handleBuscarIteracao = () => {
        setIsFormBuscarVisivel(!isFormBuscarVisivel)
        setIsFormSalvarVisivel(false)
    }

    const handleFiltrarIteracoes = async (dados) => {
        if (dados.nome_iteracao || dados.id_projeto){
            const response = await filtrarIteracoesPeloNomeEPeloProjeto(dados.nome_iteracao, dados.id_projeto)
            if (!response.error) {
                setIteracoes(response.data)
            }
        } else {
            await handleListarIteracoes()
        }
        
    }

    const handleBuscarProjeto = async (id) => {
        const response = await buscarProjetoPeloId(id)
        setDadosProjeto(response.data)
    }

    const handleAdicionarIteracao = () => {
        setIsFormSalvarVisivel(true)
        setIsFormBuscarVisivel(false)
        setActionForm('create')
        setDadosIteracao(null)
        setDadosProjeto(null)
    }

    const handleAtualizarIteracao = async (record) => {
        await handleBuscarProjeto(record.projeto)
        setIsFormSalvarVisivel(true)
        setIsFormBuscarVisivel(false)
        setActionForm('update')
        setDadosIteracao(record)
    }

    const handleSalvarIteracao = async (dadosForm) => {
        dadosForm['projeto'] = dadosProjeto.id
        if (actionForm === 'create'){
            await criarIteracao(dadosForm)
        } else if (actionForm === 'update') {
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
            title: 'Data de Término',
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
                            onClick={() => handleAtualizarIteracao(record)}
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

    const handleListarIteracoes = async () => {
        const response = await listarIteracoes()

        if (!response.error){
            setIteracoes(response.data)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await handleListarIteracoes()
        }

        fetchData()
    }, [])




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
                <div className="pa-20" style={{width: '50%'}}>
                    <FormAdminFiltrarIteracoes onCancel={handleCancelar} onFilter={handleFiltrarIteracoes} />
                </div>
            )}

            {isFormSalvarVisivel && (
                <div className="pa-20">
                    <FormIteracao 
                        selectProject={<SelectProject />}
                        onCancel={handleCancelar}
                        onSubmit={handleSalvarIteracao}
                    />
                </div>
            )}

            {!isFormSalvarVisivel  && (
                <div className="pa-20"> 
                    <TableIteracoes data={iteracoes} columns={columnsTableIteracoes} />
                </div>
            )}
        </div>
    )
}

export default AdminIteracoes