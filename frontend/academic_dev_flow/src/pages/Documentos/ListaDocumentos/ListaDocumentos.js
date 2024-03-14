import { Button, Empty, Table } from "antd";
import "./ListaDocumentos.css"
import React, { useState } from "react";
import { PiEye } from "react-icons/pi";
import { Link } from "react-router-dom";
import { GoCommentDiscussion } from "react-icons/go";
import { buscarDocumentos } from "../../../api/apiGitHubService";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoDocumentOutline } from "react-icons/io5";
import { FcFolder } from "react-icons/fc";
import VisualizarDocumento from "../VisualizarDocumento/VisualizarDocumento";

const ListaDocumentos = () => {
    const [documentos, setDocumentos] = useState([]);
    const [exibirDocumentos, setExibirDocumentos] = useState(false);
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
            handleGetDocumentos(record.caminho);
        } else {
            setDocumentoSelecionado(record);
            setCurrentPage('visualizar');
        }
    }

    const handleGetDocumentos = async (path) => {
        const response = await buscarDocumentos(path);

        if (response.status === 200){
            const listaDocumentos = response.data

            console.log(listaDocumentos)
            const listaFormatada = listaDocumentos.map((item) => ({
                id: item.sha,
                nome: item.name,
                caminho: item.path,
                tipo: item.type,
                link: item.html_url
            }));

            setDocumentos(listaFormatada);
        } 

        setExibirDocumentos(true);
    };

    return (

        <div> 

            {currentPage === "default" && (

                <React.Fragment>
                    <div style={{marginBottom: "20px"}}> 
                        {exibirDocumentos ? (
                            <Button danger icon={<IoCloseCircleOutline/>} onClick={() => setExibirDocumentos(false)}> Fechar </Button>
                        ) : (
                            <Button type="primary" icon={<HiOutlineClipboardDocumentList/>} onClick={() => handleGetDocumentos(currentPath)}> Listar Documentos </Button>
                        )}
                    </div>

                    <div>
                        {exibirDocumentos && documentos.length !== 0 ? (
                            <Table bordered="true" className="table-lista-documentos" columns={COLUNAS_TABELA_DOCUMENTOS} dataSource={documentos} />
                        ) : exibirDocumentos ? (
                            <Empty description="Não foram encontrados documentos para o seu projeto" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        ) : null}

                    </div>
                    
                   
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

export default ListaDocumentos;
