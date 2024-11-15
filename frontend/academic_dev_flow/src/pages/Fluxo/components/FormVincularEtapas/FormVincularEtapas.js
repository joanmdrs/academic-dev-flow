import { Button, Form, Input, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { listarFluxos } from "../../../../services/fluxoService";
import { listarEtapas } from "../../../../services/etapaService";
import { useContextoFluxo } from "../../context/ContextoFluxo";
import { useForm } from "antd/es/form/Form";

const FormVincularEtapas = ({onSubmit, onCancel}) => {

    const [optionsFluxos, setOptionsFluxos] = useState([])
    const [optionsEtapas, setOptionsEtapas] = useState([])
    const {dadosFluxoEtapa} = useContextoFluxo()
    const [form] = useForm()
    const [titleForm, setTitleForm] = useState('VINCULAR ETAPA AO FLUXO')

    const handleListarFluxos = async () => {
        const response = await listarFluxos()
        if (!response.error){
            const resultados = response.data.map((item) => ({

                    label: item.nome,
                    value: item.id
            }))
            setOptionsFluxos(resultados)
        }
    }

    const handleListarEtapas = async () => {
        const response = await listarEtapas()
        if (!response.error){
            const resultados = response.data.map((item) => ({
                label: item.nome,
                value: item.id
            }))
            setOptionsEtapas(resultados)
        }
    }

    useEffect(() => {
        const fetchData = async () => {

            await handleListarEtapas()
            await handleListarFluxos()

            if (dadosFluxoEtapa !== null){
                form.setFieldsValue(dadosFluxoEtapa)
                setTitleForm('ATUALIZAR ETAPA DO FLUXO')
            } else {
                form.resetFields()
                setTitleForm('VINCULAR ETAPA AO FLUXO')
            }
            
        }

        fetchData()
    }, [dadosFluxoEtapa, form])
    
    return (
        <Form form={form} className="global-form" onFinish={onSubmit}>
            <Form.Item>
                <h4> {titleForm} </h4>
            </Form.Item>

            <Form.Item 
                label="Fluxo" 
                name='fluxo'
                rules={[{ required: true, message: 'Por favor, selecione uma opção !' }]}
            > 
                <Select 
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Selecione o fluxo"
                    options={optionsFluxos} 
                />
            </Form.Item>

            <Form.Item  label="Ordem" name="ordem_no_fluxo">
                <Input type="number" name="ordem_no_fluxo" placeholder="(Opcional)" />
            </Form.Item>

            <Form.Item 
                label="Etapa" 
                name="etapa"
                rules={[{ required: true, message: 'Por favor, selecione uma opção !' }]}
            >
                <Select 
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Selecione a etapa"
                    options={optionsEtapas} 
                />
            </Form.Item>

            <Space>
                <Button type="primary" htmlType="submit"> Salvar </Button>
                <Button onClick={() => onCancel()} type="primary" danger> Cancelar </Button>
            </Space>
        </Form>
    )
}

export default FormVincularEtapas