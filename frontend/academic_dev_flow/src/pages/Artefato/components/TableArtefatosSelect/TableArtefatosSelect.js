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
            title: 'Ações',
            dataIndex: 'action',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => onView(record)}><FaEye /></a>
                    <a onClick={() => onEdit(record)}><FaEdit /></a>
                    <a onClick={() => onDelete(record)}><FaTrash /></a>
                </Space>
            )
        }
    ]

    const {dadosProjeto} = useContextoGlobalProjeto()
    const {artefatos, setArtefatos} = useContextoArtefato()

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
            columns={COLUNAS_TABELA_ARTEFATOS}
            dataSource={artefatos}
            rowKey={"id"}
        />
    )
}

export default TableArtefatosSelect