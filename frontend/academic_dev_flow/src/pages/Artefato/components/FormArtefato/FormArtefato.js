import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useContextoArtefato } from "../../context/ContextoArtefato";
import { listarIteracoesPorProjeto } from "../../../../services/iteracaoService";
import SelectProjeto from "../SelectProjeto/SelectProjeto";

const optionsStatus = [
    {
        value: 'criado',
        label: 'Criado'
    },
    {
        value: 'rascunho',
        label: 'Em rascunho'
    },
    {
        value: 'revisao',
        label: 'Pendente de revisão'
    },
    {
        value: 'aprovado',
        label: 'Aprovado'
    },
    {
        value: 'finalizado',
        label: 'Finalizado'
    }
]

const FormArtefato = ({onSubmit, onCancel, selectProjeto, inputsAdmin}) => {

    const {dadosProjeto, dadosArtefato} = useContextoArtefato()
    const [optionsIteracao, setOptionsIteracao] = useState(null)
    const [form] = useForm()


    const handleGetIteracoes = async () => {
        const response = await listarIteracoesPorProjeto(dadosProjeto.id)
        const iteracoesOrdenadas = response.data.sort((a, b) => a.numero - b.numero);

        const resultados = iteracoesOrdenadas.map((item) => {
            return {
                value: item.id,
                label: item.nome
            }
        })

        setOptionsIteracao(resultados)
    }

    useEffect(() => {
        const fetchData = async () => {
            if (dadosProjeto !== null){
                await handleGetIteracoes()

                if (dadosArtefato !== null) {
                    form.setFieldsValue(dadosArtefato)
                }
            }
        }

        fetchData()
    }, [dadosProjeto])

    return (

        <Form layout="vertical" className="global-form" onFinish={onSubmit} form={form}>
            <Form.Item>
                <h4> CADASTRAR ARTEFATO </h4>
            </Form.Item>

            {selectProjeto}

            <Form.Item label="Nome" name="nome">
                <Input type="text" name="nome" placeholder="nome do artefato"/>
            </Form.Item>

            <Form.Item label="Path do arquivo no repositório" name="path_file"> 
                <Input type="text" name="path_file" placeholder="path do arquivo" />
            </Form.Item>

            {inputsAdmin}

            <Form.Item label="Iteração" name="iteracao">
                <Select options={optionsIteracao} name="iteracao" defaultValue="selecione" />
            </Form.Item>
            
            <Form.Item label="Status" name="status">
                <Select options={optionsStatus} name="status" defaultValue="selecione" />
            </Form.Item>

            <Form.Item label="Descrição" name="descricao">
                <Input.TextArea rows={4} name="descricao" placeholder="descrição do artefato"/>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" > Salvar </Button>
                <Button onClick={onCancel}> Cancelar </Button>
            </Form.Item>
        </Form>
    )

}

export default FormArtefato