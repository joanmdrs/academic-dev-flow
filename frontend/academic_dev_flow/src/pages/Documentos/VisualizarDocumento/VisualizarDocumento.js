import React, { useEffect, useState } from "react";
import "./VisualizarDocumento.css"
import { buscarDocumentos } from "../../../api/apiGitHubService";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import { Button } from "antd";
import BotaoVoltar from "../../../components/Botoes/BotaoVoltar/BotaoVoltar";
import Loading from "../../../components/Loading/Loading";

const VisualizarDocumento = ({ documento, onBack }) => {

    const [decodedDoc, setDecodedDoc] = useState('');
    const [loading, setLoading] = useState(true)

    const handleGetDocumento = async (path) => {

        const response = await buscarDocumentos(path)

        if (response.status === 200) {
            const decodedContent = decodeURIComponent(escape(atob(response.data.content)));
            setDecodedDoc(decodedContent);
        }

    }

    useEffect(() => {
        const fetchData = async () => {

            if (documento) {
                await handleGetDocumento(documento.caminho)
            }
            setLoading(false)
        }

        fetchData()

    }, [])

    if (loading) {
        return <Loading />
    }

    return (
        <React.Fragment>
            {documento && 
                <div className="global-form">

                    <BotaoVoltar funcao={onBack} />
                    <Markdown className="conteudo-markdown" remarkPlugins={[remarkGfm]}>{decodedDoc}</Markdown>
                </div>
            }
        </React.Fragment>
    );
}

export default VisualizarDocumento;
