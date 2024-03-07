import { Button, Form, Input, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { useEffect, useState } from 'react'
import { useFormContext } from '../../../context/Provider/Provider';
import { listarMembrosPeloIdProjeto } from '../../../../../../services/membroProjetoService';
import { listarIteracoesPorProjeto } from '../../../../../../services/iteracaoService';

const baseStyle = {
    display: "flex",
    gap: "20px",
    flexDirection: "row"
};


const FormTarefa = ({onCancel, onSubmit}) => {

    const [form] = useForm()
    const {dadosProjeto} = useFormContext()
    const [optionsMembros, setOptionsMembros] = useState(null)
    const [optionsIteracoes, setOptionsIteracoes] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            if (dadosProjeto != null ){
                await handleGetMembros()
                await handleGetIteracoes()
                
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

        setOptionsMembros(resultados)
    }

    const handleGetIteracoes = async () => {
        const response = await listarIteracoesPorProjeto(dadosProjeto.id)
        const iteracoesOrdenadas = response.data.sort((a, b) => a.numero - b.numero);

        const resultados = iteracoesOrdenadas.map((item) => {
            return {
                value: item.id,
                label: item.nome
            }
        })


        setOptionsIteracoes(resultados)
    }

    return (

        <div>
            <Form form={form} layout='vertical' className='global-form' onFinish={onSubmit}>
                <Form.Item>
                    <h4> CADASTRAR TAREFA </h4>
                </Form.Item>

                <div style={{...baseStyle}}> 
                    <Form.Item label="Nome" name="nome" style={{ flex: "1"}}>
                        <Input type='text' name='nome' />
                    </Form.Item>

                    <Form.Item label="Prazo (em dias)" name="prazo" style={{flex: "1"}}>
                        <Input type='number' name='prazo'/>
                    </Form.Item>

                    

                </div>

                <div style={{...baseStyle}}>
                    <Form.Item label="Iteração" name="iteracao" style={{ flex: "1"}}>
                        <Select
                            allowClear
                            style={{
                                width: '100%',
                            }}
                            placeholder="Selecione"
                            options={optionsIteracoes}
                            name="iteracao"
                        />
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
                    <Button style={{marginLeft: "10px"}} onClick={onCancel}> Cancelar </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default FormTarefa