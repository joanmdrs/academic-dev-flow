import React, { useEffect, useState } from 'react'
import {Form, Input, Button} from 'antd'
import { FaArrowsRotate } from "react-icons/fa6";
import { gerarCorAleatoria, lightenDarkenColor } from '../../../../services/utils';
import { useContextoCategoriaTarefa } from '../../context/ContextoCategoriaTarefa';

const FormCategoriaTarefa = ({onSubmit, onCancel}) => {

    const [cor, setCor] = useState('');
    const [corClara, setCorClara] = useState('')
    const {dadosCategoria} = useContextoCategoriaTarefa()
    const [form] = Form.useForm()
    const [titulo, setTitulo] = useState("Cadastrar Categoria")

    useEffect(() => {
        const fetchData = async () => {

            if (dadosCategoria !== null) {
                form.setFieldsValue(dadosCategoria)
                setCor(dadosCategoria.cor)
                setTitulo("Atualizar Categoria")

            } else {
                form.resetFields()
                setTitulo("Cadastrar Categoria")
                handleGerarCor()
            }
        }

        fetchData()
    }, [dadosCategoria])

    const handleGerarCor = () => {
        const color = gerarCorAleatoria()
        const lightColor = lightenDarkenColor(color, 60)
        setCor(color)
        setCorClara(lightColor)
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
            <Form.Item label="Nome" name="nome" rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}>
                <Input type='text' name='nome' placeholder='nome'/> 
            </Form.Item>

            <Form.Item label='Descrição' name='descricao'>
                <Input.TextArea type='text' name='descricão' placeholder='descrição (opcional)' rows={4} />
            </Form.Item>

            <div style={{display: 'flex', alignItems: 'flex-end', gap: '10px'}}> 
                <Form.Item label='Cor' required>
                    <Button 
                        style={{backgroundColor: `${cor}`, color: `${corClara}`, border: `1px solid ${corClara}`}} 
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

export default FormCategoriaTarefa