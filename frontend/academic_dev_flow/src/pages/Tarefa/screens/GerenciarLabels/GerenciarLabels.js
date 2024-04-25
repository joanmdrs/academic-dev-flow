import React, { useEffect, useState } from "react";
import Titulo from "../../../../components/Titulo/Titulo";
import { Button, Space, Table, Tag } from "antd";
import { FaPlus, FaSearch } from "react-icons/fa";
import SelecionarProjeto from "../../components/SelecionarProjeto/SelecionarProjeto";
import { useContextoTarefa } from "../../context/ContextoTarefa";
import { Octokit } from "octokit";
import { handleError } from "../../../../services/utils";
import { buscarLabelPeloId, cadastrarLabels } from "../../../../services/tarefaService";
import { IoCheckmark, IoCloseOutline } from "react-icons/io5";
import { FaArrowsRotate } from "react-icons/fa6";
import { NotificationManager } from "react-notifications";


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
                    padding: "10px",
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
                    { record.existe ? 
                        <span> <IoCheckmark color="green" size="15px"/></span>
                        : <span> <IoCloseOutline color="red"  size="20px" /></span>
                    }
                </Space>
            )
        },
        
    ]

    const {dadosProjeto, setDadosProjeto} = useContextoTarefa()
    const [dadosLabels, setDadosLabels] = useState([])

    const handleGetLabels = async () => {
        const octokit = new Octokit({
            auth: dadosProjeto.token
        });

        const [owner, repo] = dadosProjeto.nome_repo.split("/");

          
        try {
            const response = await octokit.request('GET /repos/:owner/:repo/labels', {
                owner: owner,
                repo: repo
            });
            
            if (response.data && response.data.length > 0) {

                const resultados = await Promise.all(response.data.map(async (item) => {
                    const resLabel = await buscarLabelPeloId(item.id)                    
                    const existe = resLabel.data.exists ? true : false
                    return {...item, existe}
                }))
                setDadosLabels(resultados)    
            }
        } catch (error) {
            return handleError(error, "Não foi possível carregar os dados, contate o suporte!")
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (dadosProjeto) {
                await handleGetLabels()
            }
        }

        fetchData()
    }, [dadosProjeto])

    const handleSicronizarLabels = async () => {
        const dados = dadosLabels.map((item) => {
            if (!item.existe) {
                return {
                    id_github: item.id,
                    nome: item.name,
                    cor: item.color,
                    projeto: dadosProjeto.id
                };
            }
        }).filter(Boolean);
        
        if (dados.length > 0) {
            await cadastrarLabels(dados);
            await handleGetLabels()
            
        } else {
            NotificationManager.info('Todos os labels do repositório deste projeto já estão salvos no bando de dados.')
        }
    }

    return (

        <React.Fragment>
            <Titulo 
                titulo='Labels'
                paragrafo='Labels > Gerenciar labels'
            />

            <div className="global-div" style={{
                width: "50%"
            }}> 
                <SelecionarProjeto />
            </div>
            
            {
                dadosProjeto !== null && dadosLabels.length > 0 ?
                (
                    <div className="global-div"> 
                        <Button 
                            icon={<FaArrowsRotate />} 
                            style={{marginBottom: '20px'}} 
                            type="primary" ghost
                            onClick={handleSicronizarLabels}
                        > 
                            Sicronizar 
                        </Button>
                        <Table 
                            rowKey="id"
                            bordered
                            dataSource={dadosLabels}
                            columns={COLUNAS_TABELA_LABELS}
                        />
                    </div>
                ) : null
            }

        </React.Fragment>
    )
}

export default GerenciarLabels