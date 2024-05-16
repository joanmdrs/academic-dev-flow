import React, { useEffect } from "react";
import { formatDate } from "../../../../services/utils";
import { Button, Space, Table, Tooltip } from "antd";
import { useContextoIteracao } from "../../context/contextoIteracao";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { optionsStatusIteracoes } from "../../../../services/optionsStatus";
import { FaUser } from "react-icons/fa";
import { MdOpenInNew } from "react-icons/md";
import { listarIteracoesPorProjeto } from "../../../../services/iteracaoService";


const TableIteracoesSelect = ({onEdit, onView}) => {

    const COLUNAS_TABELA_ITERACOES = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            render: (_, record) => (
                <span style={{cursor: "pointer", color: "var(--primary-color)"}} onClick={() => onEdit(record)}>
                    {record.nome}
                </span>

            )
        },

        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => (
                <span>
                    {optionsStatusIteracoes.find(status => status.value === record.status)?.label}
                </span>
            )
        },
        {
            title: 'Data de início',
            dataIndex: 'data_inicio',
            key: 'data_inicio',
            render: (_, record) => (
                <span>
                    {formatDate(record.data_inicio)}
                </span>
            )
        },
        {
            title: 'Data de término',
            dataIndex: 'data_termino',
            key: 'data_termino',
            render: (_, record) => (
                <span>
                    {formatDate(record.data_termino)}
                </span>
            )
        },
        {
            title: 'Líder',
            dataIndex: 'nome_membro',
            key: 'nome_membro',
            render: (_, record) => (
                <Space> 
                    <Tooltip title={record.nome_membro}> 
                        <FaUser />
                    </Tooltip>
                </Space>
            )
        },
        {
            title: 'Fase',
            dataIndex: 'nome_etapa',
            key: 'nome_etapa'
        },
        {
            title: 'Ações',
            dataIndex: 'actions',
            key: 'actions', 
            align: 'center',
            render: (_, record) => (
                <Tooltip title="Visualizar">
                    <Button 
                        style={{ border: 'none', color: 'var(--primary-color)' }}
                        onClick={() => onView(record)} 
                        icon={<MdOpenInNew />} 
                    />
                </Tooltip>
            )
        }
    ]

    const {dadosProjeto} = useContextoGlobalProjeto()

    const {
        iteracoes,
        setIteracoes,
        setIteracoesSelecionadas} = useContextoIteracao()

    const rowSelection = {
        onChange: (selectedRowsKeys, selectedRows) => {
          setIteracoesSelecionadas(selectedRows)
        },
    };

    const handleGetIteracoes = async () => {
        const response = await listarIteracoesPorProjeto(dadosProjeto.id)
        console.log(response.data)

        if (!response.error && response.data.length > 0){
            const iteracoesOrdenadas = response.data.sort((a, b) => a.numero - b.numero);
            setIteracoes(iteracoesOrdenadas)
        } else if (!response.error && response.data.length === 0){
            setIteracoes([])
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (dadosProjeto !== null) {
                await handleGetIteracoes()
            }
        }

        fetchData()
    }, [])

    return (
        <div style={{}}>
            <h4 style={{textAlign: "center"}}> Cronograma de Iterações </h4> 
            <Table 
                columns={COLUNAS_TABELA_ITERACOES}
                dataSource={iteracoes}
                rowKey={"id"}
                rowSelection={rowSelection}
            />

        </div>

    )

}

export default TableIteracoesSelect