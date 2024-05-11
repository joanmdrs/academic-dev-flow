import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { IoDocumentTextOutline } from "react-icons/io5";
import { GoTasklist } from "react-icons/go";
import { useParams } from "react-router-dom";
import { LuCalendarClock } from "react-icons/lu";
import { FaGithub } from "react-icons/fa6";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { buscarProjetoPeloId } from "../../../../services/projetoService";
import Loading from "../../../../components/Loading/Loading";
import ScreenCronogramaIteracoes from "../../../Iteracao/screens/CronogramaIteracoes.js";
import ScreenQuadroTarefas from "../../../Tarefa/screens/QuadroTarefas/index.js";
import ScreenPainelArtefatos from "../../../Artefato/screens/PainelArtefatos/index.js";
import ScreenPainelGihtub from "../../../GitHub/screens/PainelGithub/index.js";
import ScreenPainelMembros from "../../../Membro/screens/PainelMembros/index.js";
import ScreenDashboardProjeto from "../DashboardProjeto/index.js";

const {TabPane} = Tabs

const VisualizarProjeto = () => {

    const { idProjeto } = useParams();
    const { setDadosProjeto } = useContextoGlobalProjeto()
    const [projeto, setProjeto] = useState(null)
    const [loading, setLoading] = useState(true)

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

            <div className="screen-view-project">

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    padding: '0 20px',
                    borderBottom: '1px solid black'
                }}> 
                    { 
                        projeto !== null ? (
                            <h4 style={{color: 'var(--primary-color)'}}>{projeto.nome} </h4>
                        ) : null
                    }
                    
                </div>

                <div className="content"> 
                    <Tabs
                        style={{width: '100%', padding: '2%'}}

                    >
                        <TabPane tab='Projeto' key="1" style={{backgroundColor: '#F0F2F5', height: '100vh', padding: '1%'}}>
                            <ScreenDashboardProjeto />
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
                            <ScreenPainelMembros />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </React.Fragment>
    )
}

export default VisualizarProjeto