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
import { buscarIteracaoAtualDoProjeto } from "../../../../services/iteracaoService";
import { buscarFuncaoAtualDoMembroProjeto } from "../../../../services/funcaoMembroProjetoService";
import { useContextoGlobalUser } from "../../../../context/ContextoGlobalUser/ContextoGlobalUser";
import { buscarMembroProjetoPeloIdMembroEPeloIdProjeto } from "../../../../services/membroProjetoService";
import { useContextoVisualizarProjeto } from "./context/ContextVisualizarProjeto";
import SpinLoading from "../../../../components/SpinLoading/SpinLoading";

const { TabPane } = Tabs;

const VisualizarProjeto = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const {usuario} = useContextoGlobalUser()
    const { dadosProjeto, setDadosProjeto } = useContextoGlobalProjeto();
    const [collapseTabs, setCollapseTabs] = useState(false)
    const [iteracaoAtual, setIteracaoAtual] = useState(null)
    const [funcoesMembro, setFuncoesMembro] = useState([])
    const {isLoading} = useContextoVisualizarProjeto()

    const handleBuscarIteracaoAtualDoProjeto = async () => {
        const response = await buscarIteracaoAtualDoProjeto(state.idProjeto)
        if (!response.error && !response.empty){
            setIteracaoAtual(response.data)
        }
    }

    const handleGetProjeto = async () => {
        const response = await buscarProjetoPeloId(state.idProjeto);

        if (!response.error) {
            setDadosProjeto(response.data);
        }
    }

    const handleGetMembroProjeto = async () => {
        const response = await buscarMembroProjetoPeloIdMembroEPeloIdProjeto(state.idProjeto, usuario.id);
        if (!response.error) {
            const resFuncoes = await buscarFuncaoAtualDoMembroProjeto(state.idProjeto, response.data.id)
            if (!resFuncoes.error && !resFuncoes.empty){
                setFuncoesMembro(resFuncoes.data)
            }
        }

    };

    useEffect(() => {
        const fetchData = async () => {
            if (state && state.idProjeto) {
                await handleGetProjeto()
                await handleBuscarIteracaoAtualDoProjeto()
            }

            if (state.idProjeto && usuario?.id){
                await handleGetMembroProjeto()
            }
        };

        fetchData();
    }, [state, usuario, isLoading]);

    const handleVoltar = () => {
        navigate(-1);
    };

    if (isLoading) {
        return <SpinLoading />
    }

    return (
        <div className="content">

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    padding: "30px 20px",
                    borderRadius: '5px',
                    borderBottom: '1px solid var(--border-color)'
                }}
            >
                    <div style={{display: 'flex', gap: '20px', alignItems: 'baseline', border: 'none'}}>
                        <Tooltip title="Voltar">
                            <Button
                                className="bs-1"
                                style={{border: 'none'}}
                                onClick={() => handleVoltar()}
                                type="default"
                                icon={<IoArrowBackOutline />}
                            >
                            </Button>
                        </Tooltip>

                        <h2
                            style={{
                                margin: 0,
                                fontFamily: "Poppins, sans-serif",
                                fontWeight: "600",
                            }}
                        >
                            {dadosProjeto?.nome} 
                        </h2>
                        
                    </div>  

                    {/* <div style={{display: 'flex', gap: '20px', alignItems: 'baseline'}}>

                        
                        {iteracaoAtual && (
                            <div 
                                className="bs-1" 
                                style={{
                                    display: 'flex', 
                                    gap: '10px', 
                                    alignItems: 'baseline', 
                                    borderRadius: '10px',
                                    padding: '5px',
                                    backgroundColor: '#FFFFFF'
                                }}
                            >
                                <span style={{padding: '0 10px'}}> Fase: </span>
                                <div style={{
                                    color: '#FFFFFF', 
                                    backgroundColor: "var(--primary-color)",
                                    padding: '10px',       
                                    borderRadius: '5px',
                                }}> 
                                    {iteracaoAtual?.nome_etapa}
                                </div>  
                        </div>                    

                        )}
                        
                        {funcoesMembro && funcoesMembro.length > 0 && (
                            <div 
                                className="bs-1" 
                                style={{
                                    display: 'flex', 
                                    alignItems: 'baseline', 
                                    borderRadius: '10px',
                                    padding: '5px',
                                    gap: '10px',
                                    backgroundColor: '#FFFFFF'
                                }}> 
                                <span style={{padding: '0 10px'}}> Funções: </span>
                                {funcoesMembro.map((item, index) => (
                                    <div style={{
                                        borderRadius: '5px',
                                        backgroundColor: `${item.cor_categoria_funcao}`,
                                        color: '#FFFFFF', 
                                        padding: '10px',
                                    }} key={index}>{item.nome_categoria_funcao}</div>
                                ))}
                            </div>
                        )}
                    </div>                 */}

            </div>

            <div style={{paddingLeft: '20px'}}>
                <Tabs
                    size="middle"
                    tabPosition="right"
                    style={{paddingTop: '20px'}}
                >
                    <TabPane
                        tab={
                            collapseTabs ? (
                                <Tooltip placement="right" title="Projeto">
                                    <LuFolder />
                                </Tooltip>
                            ) : (
                                <Space>
                                    <LuFolder /> Projeto
                                </Space>
                            )
                        }
                        key="1"
                    >
                        <FormProjeto />
                    </TabPane>

                    <TabPane
                        tab={
                            collapseTabs ? (
                                <Tooltip placement="right" title="Cronograma">
                                    <LuCalendarDays />
                                </Tooltip>
                            ) : (
                                <Space>
                                    <LuCalendarDays /> Cronograma
                                </Space>
                            )
                        }
                        key="2"
                    >
                        <TabCronograma />
                    </TabPane>

                    <TabPane
                        tab={
                            collapseTabs ? (
                                <Tooltip placement="right" title="Tarefas">
                                    <LuClipboardList />
                                </Tooltip>
                            ) : (
                                <Space>
                                    <LuClipboardList /> Tarefas
                                </Space>
                            )
                        }
                        key="3"
                    >
                        <TabTarefas />
                    </TabPane>

                    <TabPane
                        tab={
                            collapseTabs ? (
                                <Tooltip placement="right" title="Artefatos">
                                    <LuFileCode2 />
                                </Tooltip>
                            ) : (
                                <Space>
                                    <LuFileCode2 /> Artefatos
                                </Space>
                            )
                        }
                        key="4"
                    >
                        <TabArtefatos />
                    </TabPane>

                    <TabPane
                        tab={
                            collapseTabs ? (
                                <Tooltip placement="right" title="Membros">
                                    <LuUsers />
                                </Tooltip>
                            ) : (
                                <Space>
                                    <LuUsers /> Membros
                                </Space>
                            )
                        }
                        key="5"
                    >
                        <TabMembros />
                    </TabPane>

                    <TabPane
                        tab={
                            collapseTabs ? (
                                <Tooltip placement="right" title="GitHub">
                                    <LuGithub />
                                </Tooltip>
                            ) : (
                                <Space>
                                    <LuGithub /> GitHub
                                </Space>
                            )
                        }
                        key="6"
                    >
                        <TabGitHub />
                    </TabPane>
                </Tabs>

                {/* Botão Flutuante */}
                <div
                    style={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        zIndex: 1000,
                    }}
                >
                    <Button
                        onClick={() => setCollapseTabs(!collapseTabs)}
                        size="large"
                        shape="circle"
                        style={{
                            border: "none",
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            backgroundColor: "var(--primary-color)",
                            color: "#FFFFFF"
                        }}
                    >
                        {collapseTabs ? <IoIosArrowBack /> : <IoIosArrowForward />}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default VisualizarProjeto;
