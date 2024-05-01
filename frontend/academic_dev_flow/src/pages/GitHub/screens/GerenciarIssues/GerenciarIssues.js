import { Button, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { listIssues } from "../../../../services/githubIntegration/issueService";
import { sicronizarIssues } from "../../../../services/tarefaService";
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

                    <Button onClick={async () => {
                        setStateIssue('open')
                        await handleGetIssues('open')
                    }} style={{border: 'none', boxShadow: 'none'}}>Open</Button>

                    <Button onClick={async () => {
                        setStateIssue('closed')
                        await handleGetIssues('closed')
                    }} style={{border: 'none', boxShadow: 'none'}}>Closed</Button>
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
                                record.exists ? 
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

    const handleGetIssues = async (state) => {
        try {
            setClosedIssues([]);
            setOpenIssues([]);
            setIssues([]);            
    
            const parametros = {
                github_token: dadosProjeto.token,
                repository: dadosProjeto.nome_repo,
                state: state,
                projeto: dadosProjeto.id
            };
    
            const response = await listIssues(parametros);
            
            if (!response.error && response.data) {
                const openIssuesList = [];
                const closedIssuesList = [];
    
                response.data.forEach(item => {
                    const exists = item.exists ? true : false;
    
                    if (state === 'open') {
                        openIssuesList.push({ ...item, exists });
                    } else if (state === 'closed') {
                        closedIssuesList.push({ ...item, exists });
                    }
                });
                console.log(response.data)
                setIssues(response.data); 
                setOpenIssues(openIssuesList);
                setClosedIssues(closedIssuesList);
            }
        } catch (error) {
            handleError(error, "Não foi possível carregar os dados, contate o suporte!");
        }
    };
    

    const handleSicronizarIssues = async () => {
        try {
            const novasIssues = issues.filter(item => !item.exists && item.state === 'open');
    
            if (novasIssues.length > 0) {
                const dados = novasIssues.map(item => ({
                    nome: item.title,
                    descricao: item.body,
                    id_issue: item.id,
                    number_issue: item.number,
                    url_issue: item.url,
                    projeto: dadosProjeto.id,
                    membros: item.membros_ids,
                    labels: item.label_ids,
                }));

                console.log(dados)


                
                await sicronizarIssues(dados);
                await handleGetIssues('open');
                
            } else {
                NotificationManager.info('Todas as issues do repositório deste projeto já estão salvas no banco de dados.');
            }
        } catch (error) {
            return handleError(error, 'Falha ao tentar sicronizar as issues, contate o suporte!')
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (dadosProjeto) {
                await handleGetIssues(stateIssue)
            }
        }

        fetchData()
    }, [dadosProjeto])

    return (
        <React.Fragment>

            {isAvisoVisivel && (
                <Aviso
                    titulo="AVISO"
                    descricao="Nesta tela, o usuário visualiza as issues do repositório vinculado a este projeto. O ícone verde indica que a issue está vinculada a uma tarefa do projeto, enquanto o ícone vermelho indica que a issue existe apenas no repositório do GitHub.

                    O botão Sincronizar verifica as issues vinculadas às tarefas e aquelas que não estão vinculadas. Em seguida, ele cria as tarefas e as vincula às issues correspondentes."
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
                    disabled={issues.length === 0 ? true : false}
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
                dataSource={ stateIssue === 'open' ? openIssues : closedIssues}
                columns={COLUNAS_TABELA_ISSUES}
            />
        </React.Fragment>
    )
}

export default GerenciarIssues