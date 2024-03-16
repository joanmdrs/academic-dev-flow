import React, { useState } from "react";
import FormDocumento from "./FormDocumento/FormDocumento";
import ListaDocumentos from "./ListaDocumentos/ListaDocumentos";
import { Button } from "antd";
import { IoAdd, IoAddCircle, IoCloseCircleOutline } from "react-icons/io5";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { buscarDocumentos } from "../../api/apiGitHubService";

const GerenciarDocumentos = () => {

    const [exibirForm, setExibirForm] = useState(false)
    const [exibirDocs, setExibirDocs] = useState(false)
    const [docs, setDocs] = useState([])
    const defaultPath = "docs"

    const handleAddDoc = () => {
        setExibirForm(true)
        setExibirDocs(false)
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

            setDocs(listaFormatada);
        } 

        setExibirDocs(true);
    };

    return (

        <div> 

            <div style={{display: "flex", gap: "10px"}}> 
                {exibirDocs ? (
                    <Button type="primary" danger icon={<IoCloseCircleOutline/>} onClick={() => setExibirDocs(false)}> Fechar </Button>
                ) : (
                    <Button icon={<HiOutlineClipboardDocumentList/>} onClick={() => handleGetDocumentos(defaultPath)}> Listar documentos do GitHub </Button>
                )}

                <Button icon={<IoAdd />} onClick={() => handleAddDoc()}> Adicionar Documento </Button>

            </div>

            {
                exibirDocs && <ListaDocumentos docs={docs} />
            }

            {
                exibirForm && <FormDocumento />
            }

        </div>
    )
}

export default GerenciarDocumentos