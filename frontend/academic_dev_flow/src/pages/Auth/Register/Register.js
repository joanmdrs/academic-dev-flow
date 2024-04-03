import { Button, Form, Input } from "antd";
import "./Register.css"
import React from "react";
import InputMask from 'react-input-mask';
import assetRegister from "../../../assets/asset-register.svg"
import { customizeRequiredMark } from "../../../components/LabelMask/LabelMask";
const Register = () => {

    return (
        <div className="screen-register"> 
            <div className="screen-register-banner"> 
                <img src={assetRegister} alt="Imagem da página de cadastro" />
            </div>

            <div className="screen-register-form"> 
                <Form layout="vertical">

                    <Form.Item>
                        <h2> Registre-se para uma nova conta</h2>
                    </Form.Item>

                    <Form.Item 
                        label="Nome" 
                        name="nome"
                        rules={[{ required: true, message: 'Por favor, insira o nome!' }]}
                    >
                        <Input placeholder="Ex.: João "/>
                    </Form.Item>

                    <div style={{display: 'flex', gap: '20px'}}>

                        <Form.Item 
                            style={{flex: "1"}}
                            label="Data de Nascimento" 
                            name="data_nascimento"
                            rules={[{ required: true, message: 'Por favor, selecione sua data de nascimento!' }]}
                        >
                            <InputMask mask="99/99/9999" maskChar={null}>
                                {() => <Input placeholder="Ex.: 11/12/2000"/>}
                            </InputMask>
                        </Form.Item>

                        <Form.Item
                            style={{flex: "1"}}
                            name="telefone"
                            label="Telefone"
                            rules={[{ required: true, message: 'Por favor, insira seu telefone!' }]}
                        >
                            <InputMask mask="(99) 99999-9999" maskChar={null}>
                                {() => <Input placeholder="Ex.: (84) 99999-9999"/>}
                            </InputMask>
                        </Form.Item>

                    </div>

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
                        rules={[{ required: true, message: 'Por favor, cadastre uma senha para acessar a plataforma'}]}
                    >
                        <Input.Password name="confime-senha"/>
                    </Form.Item>

                   

                    <Form.Item >
                        <Button type="primary"> Cadastre-se</Button>
                    </Form.Item>

                </Form>
            </div>
        </div>
    )
}

export default Register