import { Button, Form, Input, Select } from "antd"
import InputMask from 'react-input-mask';
import { customizeRequiredMark } from "../../../../components/LabelMask/LabelMask";
import { useMembroContexto } from "../../context/MembroContexto";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import Loading from "../../../../components/Loading/Loading";

const OPTIONS_GROUP = [
    {
        label: "Administradores",
        value: "administradores"
    },
    {
        label: "Discentes",
        value: "discentes"
    },
    {
        label: "Docentes",
        value: "docentes"
    },
    {
        label: "Colaboradores",
        value: "colaboradores"
    }
]

const FormMembro = ({onSubmit, onCancel}) => {

    const {dadosMembro} = useMembroContexto()
    const [form] = useForm()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = () => {
            if (dadosMembro !== null){
                form.setFieldsValue(dadosMembro)
            }
        }
        fetchData()
        setLoading(false)
    }, [])

    if (loading) {
        return <Loading />
    }

    return (
        <Form 
            form={form}
            className="global-form"
            layout="vertical"
            requiredMark={customizeRequiredMark}
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
                    rules={[{ required: true, message: 'Por favor, insira o nome!' }]}
                >
                    <Input placeholder="Ex.: João "/>
                </Form.Item>

                <Form.Item 
                    style={{flex: "1"}}
                    label="Data de Nascimento" 
                    name="data_nascimento"
                    rules={[{ required: true, message: 'Por favor, selecione sua data de nascimento!' }]}
                >
                    <Input type="date"/>
                    
                </Form.Item>
            </div>

            <div style={{display: "flex", gap: "20px"}}>
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

                <Form.Item
                    style={{flex: "2"}}
                    name="email"
                    label="Email"
                    rules={[
                    { required: true, message: 'Por favor, insira seu email!' },
                    { type: 'email', message: 'Por favor, insira um email válido!' },
                    ]}
                >
                    <Input placeholder="Ex.: nome@gmail.com"/>
                </Form.Item>

                <Form.Item 
                    style={{flex: "1"}}
                    name="github"
                    label="Usuário GitHub"
                >
                    <Input name="github" />
                </Form.Item>
            </div>

            <Form.Item 
                style={{width: "70%"}}
                name="linkedin"
                label="Perfil do Linkedin"
            >
                <Input name="linkedin" />
            </Form.Item>

            <Form.Item 
                style={{width: "70%"}}
                name="lattes"
                label="Currículo Lattes"
            >
                <Input name="lattes" />
            </Form.Item>

            <div style={{width: '50%'}}>
                <Form.Item>
                    <h3> Dados do Usuário </h3>
                </Form.Item>
                <Form.Item
                    name="senha"
                    label="Senha de Acesso"
                    rules={[{ required: true, message: 'Por favor, cadastre uma senha para acessar a plataforma'}]}
                >
                    <Input.Password name="senha"/>
                </Form.Item>

                <Form.Item 
                    name="grupo"
                    label="Grupo de Usuário"
                    rules={[{ required: true, message: 'Por favor, informe o grupo de usuário!'}]}
                >
                    <Select options={OPTIONS_GROUP}/>
                    
                </Form.Item>
            </div>

            <div style={{display: 'flex', gap: "10px", marginTop: "20px"}} >
                <Button type="primary" size="large" htmlType="submit">
                    Salvar
                </Button >

                <Button type="primary" size="large" onClick={onCancel} danger >
                    Cancelar
                </Button>
            </div>

            
        </Form>
    )
}

export default FormMembro