import { Button, Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import { listarProjetos } from "../../../../services/projetoService";
import { handleError } from "../../../../services/utils";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";
import { listarMembros } from "../../../../services/membroService";
import { useMembroContexto } from "../../context/MembroContexto";
import Loading from "../../../../components/Loading/Loading";

const FormMembroProjeto = ({titleForm, onSubmit, onCancel}) => {

    const {dadosMembroProjeto} = useMembroContexto()
    const [optionsProjetos, setOptionsProjetos] = useState([])
    const [optionsMembros, setOptionsMembros] = useState([])
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await handleGetMembros()
                await handleGetProjetos()

                if (dadosMembroProjeto !== null){
                    form.setFieldsValue(dadosMembroProjeto)
                } else {
                    form.resetFields()
                }
                
            } catch (error) {
            } finally {
                setLoading(false);
            }

        }
        fetchData()
    }, [dadosMembroProjeto])

    if (loading) {
        return <Loading />
    }

    const handleGetProjetos = async () => {
        try {
            const response = await listarProjetos()

            if(!response.error){
                const resultados = response.data.map((item) => ({
                    value: item.id,
                    label: item.nome
                }));
                setOptionsProjetos(resultados);
            }
        } catch (error) {
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
        }
    }

    const handleGetMembros = async () => {
        try {
            const response = await listarMembros()
            const resultados = response.data.map((item) => {
                return {
                    value: item.id,
                    label: `${item.nome} (${item.nome_grupo})`,
                }
            })
            setOptionsMembros(resultados)
        
        } catch (error) {   
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
        }
    }
 
    return (
        <Form 
            form={form}
            className="global-form"
            layout="vertical"
            onFinish={onSubmit}
        >
            <Form.Item>
                <h4 className='global-title'> {titleForm} </h4>
            </Form.Item>

            <Form.Item
                name="projeto" 
                rules={[{ required: true, message: 'Por favor, selecione uma opção!'}]}
            >
                <Select
                    showSearch
                    allowClear
                    placeholder="Pesquise ou selecione o projeto"
                    options={optionsProjetos}
                    filterOption={(input, option) =>
                        option?.label.toLowerCase().includes(input.toLowerCase())
                    }
                />
            </Form.Item>

            <Form.Item
                name="membros"
                rules={[{required: true, message: 'Por favor, selecione pelo menos um membro!'}]}
            >
                <Select 
                    mode="multiple"
                    showSearch
                    allowClear
                    placeholder="Pesquise ou selecione os membros"
                    options={optionsMembros}
                    filterOption={(input, option) =>
                        option?.label.toLowerCase().includes(input.toLowerCase())
                    }
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" > Salvar </Button>
                <Button 
                    type="primary" 
                    style={{marginLeft: '10px'}} 
                    danger 
                    onClick={() => onCancel()}
                > Cancelar
                </Button>
            </Form.Item>
        </Form>
    )
}

export default FormMembroProjeto;
