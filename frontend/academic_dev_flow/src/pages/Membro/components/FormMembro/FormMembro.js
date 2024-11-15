import { Button, Collapse, Form, Input, Select, Space } from "antd"
import InputMask from 'react-input-mask';
import { useEffect, useState } from "react";
import { useMembroContexto } from "../../context/MembroContexto";
import Loading from "../../../../components/Loading/Loading";
import { listarGrupos } from "../../../../services/membroService";
import { handleError } from "../../../../services/utils";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";
import { CaretRightOutlined } from "@ant-design/icons";

const {Panel} = Collapse

const optionsSexo = [
    {
        value: 'M',
        label: 'Masculino'
    }, 
    {
        value: 'F',
        label: 'Feminino'
    }, 
    {
        value: 'O',
        label: 'Outro'
    }
]

const FormMembro = ({onSubmit, onCancel}) => {

    const {dadosMembro} = useMembroContexto()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const [optionsGrupos, setOptionsGrupos] = useState([])
    const [titulo, setTitulo] = useState('CADASTRAR MEMBRO')

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
                    setTitulo('ATUALIZAR DADOS DO MEMBRO')
                } else {
                    form.resetFields()
                    setTitulo('CADASTRAR MEMBRO')
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
        form.setFieldsValue({ username: value });
    };

    return (
        <Form 
            form={form}
            className="global-form"
            layout="vertical"
            onFinish={onSubmit}
        >
            <Form.Item>
                <h4>{titulo}</h4>
            </Form.Item>

            <Collapse
                collapsible=""
                bordered={false}
                style={{marginBottom: '30px'}}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            >
                <Panel 
                    forceRender
                    style={{
                        padding: '30px', 
                        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                        border: 'none', 
                        backgroundColor: '#FFFFFF'
                    }} 
                    header="DADOS DO MEMBRO" key="1"
                >
                    <div style={{display: "flex", gap: "20px"}}> 

                        <Form.Item name="avatar" hidden>
                            <Input />
                        </Form.Item>

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

                        <Form.Item 
                            style={{flex: "1"}}
                            label="Sexo"
                            name="sexo"
                            rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
                        >
                            <Select 
                                options={optionsSexo} 
                                allowClear 
                                placeholder="Sexo do membro" 
                            />
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
                </Panel>

                <Panel 
                    forceRender
                    style={{
                        padding: '30px', 
                        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                        border: 'none', 
                        backgroundColor: '#FFFFFF'
                    }} 
                    header="USUÁRIO GITHUB" key="2"
                >   
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

                </Panel>

                <Panel 
                    forceRender
                    style={{
                        padding: '30px', 
                        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                        border: 'none', 
                        backgroundColor: '#FFFFFF'
                    }} 
                    header="LINKEDIN/CURRICULO" key="3"
                >
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
                </Panel>

                <Panel 
                    forceRender
                    style={{
                        padding: '30px', 
                        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                        border: 'none', 
                        backgroundColor: '#FFFFFF'
                    }} 
                    header="ACESSO" key="4"
                >
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
                </Panel>
            </Collapse>

            <Space>
                <Button type="primary" htmlType="submit">
                    Salvar
                </Button >

                <Button type="primary" onClick={onCancel} danger >
                    Cancelar
                </Button>
            </Space>

            
        </Form>
    )
}

export default FormMembro