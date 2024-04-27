import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { listarEtapasPorFluxo } from "../../../../services/fluxoEtapaService";
import { buscarEtapaPeloId } from "../../../../services/etapaService";
import { listarMembrosPorProjeto } from "../../../../services/membroProjetoService";
import { buscarMembroPeloId } from "../../../../services/membroService";
import { atualizarIteracao, criarIteracao } from "../../../../services/iteracaoService";
import Loading from "../../../../components/Loading/Loading";
import { optionsStatusIteracoes } from "../../../../services/optionsStatus";
import { useContextoIteracao } from "../../context/contextoIteracao";

const FormIteracao = ({onSubmit, onCancel, onReload, additionalFields}) => {

    const { dadosProjeto, dadosIteracao } = useContextoIteracao();
    const [form] = useForm();
    const [optionsEtapas, setOptionsEtapas] = useState([]);
    const [optionsMembros, setOptionsMembros] = useState([]);
    

    const handleGetEtapas = async () => {
        const response = await listarEtapasPorFluxo(dadosProjeto.fluxo)

        if (response.status === 200){

            const promises = await response.data.map( async (objeto) => {
                const response2 = await buscarEtapaPeloId(objeto.etapa)

                return {
                    value: objeto.id,
                    label: response2.data.nome
                }
            })

            const results = (await Promise.all(promises))
            setOptionsEtapas(results)
        }
    }

    const handleGetMembros = async () => {
        const response = await listarMembrosPorProjeto(dadosProjeto.id)

        if (response.status === 200){

            const promises = await response.data.map(async (objeto) => {
                const response2 = await buscarMembroPeloId(objeto.membro)

                return {
                    value: objeto.id,
                    label: `${response2.data.nome} (${response2.data.grupo})`
                }
            })
            const results = (await Promise.all(promises))
            setOptionsMembros(results)
        }
    }


    useEffect(() => {
        const fetchData = async () => {
            if (dadosProjeto !== null) {
                await handleGetEtapas();
                await handleGetMembros();

            } else {
                setOptionsEtapas([])
                setOptionsMembros([])
            }
        };

        fetchData();
    }, [dadosProjeto, dadosIteracao, form]);
    
    return (
            <Form layout="vertical" className="global-form" form={form} onFinish={onSubmit}>
                <Form.Item>
                    <h4> CADASTRAR ITERAÇÃO </h4>
                </Form.Item>

                <Form.Item>
                    {additionalFields}
                </Form.Item>

                <div style={{display: 'flex', gap: '20px'}}> 
                    <div style={{flex: '2'}}> 
                        <Form.Item label="Nome" name="nome" style={{ flex: "1"}}>
                            <Input type='text' name="nome" placeholder="nome" />
                        </Form.Item>

                        <Form.Item label="Descrição" name="descricao">
                            <Input.TextArea  rows={6} name="descricao" placeholder="descrição ..."/>
                        </Form.Item>

                        <div style={{display: 'flex', gap: '10px'}}> 
                            <Form.Item label="Número" name="numero" >
                                <Input type="number" name="numero" style={{width: 'fit-content'}} placeholder="número" />
                            </Form.Item> 

                            <Form.Item label="Data de Início" name="data_inicio">
                                <Input type="date" name="data_inicio" style={{width: 'fit-content'}}/>
                            </Form.Item>

                            <Form.Item label="Data de Término" name="data_fim">
                                <Input type="date" name="data_fim" style={{width: 'fit-content'}}/>
                            </Form.Item>
                        </div>
                    </div>
                
                    <div style={{flex: '1'}}> 
                        <Form.Item label="Status" name="status" style={{ flex: "1"}}>
                            <Select options={optionsStatusIteracoes} defaultValue="Selecione"/>
                        </Form.Item>
                
                        <Form.Item label="Fase" name="fase" style={{ flex: "1"}}>
                            <Select options={optionsEtapas} defaultValue="Selecione" />
                        </Form.Item>

                        <Form.Item label="Líder" name="lider" style={{ flex: "1"}}>
                            <Select options={optionsMembros} defaultValue="Selecione" />
                        </Form.Item>
                    </div>
                </div>
                      
          
                <Form.Item>
                    <Button style={{marginRight: '10px'}} type="primary" htmlType="submit"> Salvar </Button>
                    <Button onClick={onCancel}> Cancelar </Button>
                </Form.Item>
                
            </Form>
    )
}

export default FormIteracao