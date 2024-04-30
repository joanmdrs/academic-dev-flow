import { Space, Table } from "antd";
import React, { useEffect } from "react";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { useContextoArtefato } from "../../context/ContextoArtefato";
import { listarArtefatos } from "../../../../services/artefatoService";
import { optionsStatusArtefatos } from "../../../../services/optionsStatus";
import { IoOpenOutline } from "react-icons/io5";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const TableArtefatosSelect = ({onView, onEdit, onDelete}) => {

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
                <span>
                    {optionsStatusArtefatos.find(status => status.value === record.status)?.label}
                </span>
            )
        },
        {
            title: 'Path',
            dataIndex: 'path_file',
        },
        {
            title: 'Ações',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => onView(record)}><FaEye color="green" size="20px" /></a>
                    <a onClick={() => onEdit(record)}><FaEdit color="orange" size="20px" /></a>
                    <a onClick={() => onDelete(record)}><FaTrash color="red" /></a>
                </Space>
            )
        }
    ]

    const {dadosProjeto} = useContextoGlobalProjeto()
    const {artefatos, setArtefatos, setArtefatosSelecionados} = useContextoArtefato()

    const handleListarArtefatos = async () => {
        const response = await listarArtefatos();
    
        if (!response.error) { 
            setArtefatos(response.data)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (artefatos.length === 0){
                await handleListarArtefatos()
            }
        }   

        fetchData()
    })

    return (
        <Table 
            className="style-table"
            bordered
            columns={COLUNAS_TABELA_ARTEFATOS}
            dataSource={artefatos}
            rowKey={"id"}
        />
    )
}

export default TableArtefatosSelect