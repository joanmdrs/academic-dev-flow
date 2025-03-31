import { Button, Form, Input, Select, Space, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useContextoProjeto } from "../../../context/ContextoProjeto";
import { optionsStatusProjetos } from "../../../../../services/optionsStatus";
import SpinLoading from "../../../../../components/SpinLoading/SpinLoading";
import { listarFluxos } from "../../../../../services/fluxoService";
import { buscarMembroPorGrupoENome, buscarMembrosPorGrupo, listarGrupos } from "../../../../../services/membroService";
import { filterOption, handleError } from "../../../../../services/utils";

const TabProjeto = ({ onSubmit, onCancel }) => {

    const {dadosProjeto} = useContextoProjeto()
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false)
    const [optionsFluxo, setOptionsFluxo] = useState([])
    const [optionsCoordenador, setOptionsCoordenador] = useState([])

    const handleListarFluxos = async () => {
        const response = await listarFluxos()
        if (!response.error){
            const resultados = response.data.map((item) => {
                return {
                    value: item.id,
                    label: item.nome
                }
            })
            setOptionsFluxo(resultados)
        }
    }

    const handleListarMembrosProfessor = async () => {
        try {
            const response = await listarGrupos()
            const grupoDocente = response.data.find(grupo => grupo.name === "Docentes");

            if (grupoDocente) {
                const resMembrosDocente = await buscarMembrosPorGrupo(grupoDocente.id)

                if (!resMembrosDocente.error){
                    const resultados = resMembrosDocente.data.map((item) => ({
                        value: item.id,
                        label: `${item.nome} `,
                    }));
                    setOptionsCoordenador(resultados)
                }
            }
        } catch (error) {
            return handleError(error, 'Falha ao tentar listar os membros do grupo DOCENTES. ')
        }
    }


    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                await handleListarFluxos()
                await handleListarMembrosProfessor()
                form.setFieldsValue(dadosProjeto)
            } catch (error) {
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [dadosProjeto]);

    const handleSubmitForm = (formData) => {
        
        formData['coordenador'] = formData.coordenador ? formData.coordenador : null
        formData['fluxo'] = formData.fluxo ? formData.fluxo : null
        onSubmit(formData)
    }

    return (
       <React.Fragment>
            { isLoading ? (
                   <SpinLoading />
                ) : 
                (<React.Fragment>
                    <Form
                        className="global-form"
                        form={form}
                        onFinish={handleSubmitForm}
                        labelCol={{
                            span: 4,
                        }}                       
                    >
                        <Form.Item 
                            label="Nome:" 
                            name="nome" 
                            rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
                        >
                            <Input
                                name="nome"
                            />
                        </Form.Item>

                        <Form.Item label="Descrição:" name="descricao">
                            <Input.TextArea id="descricao" name="descricao" rows={5} />
                        </Form.Item>                   

                        <Form.Item 
                            label="Status:" 
                            name="status" 
                            
                            rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}>
                            <Select
                                style={{width: '25%'}} 
                                name="status"
                                defaultValue="Selecione"
                                options={optionsStatusProjetos}
                            />
                        </Form.Item>

                        <Form.Item 
                            label="Data de Início:" 
                            name="data_inicio" 
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
                            <Input
                                style={{width: '25%'}} 
                                name="data_inicio" 
                                type="date" 
                                allowClear
                            />
                        </Form.Item>

                        <Form.Item 
                            label="Data de Término:" 
                            name="data_termino" 
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
                            <Input
                                style={{width: '25%'}} 
                                name="data_fim" 
                                type="date" 
                                allowClear
                            />
                        </Form.Item>

                        <Form.Item
                            label="Coordenador"
                            name="coordenador"
                        >
                            <Select 
                                options={optionsCoordenador}
                                showSearch
                                allowClear
                                placeholder="Selecione um coordenador"
                                filterOption={filterOption}
                            />
                        </Form.Item>

                        <Form.Item 
                            label="Fluxo" 
                            name="fluxo" 
                        >
                            <Select
                                options={optionsFluxo}
                                showSearch
                                allowClear
                                placeholder="Selecione o fluxo"
                                filterOption={filterOption}
                            />
                        </Form.Item>

                        <Space>
                            <Button type="primary" htmlType="submit"> Salvar </Button>
                            <Button type="primary" danger onClick={() => onCancel()}> Cancelar </Button>
                        </Space>
                    </Form>
                </React.Fragment>
            ) }
        </React.Fragment>      
    ) 
}

export default TabProjeto;