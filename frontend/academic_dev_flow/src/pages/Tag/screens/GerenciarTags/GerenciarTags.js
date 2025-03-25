import React, { useEffect, useState } from "react";
import { Button, Form, Space, Input, Modal, Breadcrumb } from 'antd';
import Titulo from "../../../../components/Titulo/Titulo";
import { FaFilter, FaPlus, FaTrash } from "react-icons/fa6";
import { useContextoTag } from "../../context/ContextoTag";
import { atualizarTag, buscarTagPeloNome, criarTag, excluirTags, listarTags } from "../../../../services/tagService";
import FormTag from "../../components/FormTag/FormTag";
import TableTags from "../../components/TableTags/TableTags";
import Section from "../../../../components/Section/Section";
import SectionHeader from "../../../../components/SectionHeader/SectionHeader";
import { HomeOutlined } from "@ant-design/icons";
import SectionFilters from "../../../../components/SectionFilters/SectionFilters";
import SectionContent from "../../../../components/SectionContent/SectionContent";

const {Search} = Input 

const GerenciarTags = ({grupo}) => {
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

    const handleBuscarTagPeloNome = async (value) => {
        const response = await buscarTagPeloNome(value); 
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
        <Section>
            <SectionHeader>
                <Breadcrumb
                    items={[
                        {
                            href: `/academicflow/${grupo}/home`,
                            title: <HomeOutlined />,
                        },
                        {
                            href: `/academicflow/${grupo}/tags`,
                            title: 'Tags',
                        },
                        ...(isFormVisivel && acaoForm === 'criar'
                            ? [{ title: 'Cadastrar' }]
                            : []),
                        ...(isFormVisivel && acaoForm === 'atualizar'
                            ? [{ title: 'Atualizar' }]
                            : []),
                    ]}
                />

                {!isFormVisivel && (
                    <Button 
                        icon={<FaPlus />} 
                        type="primary" 
                        onClick={handleAdicionarTag}
                    > 
                        Criar Nova Tag 
                    </Button>
                )}

            </SectionHeader>

            {!isFormVisivel && (
                <SectionFilters>
                    <Search
                        style={{width: '500px'}}
                        placeholder="pesquise pelo nome"
                        allowClear
                        enterButton="Pesquisar"
                        size="middle"
                        onSearch={handleBuscarTagPeloNome}
                    />
                    {tagsSelect.length !== 0 && (
                        <Button
                            icon={<FaTrash />}
                            danger
                            type="primary"
                            onClick={() => handleExcluirManyTag()}
                        >
                            Excluir
                        </Button>
                    )}
                </SectionFilters>
            )}

            <SectionContent>
                { isFormVisivel ? (
                    <FormTag onSubmit={handleSalvarTag} onCancel={handleCancelar}/>
                ) : (
                    <TableTags data={tags} onEdit={handleAtualizarTag} onDelete={handleExcluirOneTag}/>
                )}
            </SectionContent>

        </Section>
    );
};

export default GerenciarTags;
