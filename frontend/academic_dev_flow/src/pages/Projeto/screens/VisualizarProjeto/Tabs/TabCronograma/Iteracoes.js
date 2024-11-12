import { Button, Modal, Space, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoMdCreate, IoMdTrash } from "react-icons/io";

import { NotificationManager } from "react-notifications";
import RenderDate from "../../../../../../components/RenderDate/RenderDate";
import RenderStatus from "../../../../../../components/RenderStatus/RenderStatus";
import { optionsStatusIteracoes } from "../../../../../../services/optionsStatus";
import { useContextoGlobalProjeto } from "../../../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { useContextoIteracao } from "../../../../../Iteracao/context/contextoIteracao";
import { atualizarIteracao, criarIteracao, excluirIteracoes, listarIteracoesPorProjeto } from "../../../../../../services/iteracaoService";
import FormIteracao from "../../../../../Iteracao/components/FormIteracao/FormIteracao";
import TableIteracoes from "../../../../../Iteracao/components/TableIteracoes/TableIteracoes"


const Iteracoes = () => {

    const columnsTableIteracoes = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome'
        },
        {
            title: 'Início',
            dataIndex: 'data_inicio',
            key: 'data_inicio',
            render: (_, record) => (
                <RenderDate dateType="inicio" dateValue={record.data_inicio} />
            )
        },
        {
            title: 'Término',
            dataIndex: 'data_termino',
            key: 'data_termino',
            render: (_, record) => (
                <RenderDate dateType="fim" dateValue={record.data_termino} />
            )
        },
        {
            title: 'Responsável',
            dataIndex: 'responsavel',
            key: 'responsavel',
            render: (_, record) => (
                <Space>
                    {record.nome_responsavel}
                </Space>
            )
        },
        {
            title: 'Etapa',
            dataIndex: 'etapa',
            key: 'etapa',
            render: (_, record) => (
                <Space>
                    {record.nome_etapa}
                </Space>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (_, record) => (
                <RenderStatus optionsStatus={optionsStatusIteracoes} propStatus={record.status} /> 
            )
        },
        {
            title: 'Ações',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Tooltip title="Editar">
                        <a onClick={() => handleAtualizarIteracao(record)}><IoMdCreate /></a>
                    </Tooltip>
                    <Tooltip title="Excluir">
                        <a onClick={() => handleExcluirIteracao(record.id)}><IoMdTrash /></a>
                    </Tooltip>
                </Space>
            )
        }
    ]

    const [isFormIteracaoVisible, setIsFormIteracaoVisible] = useState(false)
    const [iteracoes, setIteracoes] = useState([])
    const {dadosProjeto} = useContextoGlobalProjeto()
    const {dadosIteracao, setDadosIteracao} = useContextoIteracao()
    const [actionForm, setActionForm] = useState('create')

    
    const handleBuscarIteracoes = async () => {
        const response = await listarIteracoesPorProjeto(dadosProjeto.id)
        if (!response.error){
            setIteracoes(response.data)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (dadosProjeto){
                await handleBuscarIteracoes()
            }
        }

        fetchData()
    }, [dadosProjeto])

    const handleCancelar = () => {
        setIsFormIteracaoVisible(false)
    }

    const handleReload = async () => {
        setIsFormIteracaoVisible(false)
        await handleBuscarIteracoes()
    }

    const handleAdicionarIteracao = () => {
        setIsFormIteracaoVisible(true)
        setDadosIteracao(null)
        setActionForm('create')
    }

    const handleAtualizarIteracao = async (record) => {
        setIsFormIteracaoVisible(true)
        setActionForm('update')
        setDadosIteracao(record)
    }
    
    const handleSalvarIteracao = async (formData) => {

        formData['projeto'] = dadosProjeto.id
        if (actionForm === 'create') {
            const response = await criarIteracao(formData)
            if (!response.error){
                await handleReload()
            }
        } else if (actionForm === 'update'){
            const response = await atualizarIteracao(dadosIteracao.id, formData)
            if (!response.error){
                await handleReload()
            }
        }
    }

    const handleExcluirIteracao = async (id) => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Você está seguro de que deseja excluir esta iteração ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                try {
                    await excluirIteracoes([id]);
                    await handleReload()

                } catch (error) {
                    NotificationManager.error('Falha ao tentar excluir o artefato');
                } 
            }
        });
    };

    return (
        <div>
            
            <div className="df jc-end w-100 mt-10 mb-10">
                <Button onClick={handleAdicionarIteracao} type="primary" icon={<FaPlus />}> Criar Iteração </Button>
            </div>
            {
                isFormIteracaoVisible ? (
                    <FormIteracao onSubmit={handleSalvarIteracao} onCancel={handleCancelar}  />
                ) : <TableIteracoes columns={columnsTableIteracoes} data={iteracoes} />
            }
                
        </div>
    )
}

export default Iteracoes