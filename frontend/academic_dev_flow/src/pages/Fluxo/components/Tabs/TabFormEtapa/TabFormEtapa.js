import React, { useState } from "react";
import "./TabFormEtapa.css";
import { Form, Input, Select, Button } from "antd";
import { useFormContext } from "../../../context/Provider/FormProvider";
import { MdAdd } from "react-icons/md";
import ViewDetalhesEtapas from "../../ViewDetalhesEtapas/ViewDetalhesEtapas";
import { NotificationManager } from "react-notifications";
import { atualizarEtapa, criarEtapa, excluirEtapa } from "../../../../../services/etapa_service";

const TabFormEtapa = () => {

    // Variáveis 

    const { Option } = Select;

    const [form] = Form.useForm()

    const { 
        hasDadosFluxo, 
        hasDadosEtapas, 
        setHasDadosEtapas, 
        acaoFormEtapa,
        setAcaoFormEtapa
    } = useFormContext();

    const [ hasIndiceEtapa, setHasIndiceEtapa] = useState(null); // utilizada para saber o indice da etapa 
    const [ isIdEtapaAtualizar, setIsIdEtapaAtualizar] = useState(null) // variável utilizada para saber o id da etapa a ser atualizada


    // Funções

    const handleAdicionarEtapaNaLista = async (valores) => {
        const novaEtapa = {
            ...valores,
        };
        await setHasDadosEtapas([...hasDadosEtapas, novaEtapa]);
    };

    const handleAtualizarEtapaDaLista = async (valores) => {
        const etapaAtualizada = {
            ...hasDadosEtapas[hasIndiceEtapa],
            ...valores,
        };
        const novasEtapas = [...hasDadosEtapas];
        novasEtapas[hasIndiceEtapa] = etapaAtualizada;
        await setHasDadosEtapas(novasEtapas);
    };

    const handleSalvarEtapaNaLista = async (valores) => {
        if (hasIndiceEtapa === null) {
            await handleAdicionarEtapaNaLista(valores)
        } else {
            await handleAtualizarEtapaDaLista(valores);
            setHasIndiceEtapa(null); 
        }
        form.resetFields();
    };

    const handleRemoverEtapaDaLista = async (idEtapa) => {
        
    
    }

    const handleAlterarCamposForm = (dados, indice) => {
        form.setFields([
            { name: 'nome', value: dados.nome },
            { name: 'descricao', value: dados.descricao },
            { name: 'data_inicio', value: dados.data_inicio },
            { name: 'data_fim', value: dados.data_fim },
            { name: 'status', value: dados.status }
        ]);
        setIsIdEtapaAtualizar(dados.id)
        setAcaoFormEtapa('atualizar')
        setHasIndiceEtapa(indice);
    };

    const handleCriarEtapa = async () => {
        try {
            const dadosForm = form.getFieldsValue()
            const idFluxo = hasDadosFluxo.id
            const resposta = await criarEtapa(dadosForm, idFluxo)

            if(resposta.status === 200){
                handleSalvarEtapaNaLista(resposta.data)
                NotificationManager.success("Etapa vinculada ao fluxo!")
            } else {
                NotificationManager.error("Falha ao vincular a etapa ao fluxo, contate o suporte!")
            }
        } catch (error) {
            NotificationManager.error('Ocorreu um problema durante a operação, contate o suporte!');
        }

    }

    const handleAtualizarEtapa = async () => {
        try {
            const dadosForm = form.getFieldsValue()
            const idEtapa = isIdEtapaAtualizar
            const idFluxo = hasDadosFluxo.id
            const resposta = await atualizarEtapa(dadosForm, idEtapa, idFluxo)

            if(resposta.status === 200){
                handleSalvarEtapaNaLista(resposta.data)
                setAcaoFormEtapa('criar')
                NotificationManager.success("Etapa atualizada com sucesso!")
            } else {
                NotificationManager.error("Falha ao atualizar os dados da etapa, contate o suporte!")
            }
        } catch (error) {
            NotificationManager.error('Ocorreu um problema durante a operação, contate o suporte!');
        }
    }

    const handleSubmeterForm = async () => {
        if (acaoFormEtapa === 'criar'){
            await handleCriarEtapa();
        } else if(acaoFormEtapa === 'atualizar'){
            await handleAtualizarEtapa();
        }
    }

    const handleExcluirEtapa = async (idEtapa) => {
        try {
            const resposta = await excluirEtapa(idEtapa)

            if (resposta.status === 204){
                await handleRemoverEtapaDaLista(idEtapa)
                NotificationManager.success('Etapa excluída com sucesso!')
            } else {
                NotificationManager.error('Falha ao tentar excluir a etapa, contate o suporte!')
            }
        } catch (error) {
            NotificationManager.error('Ocorreu um problema durante a operação, contate o suporte!');
        }
    };

    return (
        <div>
            <div className="form-box component-form-etapa">
                <h4> INCLUIR ETAPA </h4>
                <Form form={form} layout="vertical">
                    <div className="input-nome-e-descricao">
                        <Form.Item name="nome" label="Nome">
                            <Input />
                        </Form.Item>

                        <Form.Item name="descricao" label="Descrição">
                            <Input.TextArea rows={6} />
                        </Form.Item>
                    </div>

                    <div>
                        <Form.Item name="data_inicio" label="Data Início">
                            <Input type="date" />
                        </Form.Item>

                        <Form.Item name="data_fim" label="Data Fim">
                            <Input type="date" />
                        </Form.Item>

                        <Form.Item name="status" label="Status">
                            <Select id="status" name="status">
                                <Option value=""></Option>
                                <Option value="Cancelada">Cancelada</Option>
                                <Option value="Em andamento">Em andamento</Option>
                                <Option value="Concluída">Concluída</Option>
                            </Select>
                        </Form.Item>
                        
                    </div>
                    
                </Form>
                <Button type="primary" className="botao-adicionar-etapa" onClick={handleSubmeterForm}> 
                    <MdAdd size="15px" />
                    Adicionar etapa
                </Button>

                {hasDadosEtapas.length > 0 && (
                    <React.Fragment>
                        <ViewDetalhesEtapas 
                            dadosEtapas={hasDadosEtapas} 
                            funcaoBotaoEditar={handleAlterarCamposForm}
                            funcaoBotaoExcluir={handleExcluirEtapa} 
                        />
                    </React.Fragment>
                    
                )}
            </div>
        </div>
    );
};

export default TabFormEtapa;
