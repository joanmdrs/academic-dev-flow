import React, { useState } from "react";
import Aviso from "../../../../components/Aviso/Aviso";
import { Button, Space, Table } from "antd";
import { FaSearch } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import { BsQuestionCircle } from "react-icons/bs";
import { FaArrowRotateRight } from "react-icons/fa6";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import { Octokit } from "octokit";
import { buscarLabelPeloId, criarLabels } from "../../../../services/tarefaService";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";
import { handleError } from "../../../../services/utils";
import { NotificationManager } from "react-notifications";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";

const GerenciarLabels = () => {

    const COLUNAS_TABELA_LABELS = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => (
                <span style={{
                    backgroundColor: `#${record.color}`,
                    color: "#000", 
                    padding: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ddd"
                }}> {record.name} </span>
            )
        }, 
        {
            title: 'Descrição',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (_, record) => (
                <Space>
                    { record.exists ? 
                        <span> <IoCheckmark color="green" size="15px"/></span>
                        : <span> <IoCloseOutline color="red"  size="20px" /></span>
                    }
                </Space>
            )
        },
        
    ]

    const {dadosProjeto} = useContextoGlobalProjeto()

    const [labels, setLabels] = useState([])
    const [isAvisoVisivel, setIsAvisoVisivel] = useState(false)
    const [isTableVisivel, setIsTableVisivel] = useState(false)

    const handleDuvidaClick = () => {
        setIsAvisoVisivel(true);
    };

    const handleAvisoClose = () => {
        setIsAvisoVisivel(false);
    };

    const handleResetar = () => {
        setLabels([])
        setIsTableVisivel(false)
    }

    const handleGetLabels = async () => {
        const octokit = new Octokit({
            auth: dadosProjeto.token
        });

        const [owner, repo] = dadosProjeto.nome_repo.split("/");

        try {
            setIsTableVisivel(true);

            const response = await octokit.request('GET /repos/{owner}/{repo}/labels', {
                owner: owner,
                repo: repo
            });

            if (response.data && response.data.length > 0) {
                const resultados = await Promise.all(response.data.map(async (item) => {
                    try {
                        const resLabel = await buscarLabelPeloId(item.id);
                        const exists = resLabel.data.exists ? true : false;
                        return { ...item, exists };
                    } catch (error) {
                        console.error('Falha ao buscar o label pelo ID:', error);
                        return { ...item, exists: false };
                    }
                }));
                setLabels(resultados);
            }
        } catch (error) {
            handleError(error, ERROR_MESSAGE_ON_SEARCHING);
        }
    };


    const handleSicronizarLabels = async () => {
        const dados = labels.map((item) => {
            if (!item.exists) {
                return {
                    id_github: item.id,
                    nome: item.name,
                    cor: item.color,
                    projeto: dadosProjeto.id
                };
            }
        }).filter(Boolean);
        
        if (dados.length > 0) {
            await criarLabels(dados);
            await handleGetLabels()
            
        } else {
            NotificationManager.info('Todos os labels do repositório deste projeto já estão salvos no bando de dados.')
        }
    }

    return (
        <React.Fragment>

            {isAvisoVisivel && (
                <Aviso
                    titulo="AVISO"
                    descricao="Nesta tela, o usuário consegue listar os labels do repositório GitHub vinculado a este projeto. O ícone verde indica que o label está salvo no banco de dados, enquanto que o ícone vermelho indica que o label não está salvo no banco de dados.

                    O botão Sincronizar verifica os labels cadastrados e aqueles que não estão cadastrados. E em seguidam, ele salva os labels no bando de dados. "
                    visible={isAvisoVisivel}
                    onClose={handleAvisoClose}
                />
            )}

            <div style={{display:'flex', justifyContent: 'space-between', gap: '10px'}}> 

                <div style={{display: 'flex', gap: '10px'}}> 
                    <Button
                        icon={<FaSearch />} 
                        type="primary"
                        onClick={handleGetLabels}
                    > 
                        Filtrar 
                    </Button>
                    <Button
                        icon={<FaArrowRotateRight />} 
                        onClick={handleResetar}
                        danger
                        ghost
                    > 
                        Resetar 
                    </Button>
                </div>

                <div style={{display: 'flex', gap: '10px'}}> 
                    <Button 
                        icon={<FaArrowsRotate />} 
                        type="primary"  
                        ghost                 
                        disabled={labels.length === 0 ? true : false}
                        onClick={handleSicronizarLabels}
                    > 
                        Sicronizar 
                    </Button>

                    <Button
                        icon={<BsQuestionCircle />}
                        onClick={handleDuvidaClick}           
                    />
                </div>
            </div>


            { isTableVisivel && (
                <Table 
                    style={{marginTop: '20px'}}
                    loading={labels.length === 0 ? true : false} 
                    rowKey="sha" 
                    columns={COLUNAS_TABELA_LABELS} 
                    dataSource={labels}
                />
            )

            }

        </React.Fragment>
    )
}

export default GerenciarLabels
