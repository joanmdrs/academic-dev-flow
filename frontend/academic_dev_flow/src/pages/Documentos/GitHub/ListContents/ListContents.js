import { Button, Empty, Table } from "antd";
import "./ListContents.css"
import React, { useState } from "react";
import { PiEye } from "react-icons/pi";
import { GoCommentDiscussion } from "react-icons/go";
import { IoDocumentOutline } from "react-icons/io5";
import { FcFolder } from "react-icons/fc";
import VisualizarDocumento from "../../VisualizarDocumento/VisualizarDocumento";

const ListContents = ({docs, onSearchDocs}) => {
    const [currentPage, setCurrentPage] = useState('default')
    const [documentoSelecionado, setDocumentoSelecionado] = useState(null);
    const [currentPath, setCurrentPath] = useState('docs');

    const COLUNAS_TABELA_DOCUMENTOS = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            render: (_, record) => (
                <span style={{display: "flex", justifyContent: "baseline", gap: "10px"}}> 
                    {record.tipo === "file" ? <IoDocumentOutline size="20px" /> : <FcFolder size="20px"/> }

                    {record.nome}
                </span>
            ),
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
            setCurrentPath(`${currentPath}/${record.nome}`);
            onSearchDocs(record.caminho);
        } else {
            setDocumentoSelecionado(record);
            setCurrentPage('visualizar');
        }
    }

    return (

        <div> 

            {currentPage === "default" && (

                <React.Fragment>

                    {
                        docs.length !== 0 ? (
                            <Table bordered="true" className="table-lista-documentos" columns={COLUNAS_TABELA_DOCUMENTOS} dataSource={docs} />
                        ) : (
                            <Empty description="Não foram encontrados documentos para o seu projeto" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        ) 
                    }

                </React.Fragment>
            )}

            {currentPage === "visualizar" && (
                <React.Fragment>
                    {documentoSelecionado && (
                        <VisualizarDocumento documento={documentoSelecionado} onBack={()=> setCurrentPage('default')} />
                    )}
                </React.Fragment>
            )}
                
        </div>
    );
};

export default ListContents;
