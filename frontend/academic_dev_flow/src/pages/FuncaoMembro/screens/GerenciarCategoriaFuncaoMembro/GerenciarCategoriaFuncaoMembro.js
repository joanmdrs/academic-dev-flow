import React, { useState } from "react";
import { useFuncaoMembroContexto } from "../../context/FuncaoMembroContexto";
import { atualizarCategoriaFuncaoMembro, buscarCategoriaFuncaoMembroPeloNome, cadastrarCategoriaFuncaoMembro, excluirCategoriaFuncaoMembro } from "../../../../services/funcaoMembroProjetoService";
import { Button, Input, Modal, Form } from "antd";
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
        <div>
            <Titulo 
                titulo='Categorias'
                paragrafo='Membro > Função > Categoria'
            />

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

            { isFormBuscarVisivel && (
                <div className="global-div" style={{width: '50%'}}>
                    <Form layout="vertical">
                        <Form.Item 
                            name="nome"
                            label="Nome" 
                            rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
                        >
                            <Input 
                                type="text" 
                                name="nome_tipo" 
                                placeholder="informe o nome da categoria"
                                value={nomeCategoria} 
                                onChange={(e) => setNomeCategoria(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" onClick={handleBuscarCategoriaPeloNome}>
                                Buscar
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            )}

            <div className="global-div">
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
