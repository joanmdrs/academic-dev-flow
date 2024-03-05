import React, { useEffect, useState } from "react";
import "./ViewProject.css"
import StudentMenu from "../../../../../components/Menus/StudentMenu/StudentMenu";
import { Button, Dropdown, Flex, Layout, Menu, Popconfirm } from "antd";
import { IoAdd } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import MyHeader from "../../../../../components/Header/Header";
import CustomBreadcrumb from "../../../../../components/Breadcrumb/Breadcrumb";
import { useParams } from "react-router-dom";
import { buscarProjetoPeloId } from "../../../../../services/projetoService";
import { buscarFluxoPeloId } from "../../../../../services/fluxoService";
import { listarEtapasPorFluxo } from "../../../../../services/fluxoEtapaService";
import { buscarEtapaPeloId, criarEtapa } from "../../../../../services/etapaService";
import { atualizarIteracao, criarIteracao, excluirIteracao, listarIteracoesPorProjeto } from "../../../../../services/iteracaoService";
import FormIteracao from "../FormIteracao/FormIteracao";
import { useFormContext } from "../../context/ProviderIteracao/ProviderIteracao";
import { FiEdit } from "react-icons/fi";
import { FiTrash } from "react-icons/fi";
import { IoIosMore } from "react-icons/io";
import { recarregarPagina } from "../../../../../services/utils";

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
    const { hasProjectData, setHasProjectData, valuesIteracao, setValuesIteracao } = useFormContext()
    const [projectData, setProjectData] = useState(null)
    const [iteracoes, setIteracoes] = useState(null)
    const [isFormVisivel, setIsFormVisivel] = useState(false)
    const [acaoForm, setAcaoForm] = useState("create")
    const [reloadTrigger, setReloadTrigger] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            if (projectId) {
                await handleGetProject()
            }
        };
    
        fetchData(); 
    
    }, [projectId, reloadTrigger]);


    const reloadPage = () => {
        setReloadTrigger((prev) => prev + 1);
    };
    const handleGetProject = async () => {

        const response1 = await buscarProjetoPeloId(projectId);
        setProjectData(response1.data);
        setHasProjectData(response1.data)

        if (response1.status === 200){

            const response2 = await listarIteracoesPorProjeto(projectId)
            const iteracoesOrdenadas = response2.data.sort((a, b) => a.numero - b.numero);
            setIteracoes(iteracoesOrdenadas);
        }
    }

    const handleCancel = () => {
        setAcaoForm('create')
        setIsFormVisivel(false)
        setValuesIteracao(null)
    }

    const handleAdd = () => {
        setAcaoForm('create')
        setIsFormVisivel(true)
        setValuesIteracao(null)
    }

    const handleEdit = (record) => {
        setValuesIteracao(record)
        setAcaoForm('update')
        setIsFormVisivel(true)
    }

    const handleSaveIteracao = async (dados) => {    
        dados['projeto'] = projectId
        if (acaoForm === 'create'){
            await criarIteracao(dados)
        } else if (acaoForm === 'update') {
            await atualizarIteracao(valuesIteracao.id, dados)
        }
        reloadPage()
    }

    const handleDelete = async (record) => {
        await excluirIteracao(record.id)
        reloadPage()
    }

    const CustomMenu = ({ iteracao}) => {
        return (
            <Menu>
                <Menu.Item key="editar">
                    <Button type="text" icon={<FiEdit />} onClick={() => handleEdit(iteracao)}>
                        Editar
                    </Button>
                </Menu.Item>

                <Menu.Item key="excluir">
                    <Popconfirm
                        title="Tem certeza que deseja excluir?"
                        onConfirm={async () => await handleDelete(iteracao)}
                        okText="Sim"
                        cancelText="Não"
                        >
                        <Button type="text" icon={<FiTrash />}>
                            Excluir
                        </Button>
                    </Popconfirm>
                </Menu.Item>
            </Menu>
        );
    };


    return (
        <React.Fragment>
            <StudentMenu />
            <Layout>
                <MyHeader />
                <CustomBreadcrumb routes={breadcrumbRoutes} />
                <div className="screen-view-project">

                    <div className="global-div title"> 
                        { 
                            projectData !== null ? (
                                <div> 
                                    {projectData.nome}
                                </div>
                            ) : null
                        }

                        <div> 
                            { isFormVisivel ? 
                                (
                                    <Button 
                                        icon={<IoCloseOutline />} 
                                        onClick={handleCancel}>
                                        Cancelar
                                    </Button>
                                )
                                : 
                                    <Button 
                                        icon={<IoAdd />} 
                                        onClick={handleAdd}>
                                        Adicionar Iteração
                                    </Button>
                            }
                            
                        </div>

                    </div>

                    <div className="content"> 

                        {isFormVisivel ? (
                            <FormIteracao  onSubmit={handleSaveIteracao} onCancel={handleCancel} />
                        ) : 
                        (
                            <div className="cronograme-iterations">
                                <div> <h4> Cronograma de Iterações </h4> </div>
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
                                                <div style={{display: 'flex', flexDirection: 'column-reverse', width: "100%"}}>
                                                    <div className="iteration">
                                                        {iteracao.nome}
                                                    </div>
                                                    <Dropdown overlay={<CustomMenu iteracao={iteracao} />} trigger={['click']}
                                                        >
                                                        <Button className="actions-iteration" >
                                                            <IoIosMore fontSize="25px" color="#fff" />
                                                        </Button>
                                                    </Dropdown>

                                                </div>
                                                
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