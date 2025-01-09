import React, { useState } from "react";
import { useFuncaoMembroContexto } from "../../context/FuncaoMembroContexto";
import { atualizarCategoriaFuncaoMembro, buscarCategoriaFuncaoMembroPeloNome, cadastrarCategoriaFuncaoMembro, excluirCategoriaFuncaoMembro } from "../../../../services/funcaoMembroProjetoService";
import { Button, Input, Modal, Form, Space } from "antd";
import Titulo from "../../../../components/Titulo/Titulo";
import { FaFilter } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import FormCategoriaFuncaoMembro from "../../components/FormCategoriaFuncaoMembro/FormCategoriaFuncaoMembro";
import TableCategoriaFuncaoMembro from "../../components/TableCategoriaFuncaoMembro/TableCategoriaFuncaoMembro";

const GerenciarCategoriaFuncaoMembro = () => {

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

    const handleBuscarCategoriaPeloNome = async () => {
        const response = await buscarCategoriaFuncaoMembroPeloNome(nomeCategoria); 
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
        <div className="content">
            <Titulo 
                titulo='Funções'
                paragrafo='Membro > Funções > Gerenciar funções'
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
                        Criar Nova Função 
                    </Button>
                </div>

            )}

            { isFormBuscarVisivel && (
                <div className="pa-20" style={{width: '50%'}}>
                    <Form layout="vertical" className="global-form">
                        <Form.Item 
                            name="nome"
                            label="Filtrar função" 
                        >
                            <Input 
                                type="text" 
                                name="nome_tipo" 
                                placeholder="Pesquise pelo nome da função"
                                value={nomeCategoria} 
                                onChange={(e) => setNomeCategoria(e.target.value)}
                            />
                        </Form.Item>

                        <Space>
                            <Button onClick={() => handleCancelar()}> Cancelar </Button>
                            <Button type="primary" htmlType="submit" onClick={handleBuscarCategoriaPeloNome}>
                                Filtrar
                            </Button>
                        </Space>
                    </Form>
                </div>
            )}

            <div className="pa-20">
                { isFormVisivel ? (
                        <FormCategoriaFuncaoMembro onSubmit={handleSalvarCategoria} onCancel={handleCancelar}/>
                ) : (
                    <TableCategoriaFuncaoMembro onEdit={handleAtualizarCategoria} onDelete={handleExcluirCategoria}/>

                )}
            </div>

        </div>
    );
}

export default GerenciarCategoriaFuncaoMembro;
