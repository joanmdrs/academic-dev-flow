import React, { useState, useEffect } from "react";
import Titulo from "../../../../components/Titulo/Titulo";
import { Button, Modal, Space, Spin, Table } from "antd";
import { FaSearch } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import { IoDocumentOutline } from "react-icons/io5";
import FormBuscarContents from "../../components/FormBuscarContents/FormBuscarContents";
import { listContents } from "../../../../services/githubIntegration";
import { BsQuestionCircle } from "react-icons/bs";
import Aviso from "../../../../components/Aviso/Aviso";

const GerenciarContents = () => {

    const COLUNAS_TABELA_CONTENTS = [
        {
            title: "Nome",
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => (
                <Space>
                    <a  

                        href={record.url} 
                        target="blank"
                        style={{display: 'flex', alignItems: 'baseline', gap: '10px'}}
                    > 
                        <IoDocumentOutline />  
                        {record.name} 
                        <span>
                            {
                                record.exists ? 
                                <IoCheckmark color="green" />
                                : <IoCloseOutline color="red" />
                            }
                        </span> 
                        
                    </a>
                </Space>
            )
        }
    ]


    const {dadosProjeto} = useContextoGlobalProjeto()
    const [contents, setContents] = useState([])

    const [isFormBuscarVisivel, setIsFormBuscarVisivel] = useState(false)
    const [isTableVisivel, setIsTableVisivel] = useState(false)
    const [isAvisoVisivel, setIsAvisoVisivel] = useState(false)

    const handleDuvidaClick = () => {
        setIsAvisoVisivel(true);
    };

    const handleAvisoClose = () => {
        setIsAvisoVisivel(false);
    };

    const handleFiltrarContents = () => {
        setIsFormBuscarVisivel(!isFormBuscarVisivel)
    }

    const handleClearContents = () => {
        setContents([])
        setIsTableVisivel(false)
    }

    const handleGetContents = async (parametros) => {
        setIsTableVisivel(true)

        const response = await listContents(parametros)

        if (!response.error && response.data){
            setContents(response.data)
        }
    }



    
    return (
        <React.Fragment>

            {isAvisoVisivel && (
                <Aviso
                    titulo="AVISO"
                    descricao="Nesta tela, o usuário consegue filtrar pelos arquivos do repositório vinculado a este projeto. O ícone verde indica que o arquivo está vinculado a um artefato do projeto, enquanto o ícone vermelho indica que o arquivo existe apenas no repositório do GitHub.

                    O botão Sincronizar verifica os arquivos vinculadas aos artefatos e aquelas que não estão vinculadas. Em seguida, ele cria os artefatos e os vincula aos arquivos correspondentes."
                    visible={isAvisoVisivel}
                    onClose={handleAvisoClose}
                />
            )}

            <div style={{display:'flex', justifyContent: 'space-between', gap: '10px'}}> 

                <div> 
                    <Button
                        icon={<FaSearch />} 
                        type="primary"
                        onClick={handleFiltrarContents}
                    > 
                        Filtrar 
                    </Button>
                </div>

                <div style={{display: 'flex', gap: '10px'}}> 
                    <Button 
                        icon={<FaArrowsRotate />} 
                        type="primary"  
                        ghost                 
                        disabled={contents.length === 0 ? true : false}
                    > 
                        Sicronizar 
                    </Button>

                    <Button
                        icon={<BsQuestionCircle />}
                        onClick={handleDuvidaClick}           
                    />
                </div>
            </div>

            {isFormBuscarVisivel && (
                <div className="global-div" style={{width: '50%', marginLeft: '0'}}> 
                    <FormBuscarContents onSearch={handleGetContents} onClear={handleClearContents}/>
                </div>
            )}

            { isTableVisivel && (
                <Table 
                    style={{marginTop: '20px'}}
                    loading={contents.length === 0 ? true : false} 
                    rowKey="sha" 
                    columns={COLUNAS_TABELA_CONTENTS} 
                    dataSource={contents}
                />
            )

            }

        </React.Fragment>
    )
}

export default GerenciarContents;
