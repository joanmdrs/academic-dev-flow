import React, { useEffect, useState } from "react";
import {Table, Space} from 'antd'
import { useContextoArtefato } from "../../context/ContextoArtefato";
import { listarArtefatos } from "../../../../services/artefatoService";
import { buscarProjetoPeloId } from "../../../../services/projetoService";
import { handleError } from "../../../../services/utils";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";

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
            title: 'Path',
            dataIndex: 'path_file',
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
        try {
            const response = await listarArtefatos();
    
            if (response.data.length > 0) { 
                const dados = await Promise.all(response.data.map(async (artefato) => {
                    const resProjeto = await buscarProjetoPeloId(artefato.projeto);
    
                    if (!resProjeto.error){
                        artefato['nome_projeto'] = resProjeto.data.nome;
                    }
                    return artefato;
                }));
                const resultado = await (Promise.resolve(dados))
                setArtefatos(resultado)
            } else {
                setArtefatos([])
            }
        } catch (error) {
            setArtefatos([])
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
            
        }
    }


    return (
        <Table
            dataSource={artefatos}
            columns={COLUNAS_TABELA_ARTEFATOS}
        />
    )
}

export default ListaArtefatos