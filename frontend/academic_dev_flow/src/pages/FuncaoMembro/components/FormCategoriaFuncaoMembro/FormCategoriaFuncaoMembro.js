import React, { useEffect, useState } from 'react'
import {Form, Input, Button} from 'antd'
import { useFuncaoMembroContexto } from '../../context/FuncaoMembroContexto';

const FormCategoriaFuncaoMembro = ({onSubmit, onCancel}) => {

    const {dadosCategoriaFuncaoMembro} = useFuncaoMembroContexto()
    const [form] = Form.useForm()
    const [titulo, setTitulo] = useState("CADASTRAR CATEGORIA")

    useEffect(() => {
        const fetchData = async () => {

            if (dadosCategoriaFuncaoMembro !== null) {
                form.setFieldsValue(dadosCategoriaFuncaoMembro)
                setTitulo("ATUALIZAR CATEGORIA")

            } else {
                form.resetFields()
                setTitulo("CADASTRAR CATEGORIA")
            }
        }

        fetchData()
    }, [dadosCategoriaFuncaoMembro])




    return (
        <Form 
            form={form} 
            className='global-form' 
            layout='vertical' 
            onFinish={onSubmit}
        >
            <Form.Item>
                <h4> {titulo} </h4>
            </Form.Item>

            <Form.Item label="Nome" name="nome" rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}>
                <Input type='text' name='nome' placeholder='nome'/> 
            </Form.Item>

            <Form.Item label='Descrição' name='descricao'>
                <Input type='text' name='descricão' placeholder='descrição (opcional)' />
            </Form.Item>

            
            <div style={{display: 'flex', gap: '10px'}}>
                <Form.Item> 
                    <Button type='primary' htmlType='submit'> Salvar </Button>
                </Form.Item>
                
                <Form.Item>
                    <Button type='primary' danger onClick={onCancel}> Cancelar </Button>
                </Form.Item>

            </div>
        </Form>
    )
}

export default FormCategoriaFuncaoMembro