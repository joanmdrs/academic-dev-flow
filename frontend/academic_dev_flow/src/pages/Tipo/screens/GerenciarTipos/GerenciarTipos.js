import React, { useState } from "react";
import { Button, Form } from 'antd';
import { Input } from 'antd';
import { Modal } from 'antd';
import FormTipo from "../../components/FormTipo/FormTipo";
import Titulo from "../../../../components/Titulo/Titulo";
import ListaTipos from "../../components/ListaTipos/ListaTipos";
import { FaPlus } from "react-icons/fa6";
import { atualizarTipo, buscarTipo, criarTipo, excluirTipo } from "../../../../services/tipoService";
import { useContextoTipo } from "../../context/ContextoTipo";
import { FaSearch } from "react-icons/fa";

const GerenciarTipos = () => {
    const [isFormVisivel, setIsFormVisivel] = useState(false);
    const [isFormBuscarVisivel, setIsFormBuscarVisivel] = useState(false);
    const [acaoForm, setAcaoForm] = useState('criar');
    const [isPlusBtnEnabled, setIsPlusBtnEnabled] = useState(false);
    const [nomeTipo, setNomeTipo] = useState(''); // Estado para armazenar o valor do campo de entrada
    const { dadosTipo, setDadosTipo, setTipos } = useContextoTipo();

    const handleCancelar = () => {
        setAcaoForm('criar');
        setDadosTipo(null);
        setIsFormVisivel(false);
        setIsPlusBtnEnabled(false);
    };

    const handleReload = () => {
        setIsFormVisivel(false);
        setIsPlusBtnEnabled(false);
        setTipos([]);
    };

    const handleAdicionarTipo = () => {
        setDadosTipo(null);
        setIsFormVisivel(true);
        setIsFormBuscarVisivel(false);
        setAcaoForm('criar');
        setIsPlusBtnEnabled(true);
    };

    const handleAtualizarTipo = (record) => {
        setIsFormVisivel(true);
        setAcaoForm('atualizar');
        setDadosTipo(record);
    };

    const handleSalvarTipo = async (dados) => {
        if (acaoForm === 'criar') {
            await criarTipo(dados);
        } else if (acaoForm === 'atualizar') {
            await atualizarTipo(dadosTipo.id, dados);
        }
        handleReload();
    };

    const handleBuscarTipoPeloNome = async () => {
        const response = await buscarTipo(nomeTipo); // Passando o nomeTipo para a função de busca
        setTipos(response.data);
    };

    const handleExcluirTipo = async (id) => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Você está seguro de que deseja excluir este(s) item(s) ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                await excluirTipo(id);
                handleReload();
            }
        });
    };

    return (
        <div>
            <Titulo 
                titulo='Categorias'
                paragrafo='Categorias > Gerenciar categorias'
            />

            <div className="button-menu">
                <Button 
                    icon={<FaSearch />}
                    type="primary"
                    onClick={() => setIsFormBuscarVisivel(!isFormBuscarVisivel)}
                >
                    Buscar
                </Button>

                <Button 
                    icon={<FaPlus />} 
                    type="primary" 
                    onClick={handleAdicionarTipo}
                    disabled={isPlusBtnEnabled}
                > 
                    Criar Categoria 
                </Button>
            </div>

            { isFormBuscarVisivel && (
                <div className="global-div" style={{width: '50%'}}>
                    <Form layout="vertical">
                        <Form.Item 
                            name="nome_tipo"
                            label="Nome" 
                            rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
                        >
                            <Input 
                                type="text" 
                                name="nome_tipo" 
                                placeholder="informe o nome da categoria"
                                value={nomeTipo} // Ligando o valor do campo de entrada ao estado
                                onChange={(e) => setNomeTipo(e.target.value)} // Atualizando o estado ao alterar o valor do campo de entrada
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" onClick={handleBuscarTipoPeloNome}>
                                Buscar
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            )}

            <div className="global-div">
                { isFormVisivel ? (
                        <FormTipo onSubmit={handleSalvarTipo} onCancel={handleCancelar}/>
                ) : (
                    <ListaTipos onEdit={handleAtualizarTipo} onDelete={handleExcluirTipo}/>

                )}
            </div>

        </div>
    );
}

export default GerenciarTipos;
