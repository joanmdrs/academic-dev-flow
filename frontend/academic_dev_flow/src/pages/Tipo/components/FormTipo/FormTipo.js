import React, { useEffect, useState } from 'react'
import {Form, Input, Button} from 'antd'
import { FaArrowsRotate } from "react-icons/fa6";

const FormTipo = () => {

    const [cor, setCor] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            gerarCorAleatoria()
        }

        fetchData()
    }, [])

    const gerarCorAleatoria = () => {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        setCor(randomColor);
    };

    return (
        <Form>
            <Form.Item label="Nome" name="nome">
                <Input type='text' name='nome'/> 
            </Form.Item>

            <Form.Item label='Descrição' name='descricao'>
                <Input type='text' name='descricão' />
            </Form.Item>

            <Form.Item label='Cor' name='cor'>
                <Button style={{backgroundColor: `${cor}`}} onClick={gerarCorAleatoria}> <FaArrowsRotate /> </Button>
                <Input type='text' name='cor' value={cor}/>
            </Form.Item>

            <Form.Item> 
                <Button type='primary' htmlType='submit'> Salvar </Button>
                <Button type='dashed'> Cancelar </Button>
            </Form.Item>

        </Form>
    )
}

export default FormTipo