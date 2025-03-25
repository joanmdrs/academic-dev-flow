import React, { useState } from "react";
import { Breadcrumb, Button, Form, Space } from 'antd';
import { Input } from 'antd';
import { Modal } from 'antd';
import Titulo from "../../../../components/Titulo/Titulo";
import { FaFilter, FaPlus } from "react-icons/fa6";
import { useContextoCategoriaTarefa } from "../../context/ContextoCategoriaTarefa";
import { atualizarCategoriaTarefa, buscarCategoriaTarefaPeloNome, cadastrarCategoriaTarefa, excluirCategoriaTarefa } from "../../../../services/categoriaTarefaService";
import FormCategoriaTarefa from "../../components/FormCategoriaTarefa/FormCategoriaTarefa";
import TableCategoriaTarefa from "../../components/TableCategoriaTarefa/TableCategoriaTarefa";
import Section from "../../../../components/Section/Section";
import SectionHeader from "../../../../components/SectionHeader/SectionHeader";
import SectionFilters from "../../../../components/SectionFilters/SectionFilters";
import SectionContent from "../../../../components/SectionContent/SectionContent";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const {Search} = Input

const GerenciarCategoriaTarefa = ({grupo}) => {
    const [isFormVisivel, setIsFormVisivel] = useState(false);
    const [acaoForm, setAcaoForm] = useState('criar');
    const { dadosCategoria, setDadosCategoria, setCategorias } = useContextoCategoriaTarefa();


    const handleCancelar = () => {
        setAcaoForm('criar');
        setDadosCategoria(null);
        setIsFormVisivel(false);
    };

    const handleReload = () => {
        setIsFormVisivel(false);
        setCategorias([]);
    };

    const handleAdicionarCategoria = () => {
        setDadosCategoria(null);
        setIsFormVisivel(true);
        setAcaoForm('criar');
    };

    const handleAtualizarCategoria = (record) => {
        setIsFormVisivel(true);
        setAcaoForm('atualizar');
        setDadosCategoria(record);
    };

    const handleSalvarCategoria = async (dados) => {
        if (acaoForm === 'criar') {
            await cadastrarCategoriaTarefa(dados);
        } else if (acaoForm === 'atualizar') {
            await atualizarCategoriaTarefa(dadosCategoria.id, dados);
        }
        handleReload();
    };

    const handleBuscarCategoriaPeloNome = async (value) => {
        const response = await buscarCategoriaTarefaPeloNome(value); 
        setCategorias(response.data);
    };

    const handleExcluirCategoria = async (id) => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Você está seguro de que deseja excluir este(s) item(s) ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                await excluirCategoriaTarefa([id]);
                handleReload();
            }
        });
    };



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
                            href: `/academicflow/${grupo}/tarefas`,
                            title: 'Tarefas',
                        },
                        {
                            href: `/academicflow/${grupo}/tarefas/categorias`,
                            title: 'Categorias',
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
                        onClick={handleAdicionarCategoria}
                    > 
                        Criar Nova Categoria 
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
                        onSearch={handleBuscarCategoriaPeloNome}
                    />
                </SectionFilters>
            )}

            <SectionContent>
                { isFormVisivel && (
                    <FormCategoriaTarefa onSubmit={handleSalvarCategoria} onCancel={handleCancelar}/>
                )}

                {!isFormVisivel && (
                    <TableCategoriaTarefa onEdit={handleAtualizarCategoria} onDelete={handleExcluirCategoria}/>
                )}
            </SectionContent>

        </Section>
    );
}

export default GerenciarCategoriaTarefa;
