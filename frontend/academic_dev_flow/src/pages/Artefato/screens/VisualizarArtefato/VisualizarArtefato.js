import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import { Button, Layout, Menu } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined, FileTextOutlined, StarOutlined, CommentOutlined } from '@ant-design/icons';
import BotaoVoltar from "../../../../components/Botoes/BotaoVoltar/BotaoVoltar";
import { useLocation } from "react-router-dom";
import { getContent } from "../../../../services/githubIntegration";
import Loading from "../../../../components/Loading/Loading";

const { Sider, Content } = Layout;

const VisualizarArtefato = ({ onBack }) => {
    const [conteutoArquivo, setConteudoArquivo] = useState('')
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState('document');
    const [collapsed, setCollapsed] = useState(true);

    const location = useLocation();
    const { state } = location;

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const handleBuscarArquivo = async () => {
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
                await handleBuscarArquivo()
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
                <Content className="global-form">
                    <BotaoVoltar funcao={onBack} />

                    {currentPage === 'document' && (
                        <Markdown className="conteudo-markdown" remarkPlugins={[remarkGfm]}>
                            {conteutoArquivo}
                        </Markdown>
                    )}
                    {currentPage === 'score' && (
                        <div>
                            
                        </div>
                    )}
                    {currentPage === 'comments' && (
                        <div>
                        </div>
                    )}
                </Content>
            </Layout>
        </Layout>
    );
};

export default VisualizarArtefato;