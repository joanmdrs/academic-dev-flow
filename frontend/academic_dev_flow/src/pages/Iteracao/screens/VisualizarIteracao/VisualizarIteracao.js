import { Button, Collapse, Layout, List, Result } from "antd";
import React, { useEffect, useState } from "react";
import BotaoVoltar from "../../../../components/Botoes/BotaoVoltar/BotaoVoltar";
import { useContextoIteracao } from "../../context/contextoIteracao";
import { useLocation, useNavigate } from "react-router-dom";
import { buscarIteracaoPeloId } from "../../../../services/iteracaoService";
import { listarTarefasPorIteracao } from "../../../../services/tarefaService";
import { listarArtefatosPorIteracao } from "../../../../services/artefatoService";
import Loading from "../../../../components/Loading/Loading";
import ExibirIteracao from "../../components/ExibirIteracao/ExibirIteracao";
import { buscarProjetoPeloId } from "../../../../services/projetoService";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";


const {Content} = Layout

const VisualizarIteracao = () => {

    const {dadosIteracao, setDadosIteracao} = useContextoIteracao()
    const {setDadosProjeto} = useContextoGlobalProjeto()

    const [tarefas, setTarefas] = useState([])
    const [artefatos, setArtefatos] = useState([])
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

    const handleBuscarIteracao = async () => {
        const response = await buscarIteracaoPeloId(state.id)
        if (!response.error){
            setDadosIteracao(response.data)
        }

        console.log(dadosIteracao)
    }

    const handleGetTarefas = async () => {

        const response = await listarTarefasPorIteracao(state.id)

        if (!response.error) {
            setTarefas(response.data)
        }
    }

    const handleGetArtefatos = async () => {

        const response = await listarArtefatosPorIteracao(state.id)

        if (!response.error){
            setArtefatos(response.data)
        }
    }

    const handleBack = () => {
        navigate(-1); 
    }
    
    useEffect(() => {
        const fetchData = async () => {
            if (state) {
                await handleBuscarProjeto()
                await handleBuscarIteracao()
                await handleGetTarefas()
                await handleGetArtefatos()
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
            label: 'Iteração',
            children: <ExibirIteracao  />

        }, 
        {
            key: '2',
            label: 'Tarefas',
            children: (
                <List
                    itemLayout="horizontal"
                    dataSource={tarefas}
                    renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                        title={item.nome} 
                        description={item.descricao}
                        />
                    </List.Item>
                    )}
                />
            ) 
        },
        {
            key: '3',
            label: 'Artefatos',
            children: (
                <List
                    itemLayout="horizontal"
                    dataSource={artefatos}
                    renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                        title={item.nome} 
                        description={item.descricao}
                        />
                    </List.Item>
                    )}
                />
            ) 
        },
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

export default VisualizarIteracao