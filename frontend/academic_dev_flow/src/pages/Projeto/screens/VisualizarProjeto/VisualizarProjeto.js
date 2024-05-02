import React, { useEffect, useState } from "react";
import "./VisualizarProjeto.css"
import { Button, Layout, Tabs } from "antd";
import { IoDocumentTextOutline } from "react-icons/io5";
import { GoTasklist } from "react-icons/go";
import { useParams } from "react-router-dom";
import { LuCalendarClock } from "react-icons/lu";
import { FaGithub } from "react-icons/fa6";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { buscarProjetoPeloId } from "../../../../services/projetoService";
import Loading from "../../../../components/Loading/Loading";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../../../components/Menus/MenuProfessor/MenuProfessor";
import MyHeader from "../../../../components/Header/Header";
import CustomBreadcrumb from "../../../../components/Breadcrumb/Breadcrumb";
import CronogramaIteracoes from "../../../Iteracao/screens/CronogramaIteracoes.js/CronogramaIteracoes";
import ScreenCronogramaIteracoes from "../../../Iteracao/screens/CronogramaIteracoes.js";
import ScreenQuadroTarefas from "../../../Tarefa/screens/QuadroTarefas/index.js";
import ScreenPainelArtefatos from "../../../Artefato/screens/PainelArtefatos/index.js";
import ScreenPainelGihtub from "../../../GitHub/screens/PainelGithub/index.js";

const {TabPane} = Tabs
const VisualizarProjeto = ({grupo}) => {

    const { idProjeto } = useParams();
    const { setDadosProjeto } = useContextoGlobalProjeto()
    const [projeto, setProjeto] = useState(null)
    const [currentPage, setCurrentPage] = useState('default')
    const [loading, setLoading] = useState(true)

    const breadcrumbRoutes = [
        { title: 'Home', path: `/${grupo}/home` },
        { title: 'Projetos', path: `/${grupo}/projetos`  },
        { title: 'Visualizar', path: `/${grupo}/projetos/visualizar` }
    ];

    const handleGetProject = async () => {
        const response1 = await buscarProjetoPeloId(idProjeto);
        setProjeto(response1.data);
        setDadosProjeto(response1.data)
    }

    useEffect(() => {
        const fetchData = async () => {
            if (idProjeto) {
                await handleGetProject()
            }

            setLoading(false)
        };
    
        fetchData(); 
    
    }, [idProjeto, loading]);

    
    if (loading) {
        return <Loading />
    }

    return (
        <React.Fragment>

            {grupo === 'aluno' && <MenuAluno />}
            {grupo === 'professor' && <MenuProfessor />}
            
            <Layout>
                <MyHeader />
                <CustomBreadcrumb routes={breadcrumbRoutes} />
                <div className="screen-view-project">

                    <div className="title"> 
                        { 
                            projeto !== null ? (
                                <h4>{projeto.nome} </h4>
                            ) : null
                        }
                        
                    </div>

                    <div className="content"> 
                        <Tabs
                           style={{width: '100%', padding: '2%'}}

                        >
                             <TabPane tab='Projeto' key="1">
                                Conteúdo da Outra Tab
                            </TabPane>

                            <TabPane tab='Iterações' key="2" icon={<LuCalendarClock />}>
                                <ScreenCronogramaIteracoes />
                            </TabPane>

                            <TabPane tab='Tarefas' key="3" icon={<GoTasklist />} >
                                <ScreenQuadroTarefas />
                            </TabPane>

                            <TabPane tab='Artefatos' key="4" icon={<IoDocumentTextOutline />}>
                                <ScreenPainelArtefatos />
                            </TabPane>

                            <TabPane tab='GitHub' key="5" icon={<FaGithub />}>
                                <ScreenPainelGihtub />
                            </TabPane>

                            <TabPane tab='Membros' key="6" icon={<MdOutlinePeopleAlt />}>
                                
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            </Layout>
        </React.Fragment>
    )
}

export default VisualizarProjeto