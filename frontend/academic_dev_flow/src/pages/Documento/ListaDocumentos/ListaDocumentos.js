import { Button, Empty, Table } from "antd";
import React, { useState } from "react";
import { PiEye } from "react-icons/pi";
import { GoCommentDiscussion } from "react-icons/go";
import VisualizarDocumento from "../VisualizarDocumento/VisualizarDocumento";
import { useProjetoContext } from "../../../context/ContextoGlobalProjeto";
import { FaTrash } from "react-icons/fa";
import { Content } from "antd/es/layout/layout";

const ListaDocumentos = ({docs, onSearch, onEdit, onDelete}) => {
    const [currentPage, setCurrentPage] = useState('default')
    const [documentoSelecionado, setDocumentoSelecionado] = useState(null);
    const [currentPath, setCurrentPath] = useState('docs');
    const {setDadosDocumento, documentosSelecionados, setDocumentosSelecionados} = useProjetoContext()

    const COLUNAS_TABELA_DOCUMENTOS = [
        {
            title: 'Título',
            dataIndex: 'titulo',
            key: 'titulo',
            render: (_, record) => (
                <span onClick={() => onEdit(record)} style={{color: "var(--primary-color)", cursor: "pointer"}}>
                    {record.titulo}
                </span>                    
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status'
        },
        {
            title: 'Iteração',
            dataIndex: 'nome_iteracao',
            key: 'nome_iteracao'
        },
        {
            title: (
                <> <GoCommentDiscussion/> Comentários  </>
            ),
            dataIndex: 'comments',
            key: 'comments'
        },
        {
            title: (
              <>
                <PiEye /> Ações
              </>
            ),
            key: 'action',
            render: (_, record) => (
              <Button onClick={() => handleVisualizarDocumento(record)}>Visualizar</Button>
            ),
        }
    ];

    const handleVisualizarDocumento = (record) => {
        if (record.tipo === "dir") {
            setCurrentPath(`${currentPath}/${record.caminho}`);
            onSearch(record.caminho);
        } else {
            setDocumentoSelecionado(record);
            setDadosDocumento(record)
            setCurrentPage('visualizar');
        }
    }

    const handleBack = () => {
        setCurrentPage('default')
        setDadosDocumento(null)
    }

    const rowSelection = {
        onChange: (selectedRowsKeys, selectedRows) => {
          setDocumentosSelecionados(selectedRows)
        },
      };

    return (

        <Content> 
            {currentPage === "default" && (
                <div>
                    <div style={{display: "flex", justifyContent: "flex-end", marginRight: "20px"}}>
                        {   documentosSelecionados.length > 0  &&
                            <Button danger icon={<FaTrash />} onClick={onDelete}> Excluir </Button>
                        }
                    </div>

                    {   docs.length !== 0 ? (
                            <Table bordered="true" className="table-lista-documentos" rowKey="id" rowSelection={rowSelection} columns={COLUNAS_TABELA_DOCUMENTOS} dataSource={docs} />
                        ) : (
                            <Empty description="Não foram encontrados documentos para o seu projeto" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        ) 
                    }
                </div>
            )}

            {currentPage === "visualizar" && (
                <React.Fragment>
                    {documentoSelecionado && (
                        <VisualizarDocumento documento={documentoSelecionado} onBack={handleBack} />
                    )}
                </React.Fragment>
            )}
        </Content>
    );
};

export default ListaDocumentos;
