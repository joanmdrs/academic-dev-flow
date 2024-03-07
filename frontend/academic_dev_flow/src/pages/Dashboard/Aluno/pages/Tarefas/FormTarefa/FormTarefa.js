import { Button, Form, Input, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { useEffect, useState } from 'react'

const baseStyle = {
    display: "flex",
    gap: "20px"
};


const FormTarefa = () => {

    const [form] = useForm()
    const [optionsMembros, setOptionsMembro] = useState(null)


    return (

        <div>
            <Form form={form} layout='vertical'>

                <div style={{baseStyle}}> 
                    <Form.Item label="Nome" name="nome">
                        <Input type='text' name='nome' />
                    </Form.Item>

                    <Form.Item label="Prazo (em dias)" name="prazo">
                        <Input type='number' name='prazo'/>
                    </Form.Item>

                    <Form.Item label="Atribuir à" name="membros">
                        <Select
                            mode="multiple"
                            allowClear
                            style={{
                                width: '100%',
                            }}
                            placeholder="Selecione"
                            options={optionsMembros}
                            name="membros"
                        />
                    </Form.Item>

                </div>

                <Form.Item label="Descrição" name="descricao">
                    <Input.TextArea rows={4} name='descricao' />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType='submit'> Salvar </Button>
                    <Button> Cancelar </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default FormTarefa