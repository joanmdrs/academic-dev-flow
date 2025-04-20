import React from "react";
import "./ResetPassword.css"
import {Form, Button, Input, Space } from 'antd'
import imgResetPassword from "../../../../assets/reset-password.svg"
import { Link } from "react-router-dom";

const ResetPassword = () => {

    return (
        <div className="reset-password-layout">   
            <div className="form-container">
                <Form 
                    layout="vertical" 
                    style={{gap: '10px'}}
                >
                    <h2> Redefinir senha</h2>
                    <p> Informe seu e-mail de cadastro para receber um link de redefinição de senha.</p>
                    <Form.Item label="Email" name="email_reset">
                        <Input name="email_reset" placeholder="informe seu e-mail de cadastro"/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" style={{width: '100%'}}> 
                            Enviar Link
                        </Button>
                    </Form.Item>
                    
                    <Form.Item>
                        <span> 
                            Lembrou sua senha ? <Link to="/"> Login </Link>
                        </span>
                    </Form.Item>
                    
                </Form>
               
            </div>
            

            <div className="image-container">
                <img src={imgResetPassword} alt='Imagem de Apresentação' />
            </div>
        </div>
                

    )
}

export default ResetPassword