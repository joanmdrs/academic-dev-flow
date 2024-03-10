import "./MeusProjetos.css"
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Empty, Layout, Table } from 'antd';
import MyHeader from '../../../../../../components/Header/Header';
import MenuAluno from '../../../../../../components/Menus/MenuAluno/MenuAluno'
import CustomBreadcrumb from '../../../../../../components/Breadcrumb/Breadcrumb';
import { LuCalendarCheck2, LuCalendarX2 } from "react-icons/lu";
import { TeamOutlined } from '@ant-design/icons';
import { CiCircleCheck } from "react-icons/ci";
import { TiFlowChildren } from "react-icons/ti";
import { PiEye } from "react-icons/pi";
import { buscarProjetosDoMembro, buscarQuantidadeMembrosPorProjeto } from '../../../../../../services/membroProjetoService';
import { buscarProjetoPeloId } from '../../../../../../services/projetoService';
import { buscarFluxoPeloId } from '../../../../../../services/fluxoService';
import { formatDate } from '../../../../../../services/utils';
import { decodeToken } from 'react-jwt';

const breadcrumbRoutes = [
  { title: 'Home', path: '/aluno/home' },
  { title: 'Projetos', path: '/aluno/projetos' },
];

const MeusProjetos = () => {

  const [projetos, setProjetos] = useState(null)
  const [token] = useState(localStorage.getItem("token") || null);
  const [grupo, setGrupo] = useState('')

  useEffect(() => {
      const searchData = async () => {
          try {
            await handleGetProjects()
          } catch (error) {
              console.error('Erro ao decodificar o token:', error);
          }
      };
      if (token) {
          searchData();
      }
  }, [token]);

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: (
        <>
          <CiCircleCheck style={{color: "#fffff"}} /> Status
        </>
      ),
      dataIndex: 'status',
      key: 'status'
  
    },
    {
      title: (
        <>
          <LuCalendarCheck2 /> Início
        </>
      ),
      dataIndex: 'data_inicio',
      key: 'data_inicio',
    },
    {
      title: (
        <>
          <LuCalendarX2/> Fim
        </>
      ),
      dataIndex: 'data_fim',
      key: 'data_fim',
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
      dataIndex: 'fluxo',
      key: 'fluxo'
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
          <Link to={`/aluno/projetos/visualizar/${record.idProject}`}>Visualizar</Link>
        </Button>
      ),
  
    }
  ];

  const handleDecodificarToken = async () => {

    const decoded = await decodeToken(token)
    setGrupo(decoded.groups[0])

    console.log(grupo)
  }


  const handleGetProjects = async () => {
    const decoded = await decodeToken(token);
    const response1 = await buscarProjetosDoMembro(decoded.user_id);

    const promises = response1.data.map(async (membroProjeto) => {

      const response2 = await buscarProjetoPeloId(membroProjeto.projeto)
      const response3 = await buscarQuantidadeMembrosPorProjeto(membroProjeto.projeto)
      const response4 = await buscarFluxoPeloId(response2.data.fluxo)

      return {
        id: membroProjeto.id,
        idProject: response2.data.id,
        nome: response2.data.nome,
        status: response2.data.status,
        data_inicio: formatDate(response2.data.data_inicio),
        data_fim: formatDate(response2.data.data_fim),
        qtd_membros: response3.data.quantidade_membros,
        fluxo: response4.data.nome
      }
    })

    const resultados = (await Promise.all(promises))
    setProjetos(resultados)
    
  }


  return (
    <React.Fragment>
            <MenuAluno />
            <Layout>
                <MyHeader />
                <CustomBreadcrumb routes={breadcrumbRoutes} />
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
                    )}
                      
                    </div>
                    
                </div>
            </Layout>
    </React.Fragment>
    
  );
};

export default MeusProjetos;