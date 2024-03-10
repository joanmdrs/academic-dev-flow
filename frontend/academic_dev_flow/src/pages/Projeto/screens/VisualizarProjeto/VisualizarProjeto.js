import React, { useEffect, useState } from "react";
import "./VisualizarProjeto.css"
import { Button, Layout } from "antd";
import { IoDocumentTextOutline } from "react-icons/io5";
import { GoTasklist } from "react-icons/go";
import { useParams } from "react-router-dom";
import { LuCalendarClock } from "react-icons/lu";
import { useProjetoContext } from "../../../../context/ProjetoContext";
import { buscarProjetoPeloId } from "../../../../services/projetoService";
import Loading from "../../../../components/Loading/Loading";
import MenuAluno from "../../../../components/Menus/MenuAluno/MenuAluno";
import MenuProfessor from "../../../../components/Menus/MenuProfessor/MenuProfessor";
import MyHeader from "../../../../components/Header/Header";
import CustomBreadcrumb from "../../../../components/Breadcrumb/Breadcrumb";
import CronogramaIteracoes from "../../../Iteracoes";
import GerenciarTarefas from "../../../Tarefas";
import GerenciarDocumentos from "../../../Documentos";


const VisualizarProjeto = ({grupo}) => {

    const { idProjeto } = useParams();
    const { setDadosProjeto } = useProjetoContext()
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
                                onClick={() => setCurrentPage("documentos")}
                            > 
                                Artefatos
                            </Button>

                        </div>

                    </div>

                    <div className="content"> 
                        {currentPage === "default" && <CronogramaIteracoes />}
                        {currentPage === "tarefas" && <GerenciarTarefas />}
                        {currentPage === "documentos" && <GerenciarDocumentos/>}
                    </div>
                </div>
            </Layout>
        </React.Fragment>
    )
}

export default VisualizarProjeto