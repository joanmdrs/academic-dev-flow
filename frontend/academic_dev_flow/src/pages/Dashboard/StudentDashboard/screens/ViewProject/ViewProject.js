import React, { useEffect, useState } from "react";
import "./ViewProject.css"
import StudentMenu from "../../../../../components/Menus/StudentMenu/StudentMenu";
import { Flex, Layout } from "antd";
import MyHeader from "../../../../../components/Header/Header";
import CustomBreadcrumb from "../../../../../components/Breadcrumb/Breadcrumb";
import { useParams } from "react-router-dom";
import { buscarProjetoPeloId } from "../../../../../services/projetoService";
import { buscarFluxoPeloId } from "../../../../../services/fluxoService";
import { listarEtapasPorFluxo } from "../../../../../services/fluxoEtapaService";
import { buscarEtapaPeloId } from "../../../../../services/etapaService";

const breadcrumbRoutes = [
    { title: 'Home', path: '/aluno/home' },
    { title: 'Projetos', path: '/aluno/projetos' },
    { title: 'Visualizar', path: '/aluno/projetos/visualizar'}
];

const baseStyle = {
    width: '25%',
    height: '100vh',
  };

const ViewProject = () => {

    const { projectId } = useParams();
    const [projectData, setProjectData] = useState(null)
    const [etapas, setEtapas] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            if (projectId) {
                await handleGetProject()
            }
        };
    
        fetchData(); 
    
    }, [projectId]);

    const handleGetProject = async () => {

        const response1 = await buscarProjetoPeloId(projectId);
        setProjectData(response1.data);

        if (response1.status === 200){

            const response2 = await listarEtapasPorFluxo(response1.data.fluxo)

            const results = response2.data
            const promises = results.map(async (fluxoEtapa) => {
                console.log(fluxoEtapa)
                const response3 = await buscarEtapaPeloId(fluxoEtapa.etapa)

                return {
                    id: fluxoEtapa.id,
                    idFluxo: fluxoEtapa.fluxo,
                    idEtapa: fluxoEtapa.etapa, 
                    nome: response3.data.nome
                }
            })

            const resultados = (await Promise.all(promises))

            console.log(resultados)
            setEtapas(resultados)
        }
    }


    return (
        <React.Fragment>
            <StudentMenu />
            <Layout>
                <MyHeader />
                <CustomBreadcrumb routes={breadcrumbRoutes} />
                <div className="screen-view-project">

                    <div className="title global-div">
                        { 
                            projectData !== null ? (
                                <div className="title"> 
                                    {projectData.nome}
                                </div>
                            ) : null
                        }
                    </div>

                    <div className="content"> 
                        Cronograma
                        {
                            etapas &&  
                            
                            <Flex horizontal>
                                {etapas.map((etapa) => (
                                    <div
                                        className="cronograme-column"
                                        key={etapa.id}
                                        style={{
                                        ...baseStyle,
                                        backgroundColor: etapa.id % 2 ? '#1677ff' : '#1677ffbf',
                                        }}
                                    >
                                        {etapa.nome}
                                    </div>
                                ))}
                            </Flex>
                        }
                    </div>


                    
                    
                   
                </div>
            </Layout>
        </React.Fragment>
    )
}

export default ViewProject