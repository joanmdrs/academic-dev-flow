import { Button, Form, Input, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { optionsStatusProjetos } from "../../../../services/optionsStatus";
import { listarFluxos } from "../../../../services/fluxoService";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto/ContextoGlobalProjeto";
import { useForm } from "antd/es/form/Form";
import { MdEdit } from "react-icons/md";
import { atualizarProjeto, buscarProjetoPeloId } from "../../../../services/projetoService";
import SpinLoading from "../../../../components/SpinLoading/SpinLoading";

const FormProjeto = () => {

    const [optionsFluxos, setOptionsFluxo] = useState([])
    const {dadosProjeto, setDadosProjeto} = useContextoGlobalProjeto()
    const [form] = useForm()
    const [isUpdate, setIsUpdate] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleEditar = () => {
        setIsUpdate(true)
    }

    const handleListarFluxos = async () => {
        const response = await listarFluxos()

        if(!response.error){
            const resultados = response.data.map(item => ({
                value: item.id,
                label: item.nome
            }))
            setOptionsFluxo(resultados)
        }
    }
 
    useEffect(() => {

        const fetchData = async () => {
            await handleListarFluxos()

            if (dadosProjeto){
                form.setFieldsValue(dadosProjeto)
            }
        }

        fetchData()
    }, [dadosProjeto])

    const handleReload = async () => {
        setIsLoading(true)
        setIsUpdate(false)
        const response = await buscarProjetoPeloId(dadosProjeto.id)

        if (!response.error){
            setDadosProjeto(response.data)
        }
        setIsLoading(false)
    }

    const handleAtualizarDados = async (formData) => {
        const response = atualizarProjeto(formData, dadosProjeto.id)

        if (!response.error){
            await handleReload()
        }
    }



    return (
        <div> 
            {isLoading ? (
                <SpinLoading />
            ) : (
               <React.Fragment> 
                    <div style={{width: '100%', display: 'flex', justifyContent: 'flex-end', padding: '10px 0'}}> 
                        <Button onClick={() => handleEditar()} type="primary" icon={<MdEdit />}> Editar </Button>
                    </div>

                    <Form form={form} layout="vertical" disabled={!isUpdate} onFinish={handleAtualizarDados}>

                        <Form.Item label="Descrição:" name="descricao">
                            <Input.TextArea id="descricao" name="descricao" rows={6} />
                        </Form.Item>

                        <div className="df g-10">
                            <Form.Item 
                                label="Data de Início:" 
                                name="data_inicio" 
                                style={{width: "250px"}}
                                rules={[
                                    { required: true, message: 'Por favor, preencha este campo!' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            const dataTermino = getFieldValue('data_termino');
                                            if (!value || !dataTermino || value <= dataTermino) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('A data de início não pode ser maior que a data de término!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input name="data_inicio" type="date" />
                            </Form.Item>

                            <Form.Item 
                                label="Data de Término:" 
                                name="data_termino" 
                                style={{width: "250px"}} 
                                rules={[
                                    { required: true, message: 'Por favor, preencha este campo!' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            const dataInicio = getFieldValue('data_inicio');
                                            if (!value || !dataInicio || value >= dataInicio) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('A data de término não pode ser menor que a data de início!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input name="data_fim" type="date" />
                            </Form.Item>

                            <Form.Item 
                                label="Status:" 
                                name="status" 
                                style={{width: "250px"}} 
                                rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}>
                                <Select
                                    name="status"
                                    defaultValue="Selecione"
                                    options={optionsStatusProjetos}
                                />
                            </Form.Item>

                        </div>

                        <Form.Item
                            label="Fluxo:" 
                            name="fluxo" 
                            style={{width: "250px"}} 
                            rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
                        >
                            <Select defaultValue="Selecione" options={optionsFluxos} /> 
                        </Form.Item>
                        
                        { isUpdate && (
                            <Space className="df g-10">
                                <Button type="primary" htmlType="submit"> Salvar </Button>
                                <Button onClick={() => setIsUpdate(false)} type="primary" danger> Cancelar </Button>
                            </Space>
                        )}
                        
                    </Form>
               </React.Fragment>
                
            )}
            

        </div>
        
    )
}

export default FormProjeto