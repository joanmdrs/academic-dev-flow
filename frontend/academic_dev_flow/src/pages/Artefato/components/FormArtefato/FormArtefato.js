import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { useContextoArtefato } from "../../context/ContextoArtefato";
import { listarIteracoesPorProjeto } from "../../../../services/iteracaoService";

const optionsStatus = [
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
    }
]

const FormArtefato = ({onSubmit, onCancel}) => {

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

            <div style={{display: "flex", gap: "20px"}}> 
                <Form.Item label="Título" name="titulo" style={{flex: "1"}}>
                    <Input type="text" name="titulo" placeholder="Ex.: Documento de Visão"/>
                </Form.Item>

                <Form.Item label="Path dentro do repositório" name="caminho" style={{flex: "1"}}> 
                    <Input type="text" name="caminho" placeholder="docs/doc-visao.md" />
                </Form.Item>
            </div>

            <div style={{display: "flex", gap: "20px"}}> 
                <Form.Item label="Iteração" name="iteracao" style={{flex: "1"}}>
                    <Select options={optionsIteracao} name="iteracao" />
                </Form.Item>
                
                <Form.Item label="Status" name="status" style={{flex: "1"}}>
                    <Select options={optionsStatus} name="status" />
                </Form.Item>
            </div>

            <div style={{display: "flex", gap: "10px"}}> 
                <Form.Item>
                    <Button type="primary" htmlType="submit" > Salvar </Button>
                </Form.Item>

                <Form.Item>
                    <Button onClick={onCancel}> Cancelar </Button>
                </Form.Item>
            </div>            
        </Form>

    )

}

export default FormArtefato