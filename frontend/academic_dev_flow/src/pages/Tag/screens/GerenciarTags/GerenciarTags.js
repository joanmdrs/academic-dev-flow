import React, { useEffect, useState } from "react";
import { Button, Form, Space, Input, Modal } from 'antd';
import Titulo from "../../../../components/Titulo/Titulo";
import { FaFilter, FaPlus, FaTrash } from "react-icons/fa6";
import { useContextoTag } from "../../context/ContextoTag";
import { atualizarTag, buscarTagPeloNome, criarTag, excluirTags, listarTags } from "../../../../services/tagService";
import FormTag from "../../components/FormTag/FormTag";
import TableTags from "../../components/TableTags/TableTags";

const GerenciarTags = () => {
    const [isFormVisivel, setIsFormVisivel] = useState(false);
    const [isFormBuscarVisivel, setIsFormBuscarVisivel] = useState(false);
    const [acaoForm, setAcaoForm] = useState('criar');
    const [isPlusBtnEnabled, setIsPlusBtnEnabled] = useState(false);
    const [nomeTag, setNomeTag] = useState(''); 
    const { dadosTag, setDadosTag, tags, setTags, tagsSelect, setTagsSelect } = useContextoTag()

    const handleCancelar = () => {
        setAcaoForm('criar');
        setIsFormBuscarVisivel(false);
        setDadosTag(null);
        setIsFormVisivel(false);
        setIsPlusBtnEnabled(false);
        setTagsSelect([]);
    };

    const handleListarTags = async () => {
        const response = await listarTags();
        if (!response.error) {
            setTags(response.data);
        }
    };

    const handleReload = async () => {
        setIsFormVisivel(false);
        setIsPlusBtnEnabled(false);
        setTagsSelect([]);
        await handleListarTags();
    };

    const handleAdicionarTag = () => {
        setDadosTag(null);
        setIsFormVisivel(true);
        setIsFormBuscarVisivel(false);
        setAcaoForm('criar');
        setIsPlusBtnEnabled(true);
    };

    const handleAtualizarTag = (record) => {
        setIsFormVisivel(true);
        setAcaoForm('atualizar');
        setDadosTag(record);
    };

    const handleSalvarTag = async (formData) => {
        if (acaoForm === 'criar') {
            await criarTag(formData);
        } else if (acaoForm === 'atualizar') {
            await atualizarTag(dadosTag.id, formData);
        }
        handleReload();
    };

    const handleBuscarTagPeloNome = async (values) => {
        const response = await buscarTagPeloNome(values.nome_tag); 
        if (!response.error){
            setTags(response.data);
        }
    };

    const handleExcluirTags = async (ids) => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Você está seguro de que deseja excluir este(s) item(s) ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                await excluirTags(ids);
                handleReload();
            }
        });
    };
    
    const handleExcluirOneTag = async (id) => {
        await handleExcluirTags([id]);
    };

    const handleExcluirManyTag = async () => {
        const ids = tagsSelect.map(item => item.id);
        await handleExcluirTags(ids);
    };

    useEffect(() => {
        const fetchData = async () => {
            await handleListarTags();
        };
        fetchData();
    }, []);

    return (
        <div className="content">
            <Titulo 
                titulo='Gerenciar Tags'
                paragrafo='Tarefas > Tags > Gerenciar tags'
            />

            { !isFormVisivel && (
                <div className="button-menu">
                    <Button 
                        icon={<FaFilter />}
                        type="primary"
                        onClick={() => setIsFormBuscarVisivel(!isFormBuscarVisivel)}
                    >
                        Filtrar
                    </Button>

                    <div className="grouped-buttons"> 
                        <Button 
                            icon={<FaPlus />} 
                            type="primary" 
                            onClick={handleAdicionarTag}
                            disabled={isPlusBtnEnabled}
                        > 
                            Criar Nova Tag 
                        </Button>

                        <Button
                            danger
                            disabled={tagsSelect.length === 0}
                            onClick={() => handleExcluirManyTag()}
                            icon={<FaTrash />}
                        > 
                            Excluir
                        </Button>
                    </div> 
                </div>
            )}

            { isFormBuscarVisivel && (
                <div className="pa-20" style={{width: '50%' }}>
                    <Form className="global-form" layout="vertical" onFinish={handleBuscarTagPeloNome}>
                        <Form.Item 
                            name="nome_tag"
                            label="Nome" 
                            rules={[{ required: true, message: 'Por favor, insira o nome da tag!' }]}
                        >
                            <Input 
                                type="text" 
                                name="nome_tag" 
                                placeholder="informe o nome da tag"
                            />
                        </Form.Item>

                        <Space>
                            <Button htmlType="button" onClick={handleCancelar}> Cancelar </Button>
                            <Button type="primary" htmlType="submit">
                                Filtrar
                            </Button>
                        </Space>
                    </Form>
                </div>
            )}

            <div className="pa-20">
                { isFormVisivel ? (
                    <FormTag onSubmit={handleSalvarTag} onCancel={handleCancelar}/>
                ) : (
                    <TableTags data={tags} onEdit={handleAtualizarTag} onDelete={handleExcluirOneTag}/>
                )}
            </div>

        </div>
    );
};

export default GerenciarTags;
