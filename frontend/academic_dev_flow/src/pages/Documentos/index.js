import React, { useState } from "react";
import FormDocumento from "./FormDocumento/FormDocumento";
import { Button } from "antd";
import { IoAdd, IoCloseCircleOutline } from "react-icons/io5";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { buscarDocumentos } from "../../api/apiGitHubService";
import { useProjetoContext } from "../../context/ProjetoContext";
import { atualizarDocumento, criarDocumento } from "../../services/documentoService";
import ListaDocumentos from "./GitHub/ListContents/ListContents";

const GerenciarDocumentos = () => {

    const {dadosProjeto} = useProjetoContext()
    const [exibirForm, setExibirForm] = useState(false)
    const [exibirDocs, setExibirDocs] = useState(false)
    const [docs, setDocs] = useState([])
    const [acaoForm, setAcaoForm] = useState('create')
    const defaultPath = "docs"

    const handleAddDoc = () => {
        setAcaoForm('create')
        setExibirForm(true)
        setExibirDocs(false)
    }

    const handleReload = async () => {
        setAcaoForm('create')
        setExibirForm(false)
        setExibirDocs(false)
    }

    // Esta função busca os documentos do repositório
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
            setDocs(listaFormatada);
        } 
        setExibirDocs(true);
    };

    const handleSaveDocumento = async (dados) => {
        dados['projeto'] = dadosProjeto.id

        if (acaoForm === 'create'){
            await criarDocumento(dados)
        } else if (acaoForm === 'update'){
            await atualizarDocumento(dadosProjeto.id, dados)
        }
        handleReload()
    }

    return (

        <div> 

            <div style={{display: "flex", gap: "10px"}}> 
                {exibirDocs ? (
                    <Button type="primary" danger icon={<IoCloseCircleOutline/>} onClick={() => setExibirDocs(false)}> Fechar </Button>
                ) : (
                    <Button icon={<HiOutlineClipboardDocumentList/>} onClick={() => handleGetDocumentos(defaultPath)}> Listar documentos do GitHub </Button>
                )}

                { !exibirForm && <Button icon={<IoAdd />} onClick={() => handleAddDoc()}> Adicionar Documento </Button> }
                
            </div>

            { exibirDocs && <ListaDocumentos docs={docs} /> }

            { exibirForm && <FormDocumento onSubmit={handleSaveDocumento} onCancel={handleReload}/> }

        </div>
    )
}

export default GerenciarDocumentos