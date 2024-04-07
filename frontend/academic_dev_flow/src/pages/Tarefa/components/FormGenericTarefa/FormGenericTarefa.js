import { Button, Form, Input, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { useEffect, useState } from 'react'
import { useContextoTarefa } from '../../context/ContextoTarefa';
import { listarMembrosPeloIdProjeto } from '../../../../services/membroProjetoService';
import { listarIteracoesPorProjeto } from '../../../../services/iteracaoService';
import Loading from '../../../../components/Loading/Loading';


const baseStyle = {
    display: "flex",
    gap: "20px",
    flexDirection: "row"
};


function FormGenericTarefa ({onCancel, onSubmit, addtionalFields}) {

    const [form] = useForm()
    const {dadosProjeto, dadosTarefa} = useContextoTarefa()
    const [optionsMembros, setOptionsMembros] = useState(null)
    const [optionsIteracoes, setOptionsIteracoes] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleGetMembros = async () => {
        const response = await listarMembrosPeloIdProjeto(dadosProjeto.id)

        if (response.data.length > 0){
            const resultados = response.data.map((item) => {

                return {
                    value: item.id_membro_projeto,
                    label: `${item.nome_membro} (${item.grupo_membro})`
                }
            })

            setOptionsMembros(resultados)
        } 
    }

    const handleGetIteracoes = async () => {
        const response = await listarIteracoesPorProjeto(dadosProjeto.id)

        if (response.data.length > 0) {
            const iteracoesOrdenadas = response.data.sort((a, b) => a.numero - b.numero);

            const resultados = iteracoesOrdenadas.map((item) => {
                return {
                    value: item.id,
                    label: item.nome
                }
            })


            setOptionsIteracoes(resultados)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (dadosProjeto !== null ){
                await handleGetMembros()
                await handleGetIteracoes()

                if (dadosTarefa !== null){

                    const membrosValue = dadosTarefa.membros ? 
                        dadosTarefa.membros.map(membro => (membro.id_membro_projeto)) 
                        : undefined;

                    form.setFieldsValue({
                        ...dadosTarefa,
                        membros: membrosValue
                    });
                }

                setLoading(false)
                
            }
        }

        fetchData()

    }, [dadosProjeto, dadosTarefa])

    if(loading){
        return <Loading />
    }

    return (

        <Form form={form} layout='vertical' className='global-form' onFinish={onSubmit}>
            <Form.Item>
                <h4> CADASTRAR TAREFA </h4>
            </Form.Item>

            {addtionalFields}

            <Form.Item label="Nome" name="nome">
                <Input type='text' name='nome' />
            </Form.Item>

            <Form.Item label="Prazo (em dias)" name="prazo">
                <Input type='number' name='prazo'/>
            </Form.Item>

    
            <Form.Item label="Iteração" name="iteracao">
                <Select
                    allowClear
                    placeholder="Selecione"
                    options={optionsIteracoes}
                    name="iteracao"
                />
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

            <Form.Item label="Descrição" name="descricao">
                <Input.TextArea rows={4} name='descricao' />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType='submit'> Salvar </Button>
                <Button style={{marginLeft: "10px"}} onClick={onCancel}> Cancelar </Button>
            </Form.Item>
        </Form>
    )
}

export default FormGenericTarefa