import React, { useEffect, useState } from "react";
import FormDocumento from "./FormDocumento/FormDocumento";
import { Button, Modal } from "antd";
import { IoAdd, IoCloseCircleOutline } from "react-icons/io5";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { buscarDocumentos } from "../../api/apiGitHubService";
import { useProjetoContext } from "../../context/ContextoGlobalProjeto";
import { atualizarDocumento, criarDocumento, excluirDocumentos, filtrarDocumentosPorProjeto } from "../../services/documentoService";
import ListContents from "./GitHub/ListContents/ListContents";
import ListaDocumentos from "./ListaDocumentos/ListaDocumentos";

const GerenciarDocumentos = () => {  

    const {
        dadosProjeto, 
        dadosDocumento, 
        setDadosDocumento, 
        documentosSelecionados,
        setDocumentosSelecionados
    } = useProjetoContext()
    const [acaoForm, setAcaoForm] = useState('create')
    const [exibirForm, setExibirForm] = useState(false)
    const [exibirContents, setExibirContents] = useState(false)
    const [contents, setContents] = useState([])
    const [exibirDocs, setExibirDocs] = useState(true)
    const [docs, setDocs] = useState([])
    const defaultPath = "docs"

    const handleFilterDocs = async () => {
        const response = await filtrarDocumentosPorProjeto(dadosProjeto.id)

        if (response.status === 200){
            setDocs(response.data)
        }   
    }

    useEffect(() => {
        const fetchData = async () => {
            if(dadosProjeto !== null) {
                await handleFilterDocs()
            }
        }

        fetchData()
        
    }, [dadosProjeto])

    const handleCreateDoc = () => {
        setAcaoForm('create')
        setExibirForm(true)
        setExibirContents(false)
        setExibirDocs(false)
    }

    const handleUpdateDoc = (record) => {
        setAcaoForm('update')
        setExibirForm(true)
        setExibirContents(false)
        setExibirDocs(false)
        setDadosDocumento(record)
    }

    const handleReload = async () => {
        setAcaoForm('create')
        setExibirForm(false)
        setExibirContents(false)
        setExibirDocs(true)
        setDadosDocumento(null)
        await handleFilterDocs()
    }

    const handleSaveDoc = async (dados) => {
        dados['projeto'] = dadosProjeto.id

        if (acaoForm === 'create'){
            await criarDocumento(dados)
        } else if (acaoForm === 'update'){
            await atualizarDocumento(dadosDocumento.id, dados)
        }
        handleReload()
    }

    const handleDeleteDoc = async () => {

        if (documentosSelecionados !== null) {
            const ids = documentosSelecionados.map((item) => item.id)
            await excluirDocumentos(ids)
            setDocumentosSelecionados([])
        } 
        handleReload()
      }
  
    const handleConfirmDelete = () => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Tem certeza que deseja excluir o(s) documento(s) ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () =>  await handleDeleteDoc()
        });
    };

     // Esta função busca os documentos do repositório
     const handleGetContents = async (path) => {
        const response = await buscarDocumentos(path);

        if (response.status === 200){
            const listaDocumentos = response.data
            const listaFormatada = listaDocumentos.map((item) => ({
                id: item.sha,
                titulo: item.name,
                caminho: item.path,
                tipo: item.type,
                link: item.html_url
            }));
            setContents(listaFormatada);
        } 
        setExibirContents(true);
    };

    return (

        <div> 

            <div style={{display: "flex", gap: "10px"}}> 
                {exibirContents ? (
                    <Button type="primary" danger icon={<IoCloseCircleOutline/>} onClick={() => setExibirContents(false)}> Fechar </Button>
                ) : (
                    <Button icon={<HiOutlineClipboardDocumentList/>} onClick={() => handleGetContents(defaultPath)}> Listar documentos do GitHub </Button>
                )}

                { !exibirForm && <Button icon={<IoAdd />} onClick={() => handleCreateDoc()}> Adicionar Documento </Button> }
                
            </div>

            { exibirContents && <ListContents contents={contents} onSearchDocs={handleGetContents} /> }

            { exibirForm && <FormDocumento onSubmit={handleSaveDoc} onCancel={handleReload}/> }

            { exibirDocs && <ListaDocumentos docs={docs} onSearch={handleGetContents} onEdit={handleUpdateDoc} onDelete={handleConfirmDelete}/>}

        </div>
    )
}

export default GerenciarDocumentos