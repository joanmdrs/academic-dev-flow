import React, { useEffect } from "react";
import {Table, Space} from 'antd'
import { useContextoArtefato } from "../../context/ContextoArtefato";
import { listarArtefatos } from "../../../../services/artefatoService";

const ListaArtefatos = ({onView, onEdit, onDelete}) => {

    const COLUNAS_TABELA_ARTEFATOS = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            render: (_, record) => (
                <a
                    onClick={() =>  onView(record)}
                > {record.nome} </a>
            )
        },
        {
            title: 'Descrição',
            dataIndex: 'descricao',
            key: 'descricao',
            render: (_, record) => (
                <span> {handleLimitarCaracteres(record.descricao)}</span>
            )
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
                    <a onClick={() =>  onDelete(record)}>Excluir</a>
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

    function handleLimitarCaracteres(texto, limite) {
        if (texto.length >= limite) {
            return `${texto.substring(0, limite)}...`;
        }
        return texto;
    }

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

export default ListaArtefatos