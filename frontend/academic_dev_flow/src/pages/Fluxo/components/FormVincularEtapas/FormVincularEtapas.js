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
    const [titleForm, setTitleForm] = useState('Vincular Etapa ao Fluxo')

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
                setTitleForm('Atualizar Etapa do Fluxo')
            } else {
                form.resetFields()
                setTitleForm('Vincular Etapa ao Fluxo')
            }
            
        }

        fetchData()
    }, [dadosFluxoEtapa, form])
    const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
        <Form 
            form={form} 
            className="global-form" 
            onFinish={onSubmit} 
            layout="vertical"
        >
            <Form.Item 
                label="Fluxo" 
                name='fluxo'
                rules={[{ required: true, message: 'Por favor, selecione uma opção !' }]}
            > 
                <Select 
                    allowClear
                    placeholder="Selecione o fluxo"
                    options={optionsFluxos} 
                    showSearch
                    filterOption={filterOption}
                />
            </Form.Item>

            <Form.Item label="Ordem" name="ordem_no_fluxo" >
                <Input defaultValue={0} type="number" name="ordem_no_fluxo" placeholder="(Opcional)" />
            </Form.Item>

            <Form.Item 
                label="Etapa" 
                name="etapa"
                rules={[{ required: true, message: 'Por favor, selecione uma opção !' }]}
            >
                <Select 
                    allowClear
                    showSearch
                    placeholder="Selecione a etapa"
                    options={optionsEtapas} 
                    filterOption={filterOption}
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