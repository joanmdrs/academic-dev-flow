import React, { useEffect, useState } from 'react'
import {Form, Input, Button} from 'antd'
import { FaArrowsRotate } from "react-icons/fa6";
import { gerarCorAleatoria, lightenDarkenColor } from '../../../../services/utils';
import { useContextoTipo } from '../../context/ContextoTipo';

const FormTipo = ({onSubmit, onCancel}) => {

    const [cor, setCor] = useState('');
    const [corClara, setCorClara] = useState('')
    const {dadosTipo} = useContextoTipo()
    const [form] = Form.useForm()

    useEffect(() => {
        const fetchData = async () => {

            if (dadosTipo !== null) {
                form.setFieldsValue(dadosTipo)
                setCor(dadosTipo.cor)

            } else {
                form.resetFields()
                handleGerarCor()
            }
        }

        fetchData()
    }, [dadosTipo])

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
        <Form form={form} className='global-form' layout='vertical' onFinish={handleFormSubmit}>

            <div style={{display: 'flex', gap: '20px', alignItems: 'flex-end'}}> 
                <Form.Item label="Nome" name="nome">
                    <Input type='text' name='nome'/> 
                </Form.Item>

                <Form.Item label='Descrição' name='descricao'>
                    <Input type='text' name='descricão' />
                </Form.Item>

                <div style={{display: 'flex', alignItems: 'flex-end', gap: '10px'}}> 
                    <Form.Item label='Cor'>
                        <Button 
                            style={{backgroundColor: `${cor}`, color: `${corClara}`, border: `1px solid ${corClara}`}} 
                            onClick={handleGerarCor}
                        > 
                            <FaArrowsRotate /> 
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Input type='text' value={cor} onChange={handleAlterarCor}/>
                    </Form.Item>
                </div>

                <Form.Item> 
                    <Button type='primary' htmlType='submit'> Salvar </Button>
                    <Button type='dashed' onClick={onCancel}> Cancelar </Button>
                </Form.Item>
            </div>

        </Form>
    )
}

export default FormTipo