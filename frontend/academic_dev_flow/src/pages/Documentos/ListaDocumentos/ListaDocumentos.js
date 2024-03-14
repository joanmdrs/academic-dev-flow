import { Button, Table, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PiEye } from "react-icons/pi";
import { Link } from "react-router-dom";
import { GoCommentDiscussion } from "react-icons/go";
import { buscarDocumentos } from "../../../api/apiGitHubService"
const ListaDocumentos = () => {

    const COLUNAS_TABELA_DOCUMENTOS = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
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
              <Button>
                <Link  to={record.link}>Visualizar</Link>
              </Button>
            ),
        
          }
    ]


    const [documentos, setDocumentos] = useState([]);
    const [exibirDocumentos, setExibirDocumentos] = useState(false)

    const handleGetDocumentos = async () => {

        const response = await buscarDocumentos('docs')

        if (response.status === 200){

            const listaDocumentos = response.data

            const listaFormatada = listaDocumentos.map((item) => {

                return {
                    id: item.sha,
                    nome: item.name,
                    conteudo: item.content,
                    caminho: item.path,
                    link: item.html_url
                }
            })

            setDocumentos(listaFormatada)
            setExibirDocumentos(true)


            // const decodedContent = decodeURIComponent(escape(atob(response.data)));
            // setDocumentos(decodedContent)
        }  
    }



    return (

        <div>

            <Button onClick={() => handleGetDocumentos()}> Listar Documentos </Button>

            { exibirDocumentos && (<Table columns={COLUNAS_TABELA_DOCUMENTOS} dataSource={documentos} />)}

           
        </div>
    );
};

export default ListaDocumentos;

//  {/* Se quiser renderizar a lista de documentos */}
//  <ul>
//  {documentos.map((doc, index) => (
//      <li key={index}>
//          <strong>{doc.path}</strong>: 
//          <Markdown remarkPlugins={[remarkGfm]}>{doc.content}</Markdown>
//      </li>
//  ))}
// </ul>
