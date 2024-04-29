import { Space, Table } from "antd";
import React, { useEffect } from "react";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { useContextoArtefato } from "../../context/ContextoArtefato";
import { listarArtefatos } from "../../../../services/artefatoService";

const TableArtefatosSelect = ({onView, onEdit}) => {

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
            key: 'status'
        },
        {
            title: 'Path',
            dataIndex: 'path_file',
        },
        {
            title: 'Ações',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => onView(record)}>Visualizar</a>
                    <a onClick={() => onEdit(record)}>Editar</a>
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

    const rowSelection = {
        onChange: (selectedRowsKeys, selectedRows) => {
          setArtefatosSelecionados(selectedRows)
        },
    };

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
            rowSelection={rowSelection}
        />
    )
}

export default TableArtefatosSelect