import { Button, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { verificarExistenciaArquivo } from "../../../../services/artefatoService";
import { handleError } from "../../../../services/utils";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";
import { IoCheckmarkCircle } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";
import { IoMdTrash } from "react-icons/io";
import { FaArrowsRotate } from "react-icons/fa6";

const ListaArquivos = ({dadosArquivos, carregando}) => {

    const COLUNAS_ARQUIVOS = [
        {
            title: "Nome arquivo",
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: "Path do arquivo",
            dataIndex: 'path',
            key: 'path'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (_, record) => (
                <Space>
                    { record.existe ? 
                        <span> <IoCheckmarkCircle color="green" size="15px"/></span>
                        : <span> <IoCloseCircle color="red"  size="20px" /></span>
                    }
                </Space>
            )
        },
        {
            title: 'Ações',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Space> 
                    { record.existe ? 
                        <a> <IoMdTrash /> Excluir </a>
                        : <a> <FaArrowsRotate /> Sicronizar </a>
                    }
                </Space>
            )
        }
    ]

    const [arquivos, setArquivos] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            if (dadosArquivos){
                await handleVerificarExistenciaArquivo()
            }
        }

        fetchData()
    }, [])

    const handleVerificarExistenciaArquivo = async () => {

        try {
            const dados = await Promise.all(dadosArquivos.map(async (arquivo) => {
                const resArtefato = await verificarExistenciaArquivo(arquivo.sha)
    
                if (!resArtefato.error) {
                    const existe = resArtefato.data.existe
                    return { ...arquivo, existe }
                }
                return arquivo
            }))

            setArquivos(dados)

        } catch (error) {
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
        }
    }

    return (    
        <Table className="style-table" loading={carregando} rowKey="sha" columns={COLUNAS_ARQUIVOS} dataSource={arquivos}/>
    )
}

export default ListaArquivos