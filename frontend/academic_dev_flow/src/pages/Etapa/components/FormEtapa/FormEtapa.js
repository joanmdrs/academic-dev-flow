import React, { useState } from "react";
import "./FormEtapa.css";
import { Form, Input, Select, Button } from "antd";
import { useFormContext } from "../../../Fluxo/context/Provider/FormProvider";
import ListaEtapas from "../ListaEtapas/ListaEtapas";
import { MdAdd } from "react-icons/md";

const { Option } = Select;

const FormEtapa = () => {

    const [form] = Form.useForm()

    const { hasDadosEtapas, setHasDadosEtapas } = useFormContext();
    const [ hasIndiceEtapa, setHasIndiceEtapa] = useState(null);


    const handleCadastrarEtapa = (valores) => {
        const novaEtapa = {
            ...valores,
        };
        setHasDadosEtapas([...hasDadosEtapas, novaEtapa]);
    };

    const handleAtualizarEtapa = (indice, valores) => {
        const etapaAtualizada = {
            ...hasDadosEtapas[indice],
            ...valores,
        };
        const novasEtapas = [...hasDadosEtapas];
        novasEtapas[indice] = etapaAtualizada;
        hasDadosEtapas(novasEtapas);
    };


    const handleSalvarEtapas = () => {
        const valores = form.getFieldsValue()
        if (valores.nome !== undefined) {
            if (hasIndiceEtapa === null) {
                handleCadastrarEtapa(valores)
            } else {
                handleAtualizarEtapa(hasIndiceEtapa, valores);
                setHasIndiceEtapa(null); 
            }
            form.resetFields();
        }
    };

    const handleExcluirEtapa = (dados) => {
        const novaListaEtapas = hasDadosEtapas.filter(etapa => etapa !== dados);
        setHasDadosEtapas(novaListaEtapas);
    };

    const handleAlterarCamposForm = (dados, indice) => {
        form.setFields([
            { name: 'nome', value: dados.nome },
            { name: 'descricao', value: dados.descricao },
            { name: 'data_inicio', value: dados.data_inicio },
            { name: 'data_fim', value: dados.data_fim },
            { name: 'status', value: dados.status }
        ]);

        setHasIndiceEtapa(indice);
    };

    return (
        <div className="">
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
                <Button type="primary" onClick={handleSalvarEtapas} className="botao-adicionar-etapa"> 
                    <MdAdd size="15px" />
                    Adicionar 
                </Button>

                {hasDadosEtapas.length > 0 && (
                    <React.Fragment>
                        <ListaEtapas 
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

export default FormEtapa;
