import React, { useEffect } from "react";
import {Table, Space, Select, Tooltip} from 'antd'
import { useContextoArtefato } from "../../context/ContextoArtefato";
import { listarArtefatos } from "../../../../services/artefatoService";
import { handleError } from "../../../../services/utils";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";
import { optionsStatusArtefatos } from "../../../../services/optionsStatus";
import { IoMdCreate, IoMdOpen, IoMdTrash } from "react-icons/io";
import RenderEmpty from "../../../../components/Empty/Empty";
import RenderDate from "../../../../components/RenderDate/RenderDate";
import RenderStatus from "../../../../components/RenderStatus/RenderStatus";

const TableAdminArtefatos = ({onEdit, onDelete, onUpdateStatus}) => {

    const COLUNAS_TABELA_ARTEFATOS = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            render: (_, record) => (
                <span className="ff-pop"> {record.nome} </span>
            )
        },
        {
            title: 'Data de entrega',
            dataIndex: 'data_entrega',
            key: 'data_entrega',
            render: (_, record) => (
                <RenderDate dateType="inicio" dateValue={record.data_termino} />
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => (
                <RenderStatus optionsStatus={optionsStatusArtefatos} propStatus={record.status} />
            )
        },
        {
            title: 'Projeto',
            dataIndex: 'nome_projeto',
            key: 'nome_projeto'
        },
        {
            title: 'Ações',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {/* <Tooltip title="Visualizar">
                        <a onClick={() => onView(record)}><IoMdOpen /></a>
                    </Tooltip> */}
                    <Tooltip title="Editar">
                        <a onClick={() => onEdit(record)}><IoMdCreate /></a>
                    </Tooltip>
                    <Tooltip title="Excluir">
                        <a onClick={() => onDelete(record.id)}><IoMdTrash /></a>
                    </Tooltip>
                </Space>
            )
        }
    ]

    const {artefatos, setArtefatos, setArtefatosSelecionados} = useContextoArtefato()

    useEffect(() => {
        const fetchData = async () => {
            if (artefatos.length === 0){
                await handleListarArtefatos()
            }
        }

        fetchData()
    }, [])

    // function handleLimitarCaracteres(texto, limite) {
    //     if (texto && texto.length >= limite) {
    //         return `${texto.substring(0, limite)}...`;
    //     }
    //     return texto;
    // }

    const handleListarArtefatos = async () => {
        try {
            const response = await listarArtefatos();
    
            if (!response.error) { 
                setArtefatos(response.data)
            } 
        } catch (error) {
            setArtefatos([])
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
        }
    }

    const rowSelection = {
        onChange: (selectedRowsKeys, selectedRows) => {
          setArtefatosSelecionados(selectedRows)
        },
    };

    return (
        <React.Fragment>
            { artefatos.length !== 0 ? (
                <Table
                    rowKey="id"
                    dataSource={artefatos}
                    columns={COLUNAS_TABELA_ARTEFATOS}
                    rowSelection={rowSelection}
                />
            ) : (
                <RenderEmpty title="Nenhum artefato para exibir" />
            )}
        </React.Fragment>
    )
}

export default TableAdminArtefatos