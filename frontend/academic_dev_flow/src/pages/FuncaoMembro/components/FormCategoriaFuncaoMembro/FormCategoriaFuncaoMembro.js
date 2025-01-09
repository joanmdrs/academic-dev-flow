import React, { useEffect, useState } from 'react'
import {Form, Input, Button} from 'antd'
import { useFuncaoMembroContexto } from '../../context/FuncaoMembroContexto';
import { gerarCorAleatoria } from '../../../../services/utils';
import { FaArrowsRotate } from 'react-icons/fa6';

const FormCategoriaFuncaoMembro = ({onSubmit, onCancel}) => {

    const {dadosCategoriaFuncaoMembro} = useFuncaoMembroContexto()
    const [cor, setCor] = useState('');
    const [form] = Form.useForm()
    const [titulo, setTitulo] = useState("Cadastrar Função")

    useEffect(() => {
        const fetchData = async () => {

            if (dadosCategoriaFuncaoMembro !== null) {
                setCor(dadosCategoriaFuncaoMembro.cor)
                form.setFieldsValue(dadosCategoriaFuncaoMembro)
                setTitulo("Atualizar dados da Função")

            } else {
                handleGerarCor()
                form.resetFields()
                setTitulo("Cadastrar Função")
            }
        }

        fetchData()
    }, [dadosCategoriaFuncaoMembro])

    const handleGerarCor = () => {
        const color = gerarCorAleatoria()
        setCor(color)
    }

    const handleAlterarCor = ({target: {value}}) => {
        setCor(value)
    }

    const handleFormSubmit = (values) => {
        values['cor'] = cor
        onSubmit(values);
    };

    return (
        <Form 
            form={form} 
            className='global-form' 
            layout='vertical' 
            onFinish={handleFormSubmit}
        >
            <Form.Item>
                <h4 className='global-title'> {titulo} </h4>
            </Form.Item>

            <Form.Item label="Nome" name="nome" rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}>
                <Input type='text' name='nome' placeholder='nome'/> 
            </Form.Item>

            <Form.Item label='Descrição' name='descricao'>
                <Input.TextArea rows={4} type='text' name='descricão' placeholder='descrição (opcional)' />
            </Form.Item>

            <div style={{display: 'flex', alignItems: 'flex-end', gap: '10px'}}> 
                <Form.Item label='Cor' required>
                    <Button 
                        style={{backgroundColor: `${cor}`, color: `#FFFFFF`, border: `1px solid #FFFFFF`}} 
                        onClick={handleGerarCor}
                    > 
                        <FaArrowsRotate /> 
                    </Button>
                </Form.Item>
                <Form.Item rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}>
                    <Input type='text' value={cor} onChange={handleAlterarCor}/>
                </Form.Item>
            </div>

            
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