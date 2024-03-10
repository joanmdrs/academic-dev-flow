import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import { IoAdd, IoSearch } from "react-icons/io5";
import { useProjetoContext } from "../../../context/ProjetoContext";
import { listarIteracoesPorProjeto } from "../../../services/iteracaoService";
import { listarArtefatos } from "../../../services/artefatoService";
import { buscarDocumentos, criarDocumento } from "../../../api/apiGitHubService";

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
    const [isBuscar, setIsBuscar] = useState(false)
    const [isCadastrar, setIsCadastrar] = useState(false)
    const [documentos, setDocumentos] = useState(null)


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
        const file_content = btoa(dados.file_content)
        const commit_message = dados.commit_message

        const response = await criarDocumento(file_path, file_content, commit_message )

        console.log(response)
    }

    const handleGetDocumentos = async (dados) => {
        console.log(dados)
        const response = await buscarDocumentos(dados.caminho)
        const decodedContent = decodeURIComponent(escape(atob(response.data.content)));
        setDocumentos(decodedContent)
    }

    return (

        <div>
            <div style={{display: "flex", justifyContent: "space-between"}}> 
                <Button icon={<IoSearch/>} onClick={() => setIsBuscar(!isBuscar)}> Buscar Documento </Button>
                <Button icon={<IoAdd/>} onClick={() => setIsCadastrar(!isCadastrar)}> Adicionar Documento </Button>

            </div>
            

            { isBuscar && 

                <div>
                    <Form className="global-form" onFinish={handleGetDocumentos}>
                        <Form.Item label="Especifique o caminho do(s) arquivo(s)" name="caminho">
                            <Input name="caminho" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit"> Salvar </Button>
                        </Form.Item>
                    </Form>

                    { documentos !== null && 
                        <div className="global-div"> 
                            <Markdown remarkPlugins={[remarkGfm]}>{documentos}</Markdown>

                        </div>
                             


                    }
                </div>

                

                
                
            }

            {
                isCadastrar && 

                <Form layout="vertical" className="global-form" onFinish={handleSaveDocumento}>
                    <Form.Item>
                        <h4> CADASTRAR DOCUMENTO </h4>
                    </Form.Item>

                    <div style={{display: "flex", gap: "20px"}}> 
                        <Form.Item label="Título" name="titulo" style={{flex: "1"}}>
                            <Input type="text" name="titulo" placeholder="Ex.: Documento de Visão"/>
                        </Form.Item>

                        <Form.Item label="Link do documento do github" name="file_path" style={{flex: "1"}}> 
                            <Input type="text" name="file_path" />
                        </Form.Item>
                    </div>

                    <div style={{display: "flex", gap: "20px"}}> 
                        <Form.Item label="Iteração" name="iteracao" style={{flex: "1"}}>
                            <Select options={optionsIteracao}/>
                        </Form.Item>

                        <Form.Item label="Atribuir à" name="artefato" style={{flex: "1"}}>
                            <Select options={optionsArtefato}/>
                        </Form.Item>
                        
                        <Form.Item label="Status" name="status" style={{flex: "1"}}>
                            <Select options={optionsStatus} />
                        </Form.Item>
                    </div>

                    <Form.Item
                        label="Conteúdo do arquivo"
                        name="file_content"
                        rules={[
                            {
                            required: true,
                            },
                        ]}
                        >
                        <MDEditor data-color-mode="dark"  />
                    </Form.Item>

                    <Form.Item label="Mensagem commit" name="commit_message">
                        <Input type="text" name="commit_message" />
                    </Form.Item>

                    <div style={{display: "flex", gap: "10px"}}> 
                        <Form.Item>
                            <Button type="primary" htmlType="submit" > Salvar </Button>
                        </Form.Item>

                        <Form.Item>
                            <Button> Cancelar </Button>
                        </Form.Item>
                    </div>            
                </Form>
            }

            
        </div>
    )

}

export default FormDocumento