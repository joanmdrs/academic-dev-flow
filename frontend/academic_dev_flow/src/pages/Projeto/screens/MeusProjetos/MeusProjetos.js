import "./MeusProjetos.css"
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Empty, Space, Table } from 'antd';
import { LuCalendarCheck2, LuCalendarX2 } from "react-icons/lu";
import { TeamOutlined } from '@ant-design/icons';
import { CiCircleCheck } from "react-icons/ci";
import { TiFlowChildren } from "react-icons/ti";
import { PiEye } from "react-icons/pi";
import { decodeToken } from 'react-jwt';
import { buscarProjetosDoMembro } from "../../../../services/membroProjetoService";
import { optionsStatusProjetos } from "../../../../services/optionsStatus";
import { formatDate, handleError } from "../../../../services/utils";

const MeusProjetos = ({grupo}) => {

    const columns = [
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
            render: (_, record) => (
                <Link to={`/${grupo}/projetos/visualizar/${record.id}`}>{record.nome}</Link>
            )
        },
        {
            title: (
                <> 
                    <CiCircleCheck style={{color: "#fffff"}} /> Status
                </>
            ),
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => (
                <span>
                    {optionsStatusProjetos.find(status => status.value === record.status)?.label}
                </span>
            )
        },
        {
            title: (
                <>
                <LuCalendarCheck2 /> Início
                </>
            ),
            dataIndex: 'data_inicio',
            key: 'data_inicio',
            render: (_, record) => (
                <Space>
                    {formatDate(record.data_inicio)}
                </Space>
            )
        },
        {
            title: (
                <>
                <LuCalendarX2/> Fim
                </>
            ),
            dataIndex: 'data_fim',
            key: 'data_fim',
            render: (_, record) => (
                <Space>
                    {formatDate(record.data_fim)}
                </Space>
            )
        },
        {
            title: (
                <>
                <TeamOutlined /> Qtd. Membros
                </>
            ),
            dataIndex: 'qtd_membros',
            key: 'qtd_membros',
            align: 'center'
        },
        {
            title: (
                <>
                <TiFlowChildren/> Fluxo
                </>
            ),
            dataIndex: 'fluxo_nome',
            key: 'fluxo_nome'
        },
    ];

    const [projetos, setProjetos] = useState(null)
    const [token] = useState(localStorage.getItem("token") || null);
    
    useEffect(() => {
        const searchData = async () => {
            try {
                await handleGetProjects()
            } catch (error) {
                return handleError(error, 'Falha ao tentar buscar os dados dos projetos, contate o suporte!')
            }
        };
        if (token) {
            searchData();
        }
    }, [token]);

    const handleGetProjects = async () => {
        const decodedToken = await decodeToken(token);
        const response = await buscarProjetosDoMembro(decodedToken.user_id)

        if (!response.error) {
            setProjetos(response.data)
        }
        
    }

    return (
        <div className="projects-section-layout">
            <div className='projects-section-title'>
                <h2> Meus Projetos </h2>  
            </div>
            <div className='projects-section-content'> 
                {
                    projetos !== null ? (
                        <Table
                            className='meus-projetos-table'
                            dataSource={projetos}
                            columns={columns}
                        />
                    ) : (
                        <Empty 
                            description="Não há projetos para exibir"
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            style={{
                            display: 'flex',
                            width: "100%",
                            height: "100%",
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            }}
                        >
                        </Empty>
                    )
                }
                
            </div>
            
        </div>
    
  );
};

export default MeusProjetos;