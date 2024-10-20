import { Button, Form, Input, Select } from "antd"
import InputMask from 'react-input-mask';
import { useEffect, useState } from "react";
import { useMembroContexto } from "../../context/MembroContexto";
import Loading from "../../../../components/Loading/Loading";
import { listarGrupos } from "../../../../services/membroService";
import { handleError } from "../../../../services/utils";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";

const FormMembro = ({onSubmit, onCancel}) => {

    const {dadosMembro} = useMembroContexto()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [optionsGrupos, setOptionsGrupos] = useState([])

    const handleListarGrupos = async () => {

        try {
            const response = await listarGrupos()

            if (!response.error){
                const promises = await response.data.map( async (item) => {
                    return {
                        value: item.id,
                        label: item.name
                    }
                })

                const results = (await Promise.all(promises))
                setOptionsGrupos(results)
            }
            
        } catch (error) {
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
        }

    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                await handleListarGrupos()
                setLoading(true);

                if (dadosMembro !== null){
                    form.setFieldsValue(dadosMembro)
                } else {
                    form.resetFields()
                }
                
            } catch (error) {
            } finally {
                setLoading(false);
            }

        }
        fetchData()
    }, [dadosMembro])

    if (loading) {
        return <Loading />
    }

    const handleEmailChange = (e) => {
        const { value } = e.target;
        form.setFieldsValue({ usuario: value }); // Atualiza o valor do campo de usuário com o valor do campo de email
    };

    return (
        <Form 
            form={form}
            className="global-form"
            layout="vertical"
            onFinish={onSubmit}
        >
            <Form.Item>
                <h3> Dados do Membro </h3>
            </Form.Item>
            <div style={{display: "flex", gap: "20px"}}> 
                <Form.Item 
                    style={{flex: "3"}}
                    label="Nome" 
                    name="nome"
                    rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
                >
                    <Input placeholder="nome do membro"/>
                </Form.Item>

                <Form.Item 
                    style={{flex: "1"}}
                    label="Data de Nascimento" 
                    name="data_nascimento"
                    rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
                >
                    <Input type="date"/>
                    
                </Form.Item>
            </div>

            <div style={{display: "flex", gap: "20px"}}>
                <Form.Item
                    style={{flex: "1"}}
                    name="telefone"
                    label="Telefone"
                    rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
                >
                    <InputMask mask="(99) 99999-9999" maskChar={null}>
                    {() => <Input placeholder="telefone do membro"/>}
                    </InputMask>
                </Form.Item>

                <Form.Item
                    style={{flex: "2"}}
                    name="email"
                    label="Email"
                    rules={[
                    { required: true, message: 'Por favor, preencha este campo!' },
                    { type: 'email', message: 'Por favor, insira um email válido!' },
                    ]}
                >
                    <Input placeholder="email do membro" onChange={handleEmailChange}/>
                </Form.Item>
            </div>
            
            <Form.Item>
                <h3> Dados do Usuário GitHub </h3>
            </Form.Item>

            <div style={{display: "flex", gap: "20px"}}>
                <Form.Item 
                    style={{flex: "1"}}
                    name="nome_github"
                    label="Nome do Usuário"
                >
                    <Input name="nome_github" placeholder="nome do usuário do GitHub" />
                </Form.Item>

                <Form.Item 
                    style={{flex: "1"}}
                    name="email_github"
                    label="Email do GitHub"
                >
                    <Input name="email_github" placeholder="email do usuario do GitHub"/>
                </Form.Item>

                <Form.Item 
                    style={{flex: "1"}}
                    name="usuario_github"
                    label="Username do GitHub"
                >
                    <Input name="usuario_github" placeholder="username do GitHub" />
                </Form.Item>
            </div>

            <Form.Item>
                <h3> LinkedIn/Currículo </h3>
            </Form.Item>

            <Form.Item 
                style={{width: "70%"}}
                name="linkedin"
                label="Perfil do Linkedin"
            >
                <Input name="linkedin" placeholder="perfil do LinkedIn" />
            </Form.Item>

            <Form.Item 
                style={{width: "70%"}}
                name="lattes"
                label="Currículo Lattes"
            >
                <Input name="lattes" placeholder="link do currículo Lattes" />
            </Form.Item>

            <div style={{width: '50%'}}>
                <Form.Item>
                    <h3> Dados do Usuário </h3>
                </Form.Item>

                <Form.Item
                    name="username"
                    label="Usuário de Acesso"
                    rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
                >
                    <Input name="username" disabled/> 

                </Form.Item>
                <Form.Item
                    name="password"
                    label="Senha de Acesso"
                    rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
                >
                    <Input.Password name="password" placeholder="senha de acesso"/>
                </Form.Item>

                <Form.Item 
                    name="grupo"
                    label="Grupo de Usuário"
                    rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
                >
                    <Select options={optionsGrupos}/>
                    
                </Form.Item>
            </div>

            <div style={{display: 'flex', gap: "10px", marginTop: "20px"}} >
                <Button type="primary" htmlType="submit">
                    Salvar
                </Button >

                <Button type="primary" onClick={onCancel} danger >
                    Cancelar
                </Button>
            </div>

            
        </Form>
    )
}

export default FormMembro