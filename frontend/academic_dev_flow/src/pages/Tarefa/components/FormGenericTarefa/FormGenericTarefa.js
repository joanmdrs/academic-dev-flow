import { Button, Form, Input, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { useEffect, useState } from 'react'
import { useContextoTarefa } from '../../context/ContextoTarefa';
import { listarMembrosPeloIdProjeto } from '../../../../services/membroProjetoService';
import { listarIteracoesPorProjeto } from '../../../../services/iteracaoService';
import Loading from '../../../../components/Loading/Loading';
import { customizeRequiredMark } from '../../../../components/LabelMask/LabelMask';
import { listarTipos } from '../../../../services/tipoService';


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
    const [optionsTipos, setOptionsTipos] = useState(null)
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

    const handleGetTipos = async () => {
        const response = await listarTipos()

        if (response.data.length > 0){
            const resultados = response.data.map((item) => {
                return {
                    value: item.id,
                    label: item.nome
                }
            })
            setOptionsTipos(resultados)

        }

    }

    useEffect(() => {
        const fetchData = async () => {
            if (dadosProjeto !== null ){
                await handleGetMembros()
                await handleGetIteracoes()
                await handleGetTipos()

                if (dadosTarefa !== null){

                    const membrosValue = dadosTarefa.membros ? 
                        dadosTarefa.membros.map(membro => (membro.id_membro_projeto)) 
                        : undefined;

                    form.setFieldsValue({
                        ...dadosTarefa,
                        membros: membrosValue
                    });
                } else {
                    form.resetFields()
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

        <Form requiredMark={customizeRequiredMark} form={form} layout='vertical' className='global-form' onFinish={onSubmit}>
            <Form.Item>
                <h4> CADASTRAR TAREFA </h4>
            </Form.Item>

            <div style={baseStyle}>
                <Form.Item label="Nome" name="nome" required style={{flex: '1'}}>
                    <Input type='text' name='nome' />
                </Form.Item>

                <Form.Item label="Data de Início" name="data_inicio" required>
                    <Input type='date' name='data_inicio' />
                </Form.Item>

                <Form.Item label="Data de Término (Previsão)" name="data_termino" required>
                    <Input type='date' name='data_termino' />
                </Form.Item>
            </div>

            <div style={baseStyle}> 
                <Form.Item label="Iteração" name="iteracao" required style={{flex: '1'}}>
                    <Select
                        allowClear
                        placeholder="Selecione"
                        options={optionsIteracoes}
                        name="iteracao"
                    />
                </Form.Item>

                <Form.Item label="Atribuir à" name="membros" required style={{flex: '1'}}>
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

                <Form.Item label='Tipo' name='tipo' required style={{flex: '1'}}>
                    <Select
                        allowClear
                        style={{
                            width: '100%',
                        }}
                        placeholder="Selecione"
                        options={optionsTipos}
                        name="tipo"
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
    )
}

export default FormGenericTarefa