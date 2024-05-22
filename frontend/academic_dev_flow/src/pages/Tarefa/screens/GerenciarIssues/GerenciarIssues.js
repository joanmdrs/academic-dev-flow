import React, { useEffect, useState } from "react";
import Titulo from "../../../../components/Titulo/Titulo";
import SelecionarProjeto from "../../components/SelecionarProjeto/SelecionarProjeto";
import { FaArrowsRotate } from "react-icons/fa6";
import { Button, Space, Table } from "antd";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import { listIssues } from "../../../../services/githubIntegration/issueService";
import { NotificationManager } from "react-notifications";
import { sicronizarIssues, verificarExistenciaIssue } from "../../../../services/tarefaService";
import { handleError } from "../../../../services/utils";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";

const GerenciarIssues = () => {

    const COLUNAS_TABELA_ISSUES = [
        {
            title: "Issue",
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: "Número",
            dataIndex: 'number',
            key: 'number'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (_, record) => (
                <Space>
                    { record.existe ? 
                        <span> <IoCheckmark color="green" size="15px"/></span>
                        : <span> <IoCloseOutline color="red"  size="20px" /></span>
                    }
                </Space>
            )
        },
    ]

    const [issues, setIssues] = useState([]);
    const {dadosProjeto} = useContextoGlobalProjeto();

    const handleGetIssues = async () => {

        try {
            const parametros = {
                github_token: dadosProjeto.token,
                repository: dadosProjeto.nome_repo
            }
            const response = await listIssues(parametros)
    
            if (!response.error && response.data){
                const dados = await Promise.all(response.data.map(async (item) => {
                    const resTarefa = await verificarExistenciaIssue(item.id)
                    const existe = resTarefa.data.exists ? true : false
                    return {...item, existe}
                }))
    
                const resultado = await Promise.resolve(dados)
                setIssues(resultado)
            }
            
        } catch (error) {
            return handleError(error, "Não foi possível carregar os dados, contate o suporte!")
        }
    }

    const handleSicronizarIssues = async () => {
        const dados = issues.map((item) => {
            if (!item.existe) {
                return {
                    nome: item.title,
                    descricao: item.body,
                    id_issue: item.id,
                    number_issue: item.number,
                    url_issue: item.url,
                    projeto: dadosProjeto.id,
                };
            }
        }).filter(Boolean);
        
        if (dados) {
            console.log(dados)
            // await sicronizarIssues(dados);
            // await handleGetIssues()
            
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
            <Titulo
                titulo='Issues'
                paragrafo={'Issues > Gerenciar Issues'}
            />

            <div className="global-div" style={{
                width: "50%"
            }}> 
                <SelecionarProjeto />
            </div>

            {
                dadosProjeto !== null && issues.length > 0 ?
                (
                    <div className="global-div"> 
                        <Button 
                            icon={<FaArrowsRotate />} 
                            style={{marginBottom: '20px'}} 
                            type="primary" ghost
                            onClick={handleSicronizarIssues}
                        > 
                            Sicronizar 
                        </Button>
                        <Table 
                            rowKey="id"
                            bordered
                            dataSource={issues}
                            columns={COLUNAS_TABELA_ISSUES}
                        />
                    </div>
                ) : null
            }
        </React.Fragment>
    )
}

export default GerenciarIssues