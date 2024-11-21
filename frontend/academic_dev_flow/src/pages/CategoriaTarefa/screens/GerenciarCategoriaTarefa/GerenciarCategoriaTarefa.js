import React, { useState } from "react";
import { Button, Form, Space } from 'antd';
import { Input } from 'antd';
import { Modal } from 'antd';
import Titulo from "../../../../components/Titulo/Titulo";
import { FaFilter, FaPlus } from "react-icons/fa6";
import { useContextoCategoriaTarefa } from "../../context/ContextoCategoriaTarefa";
import { atualizarCategoriaTarefa, buscarCategoriaTarefaPeloNome, cadastrarCategoriaTarefa, excluirCategoriaTarefa } from "../../../../services/categoriaTarefaService";
import FormCategoriaTarefa from "../../components/FormCategoriaTarefa/FormCategoriaTarefa";
import TableCategoriaTarefa from "../../components/TableCategoriaTarefa/TableCategoriaTarefa";

const GerenciarCategoriaTarefa = () => {
    const [isFormVisivel, setIsFormVisivel] = useState(false);
    const [isFormBuscarVisivel, setIsFormBuscarVisivel] = useState(false);
    const [acaoForm, setAcaoForm] = useState('criar');
    const [isPlusBtnEnabled, setIsPlusBtnEnabled] = useState(false);
    const [nomeCategoria, setNomeCategoria] = useState(''); 
    const { dadosCategoria, setDadosCategoria, setCategorias } = useContextoCategoriaTarefa();

    const handleCancelar = () => {
        setAcaoForm('criar');
        setIsFormBuscarVisivel(false)
        setDadosCategoria(null);
        setIsFormVisivel(false);
        setIsPlusBtnEnabled(false);
    };

    const handleReload = () => {
        setIsFormVisivel(false);
        setIsPlusBtnEnabled(false);
        setCategorias([]);
    };

    const handleAdicionarCategoria = () => {
        setDadosCategoria(null);
        setIsFormVisivel(true);
        setIsFormBuscarVisivel(false);
        setAcaoForm('criar');
        setIsPlusBtnEnabled(true);
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

    const handleBuscarCategoriaPeloNome = async () => {
        const response = await buscarCategoriaTarefaPeloNome(nomeCategoria); 
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
        <div className="content">
            <Titulo 
                titulo='Gerenciar Categorias'
                paragrafo='Tarefas > Categorias > Gerenciar categorias'
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

                    <Button 
                        icon={<FaPlus />} 
                        type="primary" 
                        onClick={handleAdicionarCategoria}
                        disabled={isPlusBtnEnabled}
                    > 
                        Criar Nova Categoria 
                    </Button>
                </div>
            )}

            { isFormBuscarVisivel && (
                <div className="pa-20" style={{width: '50%'}}>
                    <Form className="global-form" layout="vertical" onFinish={handleBuscarCategoriaPeloNome}>
                        <Form.Item 
                            name="nome_categoria"
                            label="Nome" 
                        >
                            <Input 
                                type="text" 
                                name="nome_categoria" 
                                placeholder="informe o nome da categoria"
                                value={nomeCategoria} 
                                onChange={(e) => setNomeCategoria(e.target.value)}
                            />
                        </Form.Item>

                        <Space>
                            <Button onClick={() => handleCancelar()}> Cancelar </Button>
                            <Button type="primary">
                                Filtrar
                            </Button>
                        </Space>
                    </Form>
                </div>
            )}

            <div className="pa-20">
                { isFormVisivel ? (
                    <FormCategoriaTarefa onSubmit={handleSalvarCategoria} onCancel={handleCancelar}/>
                ) : (
                    <TableCategoriaTarefa onEdit={handleAtualizarCategoria} onDelete={handleExcluirCategoria}/>

                )}
            </div>

        </div>
    );
}

export default GerenciarCategoriaTarefa;
