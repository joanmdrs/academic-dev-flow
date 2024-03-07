import { Button, Form, Input, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { useEffect, useState } from 'react'
import { useFormContext } from '../../../context/Provider/Provider';
import { listarMembrosPeloIdProjeto } from '../../../../../../services/membroProjetoService';

const baseStyle = {
    display: "flex",
    gap: "20px",
    flexDirection: "row"
};


const FormTarefa = () => {

    const [form] = useForm()
    const {dadosProjeto} = useFormContext()
    const [optionsMembros, setOptionsMembro] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            if (dadosProjeto != null ){
                await handleGetMembros()
                
            }
        }

        fetchData()

    }, [dadosProjeto])

    const handleGetMembros = async () => {
        const response = await listarMembrosPeloIdProjeto(dadosProjeto.id)

        const resultados = response.data.map((item) => {

            return {
                value: item.id_membro_projeto,
                label: `${item.nome_membro} (${item.grupo_membro})`
            }
        })

        setOptionsMembro(resultados)
    }

    return (

        <div>
            <Form form={form} layout='vertical' className='global-form'>
                <Form.Item>
                    <h4> CADASTRAR TAREFA </h4>
                </Form.Item>

                <div style={{...baseStyle}}> 
                    <Form.Item label="Nome" name="nome" style={{ flex: "1"}}>
                        <Input type='text' name='nome' />
                    </Form.Item>

                    <Form.Item label="Prazo (em dias)" name="prazo" >
                        <Input type='number' name='prazo'/>
                    </Form.Item>

                    <Form.Item label="Atribuir à" name="membros" style={{ flex: "1"}}>
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
                    <Button style={{marginLeft: "10px"}}> Cancelar </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default FormTarefa