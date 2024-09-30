import React, { useEffect, useState } from "react";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { Space, Table, Tooltip } from "antd";
import { buscarMembrosPorProjeto, cadastrarFuncaoAtual } from "../../../../services/membroProjetoService";
import FormFuncao from "../../components/FormFuncao/FormFuncao";
import { useMembroContexto } from "../../context/MembroContexto";
import { formatDate } from "../../../../services/utils";
import { IoMdCreate, IoMdOpen } from "react-icons/io";

const PainelMembros = () => {

    const COLUNAS_TABELA_MEMBROS = [
        {
            title: 'Nome',
            dataIndex: 'nome_membro',
            key: 'nome_membro'
        },
        {
            title: 'Funcao',
            dataIndex: 'nome_funcao',
            key: 'nome_funcao',
            render: (_, record) => (
                <Space>
                    {record.nome_funcao ? record.nome_funcao : 'À definir'}
                </Space>
            )
        },
        {
            title: 'Início', 
            dataIndex: 'data_inicio',
            key: 'data_inicio',
            render: (_, record) => (
                <Space>
                    {
                        record.data_inicio !== null ? (
                            <span> {formatDate(record.data_inicio)} </span>
                        ) : (
                            <span> - </span>
                        )
                    }
                    
                </Space>
            )
        },
        {
            title: 'Fim', 
            dataIndex: 'data_termino',
            key: 'data_termino',
            render: (_, record) => (
                <Space>
                    {
                        record.data_termino !== null ? (
                            <span> {formatDate(record.data_termino)} </span>
                        ) : (
                            <span> - </span>
                        )
                    }
                    
                </Space>
            )
        },
        {
            title: 'Ações',
            dataIndex: 'actions',
            key: 'actions',
            align: 'center',
            render: (_, record) => (
                <Space>
                    <Tooltip title="Visualizar">
                        <a><IoMdOpen /></a>
                    </Tooltip>
                    <Tooltip title="Editar">
                        <a onClick={() => handleEditarFuncao(record)}><IoMdCreate /></a>
                    </Tooltip>
                </Space>
            )
        }
    ]

    const {dadosProjeto} = useContextoGlobalProjeto()
    const {dadosFuncao, setDadosFuncao} = useMembroContexto()
    const [membros, setMembros] = useState([])

    const [isFormSalvarVisivel, setIsFormSalvarVisivel] = useState(false)

    const handleListarMembrosPorProjeto = async () => {
        const response = await buscarMembrosPorProjeto(dadosProjeto.id);

        if (!response.error && response.data) {
            setMembros(response.data)
        }
    };
    
    useEffect(() => {
        const fetchData = async () => {
            if (dadosProjeto) {
                await handleListarMembrosPorProjeto()
            }
        }

        fetchData()
    }, [])

    const handleCancelar = () => {
        setIsFormSalvarVisivel(false)
    }

    const handleReload = async () => {
        setDadosFuncao(null)
        setIsFormSalvarVisivel(false)
        await handleListarMembrosPorProjeto()
    }

    const handleEditarFuncao = async (record) => {
        setIsFormSalvarVisivel(true)
        setDadosFuncao(record)
    }

    const handleDefinirFuncao = async (dadosForm) => {
        const dadosEnviar = {
            membro_projeto: dadosFuncao.id_membro_projeto,
            funcao_membro: dadosForm.id_funcao,
            data_inicio: dadosForm.data_inicio,
            data_termino: dadosForm.data_termino,
            ativo: dadosForm.ativo
        }
        
        await cadastrarFuncaoAtual(dadosEnviar)
        await handleReload()
    }

    return (
        <React.Fragment>

            {isFormSalvarVisivel ? (
                <div className="global-div" style={{margin: '0'}}> 
                    <FormFuncao onSubmit={handleDefinirFuncao} onCancel={handleCancelar}/>
                </div>

            ) : (
                <Table 
                    rowKey="id_membro_projeto"
                    columns={COLUNAS_TABELA_MEMBROS}
                    dataSource={membros}
                />
            )}
        </React.Fragment>
    )
}

export default PainelMembros