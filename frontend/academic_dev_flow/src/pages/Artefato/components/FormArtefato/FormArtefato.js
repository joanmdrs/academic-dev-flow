import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useContextoArtefato } from "../../context/ContextoArtefato";
import { listarIteracoesPorProjeto } from "../../../../services/iteracaoService";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { optionsStatusArtefatos } from "../../../../services/optionsStatus";
import { listarMembrosPeloIdProjeto } from "../../../../services/membroProjetoService";
import { handleError, handleInfo } from "../../../../services/utils";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";

const FormArtefato = ({onSubmit, onCancel, selectProjeto, inputsAdmin, inputCommitMessage}) => {

    const {dadosProjeto} = useContextoGlobalProjeto()
    const {dadosArtefato} = useContextoArtefato()
    const [optionsIteracao, setOptionsIteracao] = useState(null)
    const [form] = useForm()
    const [titulo, setTitulo] = useState('CADASTRAR ARTEFATO')

    const handleGetIteracoes = async () => {
        const response = await listarIteracoesPorProjeto(dadosProjeto.id)

        if (!response.error && response.data.length > 0){
            const iteracoesOrdenadas = response.data.sort((a, b) => a.numero - b.numero);

            const resultados = iteracoesOrdenadas.map((item) => {
                return {
                    value: item.id,
                    label: item.nome
                }
            })

            setOptionsIteracao(resultados)
        } else {
            return handleInfo(response, "Este projeto não possui iterações cadastradas, cadastre as iterações antes de criar o artefato.")
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            if (dadosProjeto !== null){
                await handleGetIteracoes()

                if (dadosArtefato !== null) {
                    form.setFieldsValue(dadosArtefato)
                    setTitulo('ATUALIZAR ARTEFATO')

                } else {
                    form.resetFields()
                    setTitulo('CADASTRAR ARTEFATO')
                }
            }
        }

        fetchData()
    }, [dadosProjeto])

    return (

        <Form layout="vertical" className="global-form" onFinish={onSubmit} form={form}>
            <Form.Item>
                <h4> {titulo} </h4>
            </Form.Item>

            {selectProjeto}

            <Form.Item 
                label="Nome" 
                name="nome"
                rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
            >
                <Input type="text" name="nome" placeholder="nome do artefato"/>
            </Form.Item>

            <Form.Item 
                label="Path do arquivo no repositório" 
                name="path_file"
                rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
            > 
                <Input type="text" name="path_file" placeholder="path do arquivo" />
            </Form.Item>

            {inputsAdmin}

            {inputCommitMessage}

            <Form.Item 
                label="Iteração" 
                name="iteracao"
                rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
            >
                <Select options={optionsIteracao} name="iteracao" defaultValue="selecione" />
            </Form.Item>
            
            <Form.Item 
                label="Status" 
                name="status"
                rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
            >
                <Select options={optionsStatusArtefatos} name="status" defaultValue="selecione" />
            </Form.Item>

            <Form.Item label="Descrição" name="descricao">
                <Input.TextArea rows={4} name="descricao" placeholder="descrição do artefato"/>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" > Salvar </Button>
                <Button 
                    
                    type="primary" 
                    style={{marginLeft: '10px'}} 
                    danger 
                    onClick={() => onCancel()}> Cancelar </Button>
            </Form.Item>
        </Form>
    )

}

export default FormArtefato