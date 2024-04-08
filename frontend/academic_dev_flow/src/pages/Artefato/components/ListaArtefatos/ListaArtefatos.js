import React, { useEffect } from "react";
import {Table, Space} from 'antd'
import { useContextoArtefato } from "../../context/ContextoArtefato";
import { listarArtefatos } from "../../../../services/artefatoService";

const ListaArtefatos = ({onEdit, onDelete}) => {

    const COLUNAS_TABELA_ARTEFATOS = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome'
        },
        {
            title: 'Data de Criação',
            dataIndex: 'data_criacao',
            key: 'data_criacao'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status'
        },
        {
            title: 'Ações',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => onEdit(record)}>Editar</a>
                    <a onClick={() =>  onDelete(record.id)}>Excluir</a>
                </Space>
            )
        }
    ]

    const {artefatos, setArtefatos} = useContextoArtefato()

    useEffect(() => {
        const fetchData = async () => {
            if (artefatos.length === 0){
                await handleListarArtefatos()
            }
        }

        fetchData()
    }, [artefatos])

    const handleListarArtefatos = async () => {
        const response = await listarArtefatos()
        setArtefatos(response.data)

    }


    return (
        <Table
            dataSource={artefatos}
            columns={COLUNAS_TABELA_ARTEFATOS}
        />
    )
}