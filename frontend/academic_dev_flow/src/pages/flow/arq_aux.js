import React, { useState } from "react";
import "./addFlow.css";
import { Form, Input, Button, Modal, List, Select, Steps, theme} from 'antd';
import { ArrowLeftOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { AiFillEdit } from "react-icons/ai";
import { IoMdTrash } from "react-icons/io";
import { useForm } from "antd/es/form/Form";
import Title from "../../components/Title/Title";

// Definindo as opções de status das etapas do fluxo de desenvolvimento
const STATUS_CHOICES = [
    { value: 'Pendente', label: 'Pendente' },
    { value: 'Em andamento', label: 'Em andamento' },
    { value: 'Concluída', label: 'Concluída' },
];

const {Option} = Select

// Definindo os items dos passos de criação do fluxo de desenvolvimento

const FlowSteps = () => {

    const [form] = Form.useForm();
    const [etapas, setEtapas] = useState([]);

    const onFinish = () => {

    }


    const steps = [
        {
            title: "Fluxo",
            content: (
                <div className="form-add-flow">
                    

                    <Form
                        name="myForm"
                        className="myform"
                        onFinish={onFinish}
                        layout="vertical"
                        form = {form}
                        
                    >
                        <Form.Item name="nome" label="Nome">
                            <Input />
                        </Form.Item>

                        <Form.Item name="descricao" label="Descrição">
                            <Input.TextArea />
                        </Form.Item>
                    </Form>
                </div>
            )
        },
        
        {
            title: "Etapas",
            content: (
                <div className="step-add-etapa">
                    <h3>Cadastro das etapas do fluxo de desenvolvimento</h3>
                    <div className="form-add-etapa">
                        <Form form={form}>
                            <Form.Item name="nome" label="Nome">
                                <Input />
                            </Form.Item>

                            <Form.Item name="descricao" label="Descrição">
                                <Input.TextArea rows={4} />
                            </Form.Item>

                            <Form.Item name="data_inicio" label="Data Início">
                                <Input type="date" />
                            </Form.Item>

                            <Form.Item name="data_fim" label="Data Fim">
                                <Input type="date" />
                            </Form.Item>

                            <Form.Item name="status" label="Status">
                                <Select
                                    id="status"
                                    name="status"
                                    
                                    >
                                    <Option value=""></Option>

                                    {STATUS_CHOICES.map((option) => (
                                        <Option key={option.value} value={option.value}>
                                        {option.label}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Form>
                    </div>

                    <div className="button-add-etapa">
                        <Button id="button-add-etapa">
                            <PlusOutlined />
                            Adicionar etapa
                        </Button>

                        {etapas.length > 0 && (
                            <div>
                                <List
                                    size="small"
                                    bordered
                                    dataSource={etapas}
                                    renderItem={(item, index) => (
                                        <List.Item 
                                            actions={
                                                [ 
                                                    <Button> 
                                                        <AiFillEdit />
                                                    </Button>, 
                                                    <Button>
                                                        <IoMdTrash />
                                                    </Button>
                                                ]
                                            }
                                        >
                                            {item.nome}

                                        </List.Item>
                                    )}
                                />
                                
                            </div>
                        )}
                    </div>
                </div>
            )
        },
        {
            title: "Finalizar",
            content: "Content"
        }
    ]

    const [current, setCurrent] = useState(0);
    const { token } = theme.useToken();

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));

    return (
        <div className="steps">
            <Steps current={current} items={items} className="fluxo" />
            <div className="content-step">{steps[current].content}</div>
            <div>
                {current < steps.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                    Next
                </Button>
                )}
                {current === steps.length - 1 && (
                <Button type="primary" onClick={() => console.log('Processing complete!')}>
                    Done
                </Button>
                )}
                {current > 0 && (
                <Button
                    style={{
                    margin: '0 8px',
                    }}
                    onClick={() => prev()}
                >
                    Previous
                </Button>
                )}
            </div>
    </div>
    )

}

export default FlowSteps;
