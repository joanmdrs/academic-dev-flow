import React, { useEffect, useState } from 'react'
import {Form, Input, Button} from 'antd'
import { FaArrowsRotate } from "react-icons/fa6";
import { gerarCorAleatoria, lightenDarkenColor } from '../../../../services/utils';

const FormTipo = () => {

    const [cor, setCor] = useState('');
    const [corClara, setCorClara] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            handleGerarCor()
        }

        fetchData()
    }, [])

    const handleGerarCor = () => {
        const color = gerarCorAleatoria()
        const lightColor = lightenDarkenColor(color, 60)
        setCor(color)
        setCorClara(lightColor)
    }


    const handleAlterarCor = ({target: {value}}) => {
        setCor(value)
    }

    return (
        <Form className='global-form' layout='vertical'>

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
                        <Input type='text' name='cor' value={cor} onChange={handleAlterarCor}/>
                    </Form.Item>
                </div>

                <Form.Item> 
                    <Button type='primary' htmlType='submit'> Salvar </Button>
                    <Button type='dashed'> Cancelar </Button>
                </Form.Item>
            </div>

        </Form>
    )
}

export default FormTipo