import React, { useEffect, useState } from "react";
import TableProjetos from "../../components/TableProjetos/TableProjetos";
import { useContextoGlobalUser } from "../../../../context/ContextoGlobalUser/ContextoGlobalUser";
import { buscarProjetosDoMembro } from "../../../../services/membroProjetoService";
import { Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { buscarProjetoPeloId } from "../../../../services/projetoService";
const { Search } = Input;

const Repositories = () => {

    const {usuario, grupo} = useContextoGlobalUser()
    const {setDadosProjeto} = useContextoGlobalProjeto()
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

    const handleBuscarProjeto = async (idProjeto) => {
        const response = await buscarProjetoPeloId(idProjeto)

        if(!response.error){
            setDadosProjeto(response.data)
        }
    }   

    const handleVisualizarPainel = async (record) => {

        await handleBuscarProjeto(record.dados_projeto.id)

        if (grupo === 'Docentes') {
            navigate("/professor/github-integration/painel");
        } else if (grupo === 'Discentes') {
            navigate("/aluno/github-integration/painel")
        }
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
                    <h2 
                        style={{
                            margin: 0, 
                            fontWeight: '600'
                        }}> Integração com o GitHub </h2>
                    <h4 
                        style={{
                            margin: 0, 
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
                    onViewPanel={handleVisualizarPainel}
                />
            </div>
        </div>
    )
}

export default Repositories