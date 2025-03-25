import React, { useState } from "react";
import { useFuncaoMembroContexto } from "../../context/FuncaoMembroContexto";
import { atualizarCategoriaFuncaoMembro, buscarCategoriaFuncaoMembroPeloNome, cadastrarCategoriaFuncaoMembro, excluirCategoriaFuncaoMembro } from "../../../../services/funcaoMembroProjetoService";
import { Button, Input, Modal, Form, Space, Breadcrumb } from "antd";
import Titulo from "../../../../components/Titulo/Titulo";
import { FaFilter } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import FormCategoriaFuncaoMembro from "../../components/FormCategoriaFuncaoMembro/FormCategoriaFuncaoMembro";
import TableCategoriaFuncaoMembro from "../../components/TableCategoriaFuncaoMembro/TableCategoriaFuncaoMembro";
import Section from "../../../../components/Section/Section";
import SectionHeader from "../../../../components/SectionHeader/SectionHeader";
import { HomeOutlined } from "@ant-design/icons";
import SectionFilters from "../../../../components/SectionFilters/SectionFilters";
import SectionContent from "../../../../components/SectionContent/SectionContent";
const {Search} = Input

const GerenciarCategoriaFuncaoMembro = ({grupo}) => {

    const [isFormVisivel, setIsFormVisivel] = useState(false);
    const [isFormBuscarVisivel, setIsFormBuscarVisivel] = useState(false);
    const [acaoForm, setAcaoForm] = useState('criar');
    const [isPlusBtnEnabled, setIsPlusBtnEnabled] = useState(false);
    const [nomeCategoria, setNomeCategoria] = useState('');
    const { 
        dadosCategoriaFuncaoMembro, 
        setDadosCategoriaFuncaoMembro, 
        setItemsCategoriaFuncaoMembro } = useFuncaoMembroContexto();

    const handleCancelar = () => {
        setAcaoForm('criar');
        setDadosCategoriaFuncaoMembro(null);
        setItemsCategoriaFuncaoMembro([])
        setIsFormVisivel(false);
        setIsFormBuscarVisivel(false)
        setIsPlusBtnEnabled(false);
    };

    const handleReload = () => {
        setIsFormVisivel(false);
        setIsPlusBtnEnabled(false);
        setItemsCategoriaFuncaoMembro([]);
    };

    const handleAdicionarCategoria = () => {
        setDadosCategoriaFuncaoMembro(null);
        setIsFormVisivel(true);
        setIsFormBuscarVisivel(false);
        setAcaoForm('criar');
        setIsPlusBtnEnabled(true);
    };

    const handleAtualizarCategoria = (record) => {
        setIsFormVisivel(true);
        setAcaoForm('atualizar');
        setDadosCategoriaFuncaoMembro(record);
    };

    const handleSalvarCategoria= async (dados) => {
        if (acaoForm === 'criar') {
            await cadastrarCategoriaFuncaoMembro(dados);
        } else if (acaoForm === 'atualizar') {
            await atualizarCategoriaFuncaoMembro(dadosCategoriaFuncaoMembro.id, dados);
        }
        handleReload();
    };

    const handleBuscarCategoriaPeloNome = async (value) => {
        const response = await buscarCategoriaFuncaoMembroPeloNome(value); 
        setItemsCategoriaFuncaoMembro(response.data.results);
    };

    const handleExcluirCategoria = async (id) => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Você está seguro de que deseja excluir este item ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                await excluirCategoriaFuncaoMembro([id]);
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
                            href: `/academicflow/${grupo}/membros/gerenciar`,
                            title: 'Membros',
                        },
                        {
                            href: `/academicflow/${grupo}/membros/funcoes`,
                            title: 'Funções'
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
                        disabled={isPlusBtnEnabled}
                    > 
                        Criar Nova Função 
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
                { isFormVisivel ? (
                        <FormCategoriaFuncaoMembro onSubmit={handleSalvarCategoria} onCancel={handleCancelar}/>
                ) : (
                    <TableCategoriaFuncaoMembro onEdit={handleAtualizarCategoria} onDelete={handleExcluirCategoria}/>

                )}
            </SectionContent>

        </Section>
    );
}

export default GerenciarCategoriaFuncaoMembro;
