import React, { useEffect, useState } from "react";
import TableProjetos from "../../components/TableProjetos/TableProjetos";
import { useContextoGlobalUser } from "../../../../context/ContextoGlobalUser/ContextoGlobalUser";
import { buscarProjetosDoMembro } from "../../../../services/membroProjetoService";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";
const { Search } = Input;

const GithubProjetos = () => {

    const {usuario, grupo} = useContextoGlobalUser()
    const [projetos, setProjetos] = useState([])
    const navigate = useNavigate();

    const handleBuscarProjetosDoMembro = async () => {
        const response = await buscarProjetosDoMembro(usuario.id)
        if (!response.error) {
            setProjetos(response.data)
        }
    }

    const handleFiltrarProjetosPeloNome = async (value) => {
        if (value){
            const response = await buscarProjetosDoMembro(usuario.id);
            const projetosFiltros = response.data.filter(projeto =>
                projeto.nome_projeto.toLowerCase().includes(value.toLowerCase())
            );
            setProjetos(projetosFiltros)
        } else {
            await handleBuscarProjetosDoMembro()
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (usuario && usuario.id){
                await handleBuscarProjetosDoMembro()
            }
        }

        fetchData()
    }, [usuario])

    const handleVisualizarIssues = async (record) => {
        const parametros = {
            idProjeto: record.dados_projeto.id,
            tokenGithub: record.dados_projeto.token,
            repoGithub: record.dados_projeto.nome_repo
        }
        if (grupo === 'Docentes') {
            navigate("/professor/github-integration/issues", {
                state: parametros
            });
        } else if (grupo === 'Discentes') {
            navigate("/aluno/github-integration/issues", {
                state: parametros
            });
        } else if (grupo === 'Administradores') {
            navigate("/admin/github-integration/issues", {
                state: parametros
            });
        }
    }

    const handleVisualizarContents = async (record) => {
        const parametros = {
            idProjeto: record.dados_projeto.id,
            tokenGithub: record.dados_projeto.token,
            repoGithub: record.dados_projeto.nome_repo
        }
        if (grupo === 'Docentes') {
            navigate("/professor/github-integration/contents", {
                state: parametros
            });
        } else if (grupo === 'Discentes') {
            navigate("/aluno/github-integration/contents", {
                state: parametros
            });
        } else if (grupo === 'Administradores') {
            navigate("/admin/github-integration/contents", {
                state: parametros
            });
        }
    }

    const handleVisualizarCommits = async (record) => {
        const parametros = {
            idProjeto: record.dados_projeto.id,
            tokenGithub: record.dados_projeto.token,
            repoGithub: record.dados_projeto.nome_repo
        }
        if (grupo === 'Docentes') {
            navigate("/professor/github-integration/commits", {
                state: parametros
            });
        } else if (grupo === 'Discentes') {
            navigate("/aluno/github-integration/commits", {
                state: parametros
            });
        } else if (grupo === 'Administradores') {
            navigate("/admin/github-integration/commits", {
                state: parametros
            });
        }
    }


    return (
        <div className="global-div" style={{backgroundColor: '#FFFFFF', height: '100%'}}>

            <div style={{
                borderBottom: '1px solid #ddd',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                padding: '20px'
            }}> 
                <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <h2 
                        style={{
                            margin: 0, 
                            fontFamily: 'Poppins, sans-serif', 
                            fontWeight: '600'
                        }}> Integração com o GitHub </h2>
                    <h4 
                        style={{
                            margin: 0, 
                            fontFamily: 'Poppins, sans-serif', 
                            fontWeight: '400'}}> Projetos </h4>
                </div>
            </div>

            <div style={{
                    borderBottom: '1px solid #ddd',
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'space-between'

                }}> 

                <div>
                    <Search
                        style={{width: '500px'}}
                        placeholder="pesquise pelo projeto"
                        allowClear
                        enterButton="Pesquisar"
                        size="middle"
                        onSearch={handleFiltrarProjetosPeloNome}

                    />
                </div>
            </div>

            <div style={{padding: '20px'}}> 
                <TableProjetos 
                    data={projetos}
                    onViewIssues={handleVisualizarIssues}
                    onViewContents={handleVisualizarContents}
                    onViewCommits={handleVisualizarCommits}
                />
            </div>
        </div>
    )
}

export default GithubProjetos