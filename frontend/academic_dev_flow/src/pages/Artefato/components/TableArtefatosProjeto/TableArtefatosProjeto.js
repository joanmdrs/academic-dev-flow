import { Form, Select, Space, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { useContextoArtefato } from "../../context/ContextoArtefato";
import {listarArtefatosPorProjeto } from "../../../../services/artefatoService";
import { IoMdCreate, IoMdOpen, IoMdTrash } from "react-icons/io";
import { optionsStatusArtefatos, optionsStatusIteracoes } from "../../../../services/optionsStatus";
import { listarIteracoesPorProjeto } from "../../../../services/iteracaoService";

const TableArtefatosProjeto = ({onView, onEdit, onDelete, onUpdateStatus}) => {

    const COLUNAS_TABELA_ARTEFATOS = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            render: (_, record) => (
                <a 
                    href={`https://github.com/${dadosProjeto.nome_repo}/tree/main/${record.path_file}`}
                    target="blank"
                > {record.nome} </a>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => (
                <Select 
                    style={{width: '150px'}} 
                    value={record.status} 
                    options={optionsStatusArtefatos} 
                    onChange={(value) => onUpdateStatus(record, value)}
                /> 
            )
        },
        {
            title: 'Iteração',
            dataIndex: 'iteracao',
            key: 'iteracao',
            render: (_, record) => (
                <span>
                    {optionsIteracao.find(iteracao => iteracao.value === record.iteracao)?.label}
                </span>
            )

        },
        {
            title: 'Ações',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Visualizar">
                        <a onClick={() => onView(record)}><IoMdOpen /></a>
                    </Tooltip>
                    <Tooltip title="Editar">
                        <a onClick={() => onEdit(record)}><IoMdCreate /></a>
                    </Tooltip>
                    <Tooltip title="Excluir">
                        <a onClick={() => onDelete(record)}><IoMdTrash /></a>
                    </Tooltip>
                </Space>
            )
        }
    ]

    const [optionsIteracao, setOptionsIteracao] = useState([])


    const handleGetIteracoes = async () => {
        const response = await listarIteracoesPorProjeto(dadosProjeto.id)

        if (!response.error && response.data.length > 0){
            const iteracoesOrdenadas = response.data.sort((a, b) => a.numero - b.numero);

            const resultados = iteracoesOrdenadas.map((item) => {
                return {
                    value: item.id,
                    label: item.nome
                }
            })

            setOptionsIteracao(resultados)
        }
    }
    
    const {dadosProjeto} = useContextoGlobalProjeto()
    const {artefatos, setArtefatos, setArtefatosSelecionados} = useContextoArtefato()

    const handleListarArtefatos = async () => {
        const response = await listarArtefatosPorProjeto(dadosProjeto.id);
    
        if (!response.error) { 
            setArtefatos(response.data)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (artefatos.length === 0){
                await handleListarArtefatos()
            } 
            if (dadosProjeto !== null) {
                await handleGetIteracoes()
            }
        }   

        fetchData()
    }, [dadosProjeto])

    const rowSelection = {
        onChange: (selectedRowsKeys, selectedRows) => {
          setArtefatosSelecionados(selectedRows)
        },
    };

    return (
        <Table 
            columns={COLUNAS_TABELA_ARTEFATOS}
            dataSource={artefatos}
            rowKey={"id"}
            rowSelection={rowSelection}
        />
    )
}

export default TableArtefatosProjeto