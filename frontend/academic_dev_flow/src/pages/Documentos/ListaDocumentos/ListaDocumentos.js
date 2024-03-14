import { Button, Card, Empty, Table, Tabs } from "antd";
import "./ListaDocumentos.css"
import React, { useState } from "react";
import { PiEye } from "react-icons/pi";
import { Link } from "react-router-dom";
import { GoCommentDiscussion } from "react-icons/go";
import { buscarDocumentos } from "../../../api/apiGitHubService"
import { FcInfo } from "react-icons/fc";
import { MdInfo } from "react-icons/md";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";


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
    const [primeiroAcesso, setPrimeiroAcesso] = useState(true)
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


            // const decodedContent = decodeURIComponent(escape(atob(response.data)));
            // setDocumentos(decodedContent)
        } 

        setPrimeiroAcesso(false)
        setExibirDocumentos(true)


    }



    return (

        <div>

            {primeiroAcesso && <Card
                color="red"
                bordered={false}
                style={{
                    width: "100%",
                    marginBottom: "20px",
                    backgroundColor: "#00BCD4",
                    color: "#fff",
                    padding: "0 !important",


                }}
            >
                 <p> Para visualizar os documentos do seu projeto, criados no repositório do GitHub, clique no botão 'Listar Documentos'. </p>
            </Card>}

            
            {   exibirDocumentos ? 
                (<Button danger  icon={<IoClose/>} onClick={() => setExibirDocumentos(false)}> Fechar </Button>)

                : (<Button type="primary" icon={<HiOutlineClipboardDocumentList/>} onClick={() => handleGetDocumentos()}> Listar Documentos </Button>)

            }

            

            { exibirDocumentos ?

                <>
                    { documentos.length !== 0 ? 
                        <Table className="table-lista-documentos" columns={COLUNAS_TABELA_DOCUMENTOS} dataSource={documentos} />
                        :  <Empty 
                            description="Não foram encontrados documentos para o seu projeto"
                            image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    
                    }
                </>
                : null
            }



           
        </div>
    );
};

export default ListaDocumentos;
