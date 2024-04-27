import React, { useEffect, useState } from "react";
import Titulo from "../../../../components/Titulo/Titulo";
import SelecionarProjeto from "../../components/SelecionarProjeto/SelecionarProjeto";
import { useContextoTarefa } from "../../context/ContextoTarefa";
import { FaArrowsRotate } from "react-icons/fa6";
import { Button, Space, Table } from "antd";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import { listIssues } from "../../../../services/githubIntegration/issueService";
import { NotificationManager } from "react-notifications";
import { verificarExistenciaIssue } from "../../../../services/tarefaService";
import { handleError } from "../../../../services/utils";

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

    

    const [issues, setIssues] = useState([]);
    const {dadosProjeto} = useContextoTarefa();

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