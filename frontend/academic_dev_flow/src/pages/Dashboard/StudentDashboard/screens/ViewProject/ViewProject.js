import React, { useEffect, useState } from "react";
import "./ViewProject.css"
import StudentMenu from "../../../../../components/Menus/StudentMenu/StudentMenu";
import { Button, Flex, Layout } from "antd";
import { IoAdd } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import MyHeader from "../../../../../components/Header/Header";
import CustomBreadcrumb from "../../../../../components/Breadcrumb/Breadcrumb";
import { useParams } from "react-router-dom";
import { buscarProjetoPeloId } from "../../../../../services/projetoService";
import { buscarFluxoPeloId } from "../../../../../services/fluxoService";
import { listarEtapasPorFluxo } from "../../../../../services/fluxoEtapaService";
import { buscarEtapaPeloId } from "../../../../../services/etapaService";
import { listarIteracoesPorProjeto } from "../../../../../services/iteracaoService";
import FormIteracao from "../FormIteracao/FormIteracao";
import { useFormContext } from "../../context/ProviderIteracao/ProviderIteracao";

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
    const { hasProjectData, setHasProjectData } = useFormContext()
    const [projectData, setProjectData] = useState(null)
    const [iteracoes, setIteracoes] = useState(null)
    const [isFormVisivel, setIsFormVisivel] = useState(false)

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
        setHasProjectData(response1.data)

        if (response1.status === 200){

            const response2 = await listarIteracoesPorProjeto(projectId)

            const data = response2.data
            const promises = data.map(async (iteracao) => {
                const response3 = await buscarEtapaPeloId(iteracao.fase)

                return {
                    id: iteracao.id,
                    idEtapa: iteracao.fase, 
                    nome: iteracao.nome,
                    etapa: response3.data.nome
                }
            })

            const results = (await Promise.all(promises))
            setIteracoes(results)
        }
    }

    const onCancel = () => setIsFormVisivel(false)
    const onShow = () => setIsFormVisivel(true)


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

                        <div> 
                            { isFormVisivel ? 
                                (
                                    <Button 
                                        icon={<IoCloseOutline />} 
                                        onClick={onCancel}>
                                        Cancelar
                                    </Button>
                                )
                                : 
                                    <Button 
                                        icon={<IoAdd />} 
                                        onClick={onShow}>
                                        Adicionar Iteração
                                    </Button>
                            }
                            
                        </div>

                    </div>

                    <div className="content"> 

                        {isFormVisivel ? (
                            <FormIteracao />
                        ) : 
                        (
                            <div>
                                Cronograma de Iterações
                                {
                                    iteracoes &&  
                                    
                                    <Flex horizontal>
                                        {iteracoes.map((iteracao) => (
                                            <div
                                                className="cronograme-column"
                                                key={iteracao.id}
                                                style={{
                                                ...baseStyle,
                                                backgroundColor: iteracao.id % 2 ? '#1677ff' : '#1677ffbf',
                                                }}
                                            >
                                                {iteracao.nome}
                                            </div>
                                        ))}
                                    </Flex>
                                }
                            </div>
                            
                         )
                    
                    }
                        
                    </div>


                    
                    
                   
                </div>
            </Layout>
        </React.Fragment>
    )
}

export default ViewProject