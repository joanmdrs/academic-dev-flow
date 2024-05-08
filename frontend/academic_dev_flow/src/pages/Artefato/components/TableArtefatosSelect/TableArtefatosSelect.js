import { Space, Table, Tooltip } from "antd";
import React, { useEffect } from "react";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { useContextoArtefato } from "../../context/ContextoArtefato";
import { listarArtefatos } from "../../../../services/artefatoService";
import { IoMdCreate, IoMdOpen, IoMdTrash } from "react-icons/io";

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