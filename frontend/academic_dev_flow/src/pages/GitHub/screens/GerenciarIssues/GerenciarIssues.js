import { Button, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { listIssues } from "../../../../services/githubIntegration/issueService";
import { sicronizarIssues, verificarExistenciaIssue } from "../../../../services/tarefaService";
import { handleError } from "../../../../services/utils";
import { NotificationManager } from "react-notifications";
import { FaArrowsRotate } from "react-icons/fa6";
import { BsQuestionCircle } from "react-icons/bs";
import Aviso from "../../../../components/Aviso/Aviso";

const GerenciarIssues = () => {

    const COLUNAS_TABELA_ISSUES = [
        {
            title: ( 
                <div style={{ display: 'flex'}}>
                    <Button onClick={() => setStateIssue('open')} style={{border: 'none', boxShadow: 'none'}}>Open</Button>
                    <Button onClick={() => setStateIssue('closed')} style={{border: 'none', boxShadow: 'none'}}>Closed</Button>
                </div>
            ),
            dataIndex: 'title',
            key: 'title',
            render: (_, record) => (
                <Space style={{display: 'block'}}>
                    <a href={record.url} target="blank"> 
                        {record.title}
                        <span>
                            {
                                record.existe ? 
                                <IoCheckmark color="green" />
                                : <IoCloseOutline color="red" />
                            }
                        </span> 
                    </a>
                    <span style={{fontSize: '10px'}}> #{record.number} </span>
                </Space>
            )
        },
    ]

    const [issues, setIssues] = useState([]);
    const [openIssues, setOpenIssues] = useState([])
    const [closedIssues, setClosedIssues] = useState([])
    const {dadosProjeto} = useContextoGlobalProjeto();
    const [isAvisoVisivel, setIsAvisoVisivel] = useState(false)
    const [stateIssue, setStateIssue] = useState('open')

    const handleDuvidaClick = () => {
        setIsAvisoVisivel(true);
    };

    const handleAvisoClose = () => {
        setIsAvisoVisivel(false);
    };

    const handleGetIssues = async () => {
        try {
            const parametros = {
                github_token: dadosProjeto.token,
                repository: dadosProjeto.nome_repo
            };
    
            const response = await listIssues(parametros);
            
            if (!response.error && response.data) {
                const openIssues = [];
                const closedIssues = [];
    
                await Promise.all(response.data.map(async (item) => {
                    const resTarefa = await verificarExistenciaIssue(item.id);
                    const existe = resTarefa.data.exists ? true : false;
                    
                    if (item.state === 'open') {
                        openIssues.push({ ...item, existe });
                    } else if (item.state === 'closed') {
                        closedIssues.push({ ...item, existe });
                    }
                }));
                console.log(response.data)
    
                setIssues(response.data); // Se precisar de todas as issues em uma variável
    
                setOpenIssues(openIssues);
                setClosedIssues(closedIssues);
            }
        } catch (error) {
            handleError(error, "Não foi possível carregar os dados, contate o suporte!");
        }
    };
    

    const handleSicronizarIssues = async () => {
        const dados = issues.map((item) => {
            if (!item.existe) {
                return {
                    nome: item.title,
                    descricao: item.body,
                    id_issue: item.id,
                    number_issue: item.number,
                    url_issue: item.url,
                    projeto: dadosProjeto.id
                };
            }
        }).filter(Boolean);
        
        if (dados) {
            await sicronizarIssues(dados);
            await handleGetIssues()
            
        } else {
            NotificationManager.info('Todos as issues do repositório deste projeto já estão salvos no bando de dados.')
        }
    }


    useEffect(() => {
        const fetchData = async () => {
            if (dadosProjeto) {
                await handleGetIssues()
            }
        }

        fetchData()
    }, [dadosProjeto])

    return (
        <React.Fragment>

            {isAvisoVisivel && (
                <Aviso
                    titulo="AVISO"
                    descricao="Nesta tela, o usuário visualizará as issues do repositório vinculado a este projeto. A coluna de status da tabela indica que o ícone de cor verde significa que a issue está vinculada a uma tarefa, enquanto o ícone de cor vermelho indica que não está vinculada."
                    visible={isAvisoVisivel}
                    onClose={handleAvisoClose}
                />
            )}

            <div style={{display:'flex', justifyContent: 'flex-end', gap: '10px'}}> 

                <Button 
                    icon={<FaArrowsRotate />} 
                    style={{marginBottom: '20px'}} 
                    type="primary" ghost
                    onClick={handleSicronizarIssues}
                > 
                    Sicronizar 
                </Button>

                <Button
                    icon={<BsQuestionCircle />}
                    onClick={handleDuvidaClick}
                   
            
                />
            </div>

            <Table
                loading={ issues.length === 0 ? true : false}
                rowKey="id"
                bordered
                dataSource={ stateIssue === 'open' ? openIssues : closedIssues}
                columns={COLUNAS_TABELA_ISSUES}
            />
        </React.Fragment>
    )
}

export default GerenciarIssues