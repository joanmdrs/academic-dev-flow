import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useProjetoContext } from "../../../context/ProjetoContext";
import { listarIteracoesPorProjeto } from "../../../services/iteracaoService";
import { listarArtefatos } from "../../../services/artefatoService";
import { criarDocumento } from "../../../api/apiGitHubService";

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

const FormDocumento = () => {

    const {dadosProjeto} = useProjetoContext()
    const [optionsIteracao, setOptionsIteracao] = useState(null)
    const [optionsArtefato, setOptionsArtefato] = useState(null)


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

    const handleGetArtefatos = async () => {
        const response = await listarArtefatos()

        const resultados = response.data.map((item) => {
            return {
                value: item.id,
                label: item.nome
            }
        })
        setOptionsArtefato(resultados)

    }

    useEffect(() => {
        const fetchData = async () => {
            if (dadosProjeto !== null){
                await handleGetIteracoes()
                await handleGetArtefatos()
            }
        }

        fetchData()
    }, [dadosProjeto])

    const handleSaveDocumento = async (dados) => {
        const file_path = (dados.file_path)
        const file_content = (dados.file_content)
        const commit_message = dados.commit_message
        const response = await criarDocumento(file_path, file_content, commit_message )
        console.log(response)
    }



    return (

        <Form layout="vertical" className="global-form" onFinish={handleSaveDocumento}>
            <Form.Item>
                <h4> CADASTRAR DOCUMENTO </h4>
            </Form.Item>

            <div style={{display: "flex", gap: "20px"}}> 
                <Form.Item label="Título" name="titulo" style={{flex: "1"}}>
                    <Input type="text" name="titulo" placeholder="Ex.: Documento de Visão"/>
                </Form.Item>

                <Form.Item label="Path dentro do repositório" name="file_path" style={{flex: "1"}}> 
                    <Input type="text" name="file_path" placeholder="docs/doc-visao.md" />
                </Form.Item>
            </div>

            <div style={{display: "flex", gap: "20px"}}> 
                <Form.Item label="Iteração" name="iteracao" style={{flex: "1"}}>
                    <Select options={optionsIteracao}/>
                </Form.Item>

                <Form.Item label="Categoria" name="artefato" style={{flex: "1"}}>
                    <Select options={optionsArtefato}/>
                </Form.Item>
                
                <Form.Item label="Status" name="status" style={{flex: "1"}}>
                    <Select options={optionsStatus} />
                </Form.Item>
            </div>

            <div style={{display: "flex", gap: "10px"}}> 
                <Form.Item>
                    <Button type="primary" htmlType="submit" > Salvar </Button>
                </Form.Item>

                <Form.Item>
                    <Button> Cancelar </Button>
                </Form.Item>
            </div>            
        </Form>

    )

}

export default FormDocumento