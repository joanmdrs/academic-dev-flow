import React, { useEffect, useState } from "react";
import "./VisualizarDocumento.css";
import { buscarDocumentos } from "../../../api/apiGitHubService";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import { Button, Layout, Menu } from "antd";
import BotaoVoltar from "../../../components/Botoes/BotaoVoltar/BotaoVoltar";
import Loading from "../../../components/Loading/Loading";
import { MenuUnfoldOutlined, MenuFoldOutlined, FileTextOutlined, StarOutlined, CommentOutlined } from '@ant-design/icons';
import FormComentario from "../../Comentario/FormComentario/FormComentario";

const { Sider, Content } = Layout;

const VisualizarDocumento = ({ documento, onBack }) => {
    const [decodedDoc, setDecodedDoc] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState('document');
    const [collapsed, setCollapsed] = useState(true);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const handleGetDocumento = async (path) => {
        const response = await buscarDocumentos(path);
        if (response.status === 200) {
            const decodedContent = decodeURIComponent(escape(atob(response.data.content)));
            setDecodedDoc(decodedContent);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (documento) {
                await handleGetDocumento(documento.caminho);
            }
            setLoading(false);
        };
        fetchData();
    }, []);


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

                
            <Layout className="site-layout" >
                <Content className="global-form">
                    <BotaoVoltar funcao={onBack} />

                    {currentPage === 'document' && (
                        <Markdown className="conteudo-markdown" remarkPlugins={[remarkGfm]}>
                            {decodedDoc}
                        </Markdown>
                    )}
                    {currentPage === 'score' && (
                        <div>
                            {/* Componente de Pontuação */}
                            <h1>Aqui será a área de pontuação</h1>
                        </div>
                    )}
                    {currentPage === 'comments' && (
                        <div>
                            <FormComentario />
                        </div>
                    )}
                </Content>
            </Layout>
        </Layout>
    );
};

export default VisualizarDocumento;
