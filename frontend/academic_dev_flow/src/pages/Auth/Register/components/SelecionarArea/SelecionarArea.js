import React, { useState, useEffect } from "react";
import { Button, Form, Input, Radio } from "antd";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";
import "./SelecionarArea.css";
import { useRegisterContexto } from "../../context/RegisterContexto";
import { NotificationManager } from "react-notifications";
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos } from "react-icons/md";

const SelecionarArea = () => {
    const [option, setOption] = useState(null);
    const [form] = Form.useForm();
    const { setInfoGithub, step, setStep } = useRegisterContexto();

    useEffect(() => {
        form.validateFields();
    }, [form]);

    const handleAlterar = ({ target: { value } }) => {
        setOption(value);
    };

    const handleProsseguir = () => {
        setStep("3");
        setInfoGithub({
            usuario_github: form.getFieldValue('usuario_github'),
            nome_github: form.getFieldValue("nome_github"),
            email_github: form.getFieldValue("email_github"),
        });
    };

    const handleFinishFailed = () => {
        NotificationManager.info('Preencha todos os campos do formulário!')
    };

    return (
        <div className="screen-selecionar-area">
            <h2>O seu objetivo com este sistema envolve desenvolvimento de software?</h2>
            <div>
                <Radio.Group value={option} onChange={handleAlterar}>
                    <Radio value="sim">Sim</Radio>
                    <Radio value="não">Não</Radio>
                </Radio.Group>
            </div>

            {option === "sim" ? (

                <div className="global-form">

                    <Form
                        className="globla-div"
                        form={form}
                        layout="vertical"
                        onFinish={handleProsseguir}
                        onFinishFailed={handleFinishFailed}
                    >
                        <Form.Item
                            label="Informe seu usuário GitHub"
                            name="usuario_github"
                            rules={[{ required: true, message: "Por favor, informe seu usuário GitHub." }]}
                        >
                            <Input name="usuario_github" placeholder="usuário" />
                        </Form.Item>

                        <Form.Item
                            name="nome_github"
                            label="Nome do Usuário"
                            rules={[{ required: true, message: "Por favor, informe o nome do usuário do GitHub." }]}
                        >
                            <Input name="nome_github" placeholder="Nome do usuário do GitHub" />
                        </Form.Item>

                        <Form.Item
                            name="email_github"
                            label="Email do GitHub"
                            rules={[{ required: true, message: "Por favor, informe o email do usuário do GitHub." }]}
                        >
                            <Input name="email_github" placeholder="Email do usuário do GitHub" />
                        </Form.Item>

                        <Button type="primary" htmlType="submit">
                            Prosseguir <MdOutlineArrowForwardIos />
                        </Button>
                    </Form>

                </div>
                
            ) : (
                <div style={{display: 'flex', gap: "10px"}}> 
                    <Button onClick={() => setStep("1")} icon={<MdOutlineArrowBackIosNew />}>
                        Voltar
                    </Button>
                    <Button type="primary" htmlType="submit" onClick={handleProsseguir}>
                        Prosseguir  <MdOutlineArrowForwardIos />
                    </Button>
                    
                </div>
                

                
            )}

        
        </div>
    );
};

export default SelecionarArea;
