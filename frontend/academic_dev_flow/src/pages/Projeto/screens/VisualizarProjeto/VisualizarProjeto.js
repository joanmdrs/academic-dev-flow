import { Button, Space, Tabs, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { useLocation, useNavigate } from "react-router-dom";
import { buscarProjetoPeloId } from "../../../../services/projetoService";
import FormProjeto from "../../components/FormProjeto/FormProjeto";
import TabCronograma from "./Tabs/TabCronograma";
import TabTarefas from "./Tabs/TabTarefas";
import TabArtefatos from "./Tabs/TabArtefatos";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { LuFileCode2, LuGithub } from "react-icons/lu";
import { LuFolder } from "react-icons/lu";
import { LuCalendarDays } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import { LuClipboardList } from "react-icons/lu";
import TabMembros from "./Tabs/TabMembros";
import TabGitHub from "./Tabs/TabGithub";

const {TabPane} = Tabs

const VisualizarProjeto = () => {

    const {dadosProjeto, setDadosProjeto} = useContextoGlobalProjeto()
    const navigate = useNavigate()
    const location = useLocation();
    const { state } = location;
    const [collapseTabs, setCollapseTabs] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            if (state && state.idProjeto){
                const response = await buscarProjetoPeloId(state.idProjeto)
                if (!response.error){
                    setDadosProjeto(response.data)
                }
            }
        }

        fetchData()
    }, [state])

    const handleVoltar = () => {
        navigate(-1); 
        
    }

    return (
        <div className="content"> 
            <div style={{
                borderBottom: '1px solid #ddd',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                padding: '20px'
            }}> 
                <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <h3 
                        style={{
                            margin: 0, 
                            fontFamily: 'Poppins, sans-serif', 
                            fontWeight: '600'}}
                        > {dadosProjeto?.nome} 
                    </h3>
                </div>

                <div>
                    <Button 
                        onClick={() => handleVoltar()}
                        type="default" 
                        icon={<IoArrowBackOutline />} 
                    > VOLTAR </Button>
                </div>
            </div>

            <div> 
                <Tabs
                    size="middle"
                    tabPosition="right"
                    indicator={{
                        align: "center"
                    }}
                    tabBarExtraContent={
                        <Button 
                            onClick={() => setCollapseTabs(!collapseTabs)} 
                            size="large" 
                            style={{border: 'none'}}
                        >
                            { collapseTabs ? (
                                <IoIosArrowBack />
                            ) : (
                                <IoIosArrowForward />
                            )}
                        </Button>
                    }
                    style={{padding: "20px"}}
                    className="tabs-projeto"
                > 
                    <TabPane tab={collapseTabs ? 
                        <Tooltip placement="right" title="Projeto"> <LuFolder/> </Tooltip> 
                        : <Space> <LuFolder /> Projeto </Space>} key="1"
                    >
                        <FormProjeto />
                    </TabPane>

                    <TabPane tab={collapseTabs ? 
                        <Tooltip placement="right" title="Cronograma"> <LuCalendarDays/> </Tooltip> 
                        : <Space> <LuCalendarDays /> Cronograma </Space>} key="2"
                    >
                        <TabCronograma />
                    </TabPane>

                    <TabPane tab={collapseTabs ? 
                        <Tooltip placement="right" title="Tarefas"> <LuClipboardList/> </Tooltip> 
                        : <Space> <LuClipboardList /> Tarefas </Space>} key="3"
                    >
                        <TabTarefas />
                    </TabPane>

                    <TabPane tab={collapseTabs ?
                        <Tooltip placement="right" title="Artefatos"> <LuFileCode2/> </Tooltip> 
                        : <Space> <LuFileCode2 /> Artefatos </Space>} key="4"
                    >
                        <TabArtefatos />
                    </TabPane>

                    <TabPane tab={collapseTabs ? 
                        <Tooltip placement="right" title="Membros"> <LuUsers/> </Tooltip> 
                        : <Space> <LuUsers /> Membros </Space>} key="5"
                    >
                        <TabMembros />
                    </TabPane>

                    <TabPane tab={collapseTabs ? 
                        <Tooltip placement="right" title="GitHub"> <LuGithub/> </Tooltip> 
                        : <Space> <LuGithub /> GitHub </Space>} key="6"
                    >
                        <TabGitHub />
                    </TabPane>

                    
                </Tabs> 
            </div>
        </div>
    )
}

export default VisualizarProjeto