import { Select, Space, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useContextoArtefato } from "../../context/ContextoArtefato";
import { IoMdCreate, IoMdOpen, IoMdTrash } from "react-icons/io";
import { optionsStatusArtefatos } from "../../../../services/optionsStatus";
import { listarIteracoesPorProjeto } from "../../../../services/iteracaoService";
import { IoClose } from "react-icons/io5";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";

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
                    placeholder="Selecione"
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
            align: 'center',
            render: (_, record) => (
                <Space>
                    {record.iteracao ? (
                        <span>
                            {optionsIteracao.find(iteracao => iteracao.value === record.iteracao)?.label}
                        </span>
                    ) : (<Tooltip title="Nenhuma iteração vinculada">
                            <IoClose color="red"/>
                        </Tooltip>)
                    }
                </Space>
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
    const {artefatos, setArtefatosSelecionados, handleListarArtefatos} = useContextoArtefato()


    useEffect(() => {
        const fetchData = async () => {
            if (artefatos.length === 0){
                await handleListarArtefatos(dadosProjeto.id)
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