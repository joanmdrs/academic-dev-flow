import "./VisualizarArtefato.css"
import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import { Button, Layout, Menu } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined, FileTextOutlined, StarOutlined, CommentOutlined } from '@ant-design/icons';
import BotaoVoltar from "../../../../components/Botoes/BotaoVoltar/BotaoVoltar";
import { useLocation, useNavigate } from "react-router-dom";
import { getContent } from "../../../../services/githubIntegration";
import Loading from "../../../../components/Loading/Loading";
import ScreenGerencirPontuacao from "../../../Pontuacao/screens/GerenciarPontuacao";
import { buscarArtefatoPeloId } from "../../../../services/artefatoService";
import { useContextoArtefato } from "../../context/ContextoArtefato";
import { buscarProjetoPeloId } from "../../../../services/projetoService";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";

const { Sider, Content } = Layout;

const VisualizarArtefato = () => {

    const {setDadosProjeto} = useContextoGlobalProjeto()
    const {setDadosArtefato} = useContextoArtefato()
    const [conteutoArquivo, setConteudoArquivo] = useState('')
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState('document');
    const [collapsed, setCollapsed] = useState(true);
    
    const navigate = useNavigate(); 
    const location = useLocation();
    const { state } = location;

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const handleBuscarProjeto = async () => {
        const response = await buscarProjetoPeloId(state.id_projeto)

        if (!response.error){
            setDadosProjeto(response.data)
        }
    }

    const handleBuscarArtefato = async () => {

        const response = await buscarArtefatoPeloId(state.id_artefato)

        if (!response.error){
            setDadosArtefato(response.data)
        }
    }

    const handleGetContent = async () => {
        const parametros = {
            github_token: state.github_token,
            repository: state.repository,
            path: state.path
        }
        const response = await getContent(parametros)

        if (!response.error){
            setConteudoArquivo(response.data.content)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (state) {
                await handleBuscarProjeto()
                await handleBuscarArtefato()
                await handleGetContent()
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    if (!state) {
        return <div>Nenhum parâmetro encontrado</div>;
    }


    if (loading) {
        return <Loading />;
    }

    const handleBack = () => {
        navigate(-1); 
    }

    return (
        <Layout style={{ minHeight: '100vh' }} className="screen-view-document">
            <Sider style={{marginRight: "20px"}} theme="light" collapsed={collapsed} className="global-form">
                <Button
                    type="primary"
                    onClick={toggleCollapsed}
                    style={{
                    marginBottom: 16,
                    }}
                >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
                <Menu defaultSelectedKeys={['1']} mode="inline" theme="light" inlineCollapsed={collapsed}>
                    <Menu.Item key="1" icon={<FileTextOutlined />} onClick={() => setCurrentPage('document')}>
                        Documento
                    </Menu.Item>
                    <Menu.Item key="2" icon={<StarOutlined />} onClick={() => setCurrentPage('score')}>
                        Pontuação
                    </Menu.Item>
                    <Menu.Item key="3" icon={<CommentOutlined />} onClick={() => setCurrentPage('comments')}>
                        Comentários
                    </Menu.Item>
                </Menu>

            </Sider>

                
            <Layout className="site-layout">
                <Content className="global-div">
                    <BotaoVoltar funcao={handleBack} />

                    {currentPage === 'document' && (
                        <Markdown className="conteudo-markdown table-markdown" remarkPlugins={[remarkGfm]}>
                            {conteutoArquivo}
                        </Markdown>
                    )}
                    {currentPage === 'score' && (
                        <ScreenGerencirPontuacao />
                    )}
                   
                </Content>
            </Layout>
        </Layout>
    );
};

export default VisualizarArtefato;
