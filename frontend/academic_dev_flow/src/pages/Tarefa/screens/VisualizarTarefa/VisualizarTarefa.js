import { Button, Layout, Result } from "antd";
import React, { useEffect, useState } from "react";
import BotaoVoltar from "../../../../components/Botoes/BotaoVoltar/BotaoVoltar";
import { useLocation, useNavigate } from "react-router-dom";
import { Collapse } from 'antd';
import Loading from "../../../../components/Loading/Loading";
import { buscarTarefaPeloId } from "../../../../services/tarefaService";
import { useContextoTarefa } from "../../context/ContextoTarefa";
import { buscarProjetoPeloId } from "../../../../services/projetoService";
import ExibirTarefa from "../../components/ExibirTarefa/ExibirTarefa";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";

const {Content} = Layout

const VisualizarTarefa = () => {

    const {dadosTarefa, setDadosTarefa} = useContextoTarefa()
    const {dadosProjeto, setDadosProjeto} = useContextoGlobalProjeto()
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate(); 
    const location = useLocation();
    const { state } = location;

    const handleBuscarProjeto = async () => {
        const response = await buscarProjetoPeloId(state.idProjeto)
        if(!response.error){
            setDadosProjeto(response.data)
        }
    }

    const handleBuscarTarefa = async () => {
        const response = await buscarTarefaPeloId(state.idTarefa)
        if (!response.error){
            setDadosTarefa(response.data)
        }
    }

    const handleBack = () => {
        navigate(-1); 
    }
    
    useEffect(() => {
        const fetchData = async () => {
            if (state) {
                await handleBuscarProjeto()
                await handleBuscarTarefa()
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    if (!state) {
        return (
            <Result
                status="404"
                title="Erro"
                subTitle="Desculpe, a página visitada não existe, contate o suporte"
                extra={<Button type="primary" onClick={handleBack}>Voltar </Button>}
            />
        )
    }


    if (loading) {
        return <Loading />;
    }


    const items = [
        {
            key: '1',
            label: 'Tarefa',
            children: <ExibirTarefa dadosProjeto={dadosProjeto} dadosTarefa={dadosTarefa} />
        }
    ];

    return (
        <React.Fragment>
            <Layout>
                <Content className="global-div">
                    <BotaoVoltar funcao={handleBack} />
                    <Collapse style={{marginTop: '20px'}} items={items} defaultActiveKey={['1']} />
                </Content>
            </Layout>
        </React.Fragment>
    )

}

export default VisualizarTarefa