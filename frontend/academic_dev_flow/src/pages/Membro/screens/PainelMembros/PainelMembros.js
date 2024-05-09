import React, { useEffect, useState } from "react";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { Button, Space, Table } from "antd";
import { cadastrarFuncaoAtual, listarMembrosPeloIdProjeto } from "../../../../services/membroProjetoService";
import FormFuncao from "../../components/FormFuncao/FormFuncao";
import { useMembroContexto } from "../../context/MembroContexto";
import { formatDate } from "../../../../services/utils";

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
                    <span> {formatDate(record.data_inicio)} </span>
                </Space>
            )
        },
        {
            title: 'Fim', 
            dataIndex: 'data_termino',
            key: 'data_termino',
            render: (_, record) => (
                <Space>
                    <span> {formatDate(record.data_termino)} </span>
                </Space>
            )
        },
        {
            title: 'Ações',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button type="primary" onClick={() => handleEditarFuncao(record)} >Editar</Button>
                </Space>
            )
        }
    ]

    const {dadosProjeto} = useContextoGlobalProjeto()
    const {dadosFuncao, setDadosFuncao} = useMembroContexto()
    const [membros, setMembros] = useState([])

    const [isFormSalvarVisivel, setIsFormSalvarVisivel] = useState(false)

    const handleListarMembrosPorProjeto = async () => {
        const response = await listarMembrosPeloIdProjeto(dadosProjeto.id);

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
            data_termino: dadosForm.data_termino,
            ativo: dadosForm.ativo
        }

        console.log(dadosEnviar)

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