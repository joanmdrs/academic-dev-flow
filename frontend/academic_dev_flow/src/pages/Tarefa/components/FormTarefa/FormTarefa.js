import { Button, Form, Input, Select} from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { useEffect, useState } from 'react'
import { useContextoTarefa } from '../../context/ContextoTarefa';
import { listarMembrosPeloIdProjeto } from '../../../../services/membroProjetoService';
import { listarIteracoesPorProjeto } from '../../../../services/iteracaoService';
import Loading from '../../../../components/Loading/Loading';
import { listarLabelsPorProjeto } from '../../../../services/tarefaService';
import { optionsStatusTarefas } from '../../../../services/optionsStatus';
import { handleError } from '../../../../services/utils';
import { ERROR_MESSAGE_ON_SEARCHING } from '../../../../services/messages';
import { useContextoGlobalProjeto } from '../../../../context/ContextoGlobalProjeto';
import { listarTipos } from '../../../../services/tipoService';

function FormTarefa ({onCancel, onSubmit, additionalFields}) {

    const [form] = useForm()
    const {dadosTarefa} = useContextoTarefa()
    const {dadosProjeto} = useContextoGlobalProjeto()
    const [optionsMembros, setOptionsMembros] = useState(null)
    const [optionsIteracoes, setOptionsIteracoes] = useState(null)
    const [optionsTipos, setOptionsTipos] = useState(null)
    const [optionsLabels, setOptionsLabels] = useState(null)
    const [loading, setLoading] = useState(false)
    const [titulo, setTitulo] = useState('CADASTRAR TAREFA')

    const handleGetMembros = async () => {

        try {
            const response = await listarMembrosPeloIdProjeto(dadosProjeto.id)
            const resultados = response.data.map((item) => {
                return {
                    value: item.id_membro_projeto,
                    label: `${item.nome_membro} (${item.grupo_membro})`,
                    user: item.usuario_github
                }
            })
            setOptionsMembros(resultados)
        
        } catch (error) {   
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
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
        if(!response.error && response.data) {
            const resultados = response.data.map((item) => {
                return {
                    value: item.id,
                    label: item.nome,
                    color: item.cor
                }
            })
            setOptionsTipos(resultados)
        }
    }

    const handleGetLabels = async () => {
        const response = await listarLabelsPorProjeto(dadosProjeto.id)
        if (response.data.length > 0){
            const resultados = response.data.map((item) => {
                return {
                    value: item.id,
                    label: item.nome,
                    color: item.cor
                }
            })
            setOptionsLabels(resultados)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (dadosProjeto !== null ){
                await handleGetMembros()
                await handleGetIteracoes()
                await handleGetTipos()
                await handleGetLabels()
                setLoading(false)
                if (dadosTarefa !== null){
                    form.setFieldsValue(dadosTarefa)
                    setTitulo('ATUALIZAR TAREFA')

                } else {
                    form.resetFields()
                    setTitulo('CADASTRAR TAREFA')
                }
            }
        }
        fetchData()
    }, [dadosProjeto, dadosTarefa])

    if(loading){
        return <Loading />
    }

    const handleSubmitForm = () => {
        const dadosForm = form.getFieldsValue()
        const labelsSelecionadas = dadosForm.labels.map(label => parseInt(label))

        const nomesLabels = optionsLabels
            .filter(option => labelsSelecionadas.includes(option.value))
            .map(option => option.label)

        const membrosSelecionados = dadosForm.membros

        const usuariosGithub = optionsMembros
            .filter(option => membrosSelecionados.includes(option.value))
            .map(option => option.user)
        
        dadosForm['assignees'] = usuariosGithub
        dadosForm['labelsNames'] = nomesLabels

        
        onSubmit(dadosForm)
    }

    return (

        <Form 
            form={form} 
            layout='vertical' 
            className='global-form' 
            onFinish={handleSubmitForm}
        >
            <Form.Item>
                <h4> {titulo} </h4>
            </Form.Item>

            { additionalFields && (
                <Form.Item>
                    {additionalFields}
                </Form.Item>
            )}

            <div style={{display: 'flex', gap: "20px"}}>

                <div style={{flex:"2"}}>
                    <Form.Item 
                        label="Nome" 
                        name="nome" 
                        style={{flex: '1'}} 
                        rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
                    >
                        <Input type='text' name='nome' />
                    </Form.Item>

                    <Form.Item 
                        label="Descrição" 
                        name="descricao"
                        style={{flex: '1'}} 
                    >
                        <Input.TextArea rows={6} name='descricao' />
                    </Form.Item>

                    <Form.Item 
                        label="Data de Início" 
                        name="data_inicio"
                        rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
                    >
                        <Input type='date' name='data_inicio' style={{width: 'fit-content'}}/>
                    </Form.Item>

                    <Form.Item 
                        label="Data de Término (Previsão)" 
                        name="data_termino" 
                        rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
                    >
                        <Input type='date' name='data_termino'  style={{width: 'fit-content'}}/>
                    </Form.Item>
                </div>

                <div style={{flex:"1"}}>

                    <Form.Item 
                        label="Iteração" 
                        name="iteracao" 
                        style={{flex: '1'}}
                        rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}    
                    >
                        <Select
                            allowClear
                            placeholder="Selecione"
                            options={optionsIteracoes}
                        />
                    </Form.Item>

                    <Form.Item 
                        label="Atribuir à" 
                        name="membros" 
                        style={{flex: '1'}}
                        rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            style={{
                                width: '100%',
                            }}
                            placeholder="Selecione"
                            options={optionsMembros}
                        />
                    </Form.Item>

                    <Form.Item  
                        label='Status' 
                        name='status' 
                        style={{flex: '1'}}
                        rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
                    >
                        <Select 
                            allowClear
                            style={{
                                width: '100%'
                            }}
                            placeholder='Selecione'
                            name='status'
                            options={optionsStatusTarefas}
        
                        
                        />
                    </Form.Item>

                    <Form.Item 
                        label='Categoria' 
                        name='tipo'
                        style={{flex: '1'}}
                        rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
                    >
                        <Select
                            allowClear
                            style={{
                                width: '100%'
                            }}
                            placeholder="Selecione"
                            name="tipo"
                            options={optionsTipos}
                        />
                    </Form.Item>

                    <Form.Item 
                        label='Label' 
                        name='labels' 
                        style={{flex: '1'}}
                        rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            style={{
                                width: '100%'
                            }}
                            placeholder="Selecione"
                            name="labels"
                            options={optionsLabels}
                        />
                    </Form.Item>

                    
                </div>

            </div>

            <Form.Item>
                <Button type="primary" htmlType='submit'> Salvar </Button>
                <Button style={{marginLeft: "10px"}} onClick={onCancel} type='primary' danger> Cancelar </Button>
            </Form.Item>
        </Form>
    )
}

export default FormTarefa