import { Button, Space, Table } from "antd";
import React, { useState } from "react";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
import { sicronizarIssues } from "../../../../services/tarefaService";
import { handleError } from "../../../../services/utils";
import { NotificationManager } from "react-notifications";
import { FaArrowRotateRight, FaArrowsRotate } from "react-icons/fa6";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { listIssues } from "../../../../services/githubIntegration/issueService";
import Titulo from "../../../../components/Titulo/Titulo";
import FormFilterIssues from "../../components/FormFilterIssues/FormFilterIssues";

const AdminIssues = () => {

    const COLUNAS_TABELA_ISSUES = [
        {
            title: 'Issue', 
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
    const {dadosProjeto} = useContextoGlobalProjeto();
    const [isFormVisivel, setIsFormVisivel] = useState(true)
    const [isTableVisivel, setIsTableVisivel] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [state, setState] = useState(null)

    const handleResetar = () => {
        setIsTableVisivel(false)
        setIssues([])
        setIsFormVisivel(false)
    }

    const handleGetIssues = async (dados) => {
        try {

            if (!dadosProjeto.token && !dadosProjeto.nome_repo){
                NotificationManager.info('O projeto selecionado não possui repositório GitHub configurado !')
                return {'error': 'O projeto selecionado não possui repositório GitHub configurado !'}
            }

            setIsLoading(true)
            setIsTableVisivel(true)
            setIssues([]);  
            setState(dados.state)
    
            const parametros = {
                github_token: dadosProjeto.token,
                repository: dadosProjeto.nome_repo,
                state: dados.state,
                projeto: dadosProjeto.id
            };
    
            const response = await listIssues(parametros);
            
            if (!response.error && response.data) {
    
                setIssues(response.data); 
            }
            setIsLoading(false)
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
                }));

               
                await sicronizarIssues(dados);
                await handleGetIssues({
                    state: state
                })
                
            } else {
                NotificationManager.info('Todas as issues abertas do repositório deste projeto já estão salvas no banco de dados.');
            }
        } catch (error) {
            return handleError(error, 'Falha ao tentar sicronizar as issues, contate o suporte!')
        }
    }

    return (
        <React.Fragment>

            <Titulo 
                titulo="Issues"
                paragrafo="Issues > Gerenciar Issues"
            />

            <div style={{display:'flex', justifyContent: 'space-between', margin: '20px'}}> 

                <div style={{display: 'flex', gap: '10px'}}> 
                    <Button 
                        type="primary"
                        icon={<FaFilter />}
                        onClick={() => setIsFormVisivel(!isFormVisivel)}
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

                {/* <div style={{display:'flex', gap: '10px'}}> 
                    <Button 
                        icon={<FaArrowsRotate />} 
                        style={{marginBottom: '20px'}} 
                        type="primary" ghost
                        onClick={handleSicronizarIssues}
                        disabled={issues.length === 0 ? true : false}
                    > 
                        Sicronizar 
                    </Button>
                </div> */}
            </div>

            { isFormVisivel && (
                <div className="global-div" style={{width: '50%'}}>
                    <FormFilterIssues onSearch={handleGetIssues} />
                </div>
            )}

            {isTableVisivel &&
                <div className="global-div"> 
                    <Table
                        loading={isLoading}
                        rowKey="id"
                        dataSource={issues}
                        columns={COLUNAS_TABELA_ISSUES}
                    /> 
                </div> 
            }

        </React.Fragment>
    )
}

export default AdminIssues