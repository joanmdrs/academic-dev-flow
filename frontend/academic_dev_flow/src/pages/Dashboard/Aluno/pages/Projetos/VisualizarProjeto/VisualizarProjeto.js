import React, { useEffect, useState } from "react";
import "./VisualizarProjeto.css"
import { Button, Flex, Layout } from "antd";
import { IoDocumentTextOutline } from "react-icons/io5";
import { GoTasklist } from "react-icons/go";
import MyHeader from "../../../../../../components/Header/Header";
import CustomBreadcrumb from "../../../../../../components/Breadcrumb/Breadcrumb";
import { useParams } from "react-router-dom";
import { buscarProjetoPeloId } from "../../../../../../services/projetoService";
import { useFormContext } from "../../../context/Provider/Provider"
import MenuAluno from "../../../../../../components/Menus/MenuAluno/MenuAluno";
import CronogramaIteracoes from "../../Iteracoes";
import Loading from "../../../../../../components/Loading/Loading";
import GerenciarTarefas from "../../Tarefas";
import { LuCalendarClock } from "react-icons/lu";
import GerenciarArtefatos from "../../Artefatos";

const breadcrumbRoutes = [
    { title: 'Home', path: '/aluno/home' },
    { title: 'Projetos', path: '/aluno/projetos' },
    { title: 'Visualizar', path: '/aluno/projetos/visualizar'}
];

const VisualizarProjeto = () => {

    const { idProjeto } = useParams();
    const { setDadosProjeto } = useFormContext()
    const [projeto, setProjeto] = useState(null)
    const [currentPage, setCurrentPage] = useState('default')
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
            <MenuAluno />
            <Layout>
                <MyHeader />
                <CustomBreadcrumb routes={breadcrumbRoutes} />
                <div className="screen-view-project">

                    <div className="global-div title"> 
                        { 
                            projeto !== null ? (
                                <div> 
                                    {projeto.nome}
                                </div>
                            ) : null
                        }

                        <div style={{display: "flex", gap: "10px"}}>
                            <Button
                                icon={<LuCalendarClock />} 
                                onClick={() => setCurrentPage("default")}
                            >
                                Iterações
                            </Button> 
                            <Button 
                                icon={<GoTasklist />} 
                                onClick={() => setCurrentPage("tarefas")}
                            >
                                Tarefas
                            </Button>

                            <Button 
                                icon={<IoDocumentTextOutline />}
                                onClick={() => setCurrentPage("artefatos")}
                            > 
                                Artefatos
                            </Button>

                        </div>

                    </div>

                    <div className="content"> 
                        {currentPage === "default" && <CronogramaIteracoes />}
                        {currentPage === "tarefas" && <GerenciarTarefas />}
                        {currentPage === "artefatos" && <GerenciarArtefatos/>}
                    </div>
                </div>
            </Layout>
        </React.Fragment>
    )
}

export default VisualizarProjeto