import { Button, Form, Input, Radio } from "antd";
import "./FormRegister.css"
import React from "react";
import assetRegister from "../../../../../assets/asset-register.svg"
import { useForm } from "antd/es/form/Form";
import { useRegisterContexto } from "../../context/RegisterContexto";
import { criarMembro } from "../../../../../services/membroService";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const FormRegister = () => {

    const [form] = useForm();
    const {infoGithub, grupoUsuario, setStep} = useRegisterContexto()

    const handleVerificarSenhas = (rule, value) => {
        const senha = form.getFieldValue('senha');
        if (value && senha && value !== senha) {
            return Promise.reject('As senhas não correspondem!');
        } else {
            return Promise.resolve();
        }
    }

    const handleCriarConta = async (dadosForm) => {
        dadosForm['usuario_github'] = infoGithub !== undefined ? infoGithub.usuario_github : null
        dadosForm['nome_github'] = infoGithub !== undefined ? infoGithub.nome_github : null
        dadosForm['email_github'] = infoGithub !== undefined ? infoGithub.email_github : null
        dadosForm['grupo'] = grupoUsuario 
        dadosForm['username'] = dadosForm.email
        dadosForm['password'] = dadosForm.senha

        let avatarNumber

        if (dadosForm.sexo === 'M') {
            avatarNumber = Math.floor(Math.random() * 50) + 1;
        } else if (dadosForm.sexo === 'F') {
            avatarNumber = Math.floor(Math.random() * 50) + 51;

        } else if (dadosForm.sexo === 'O') {
            avatarNumber = Math.floor(Math.random() * 100) + 1;
        }

        dadosForm['avatar'] = avatarNumber

        const response = await criarMembro(dadosForm)

        if (!response.error){
            handleVoltar()
        } 
    }

    const handleVoltar = () => {
        setStep("2")
    }

    return (
        <div className="screen-register"> 
            <div className="float-button"> 
                <Button
                    onClick={() => handleVoltar()} 
                    icon={<MdOutlineArrowBackIosNew />}>
                    VOLTAR 
                </Button>
            </div>

            <div className="screen-register-banner"> 
                <img src={assetRegister} alt="Imagem da página de cadastro" />
            </div>

            <div className="screen-register-form">
                <Form layout="vertical" form={form} onFinish={handleCriarConta}>
                    <Form.Item>
                        <h2> Registre-se para uma nova conta !</h2>
                    </Form.Item>

                    <Form.Item 
                        label="Nome" 
                        name="nome"
                        rules={[{ required: true, message: 'Por favor, insira o nome!' }]}
                    >
                        <Input placeholder="Ex.: João "/>
                    </Form.Item>

                    <Form.Item 
                        label="Sexo" 
                        name="sexo" 
                        rules={[{ required: true, message: 'Por favor, marque uma opção!' }]}
                    >
                        <Radio.Group>
                            <Radio value="M"> Masculino </Radio>
                            <Radio value="F"> Feminino </Radio>
                            <Radio value="O"> Outro </Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                        { required: true, message: 'Por favor, insira seu email!' },
                        { type: 'email', message: 'Por favor, insira um email válido!' },
                        ]}
                    >
                        <Input placeholder="Ex.: enderecodeemail@email.com" />
                    </Form.Item>

                    <Form.Item
                        name="senha"
                        label="Senha de Acesso"
                        rules={[{ required: true, message: 'Por favor, cadastre uma senha para acessar a plataforma'}]}
                    >
                        <Input.Password name="senha"/>
                    </Form.Item>

                    <Form.Item
                        name="confirme-senha"
                        label="Confirme a senha"
                        dependencies={['senha']}
                        rules={[
                            { required: true, message: 'Por favor, confirme a senha de acesso à plataforma'},
                            { validator: handleVerificarSenhas }
                        ]}
                    >
                        <Input.Password name="confime-senha"/>
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" htmlType="submit"> Cadastre-se</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default FormRegister