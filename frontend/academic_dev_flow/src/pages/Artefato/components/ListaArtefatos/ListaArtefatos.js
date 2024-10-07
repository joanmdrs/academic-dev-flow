import React, { useEffect } from "react";
import {Table, Space, Select, Tooltip} from 'antd'
import { useContextoArtefato } from "../../context/ContextoArtefato";
import { listarArtefatos } from "../../../../services/artefatoService";
import { buscarProjetoPeloId } from "../../../../services/projetoService";
import { handleError } from "../../../../services/utils";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";
import { optionsStatusArtefatos } from "../../../../services/optionsStatus";
import { IoMdCreate, IoMdOpen, IoMdTrash } from "react-icons/io";

const ListaArtefatos = ({onView, onEdit, onDelete, onUpdateStatus}) => {

    const COLUNAS_TABELA_ARTEFATOS = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            render: (_, record) => (
                <a 
                    href={`https://github.com/${record.nome_repo}/tree/main/${record.path_file}`}
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

    const {artefatos, setArtefatos} = useContextoArtefato()

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
    
            if (response.data.length > 0) { 
                const dados = await Promise.all(response.data.map(async (artefato) => {
                    const resProjeto = await buscarProjetoPeloId(artefato.projeto);
    
                    if (!resProjeto.error){
                        artefato['nome_projeto'] = resProjeto.data.nome
                        artefato['nome_repo'] = resProjeto.data.nome_repo
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
            rowKey="id"
            dataSource={artefatos}
            columns={COLUNAS_TABELA_ARTEFATOS}
        />
    )
}

export default ListaArtefatos