import React, { useEffect, useState } from "react";
import { useContextoGlobalUser } from "../../../../context/ContextoGlobalUser/ContextoGlobalUser";
import { useMembroContexto } from "../../context/MembroContexto";
import Loading from "../../../../components/Loading/Loading";
import { atualizarMembro, buscarMembroPeloId, listarGrupos } from "../../../../services/membroService";
import { useNavigate } from "react-router-dom";
import Titulo from "../../../../components/Titulo/Titulo";
import { Avatar, Breadcrumb, Button, Form, Input, Select, Space, Tabs } from "antd";
import { useForm } from "antd/es/form/Form";
import InputMask from 'react-input-mask';
import { EditOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import ModalAvatars from "../../components/ModalAvatars/ModalAvatars";
import { getRandomColor } from "../../../../services/utils";
import Section from "../../../../components/Section/Section";
import SectionHeader from "../../../../components/SectionHeader/SectionHeader";

const {TabPane} = Tabs

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

const PerfilMembro = ({group}) => {

    const navigate = useNavigate()
    const {usuario, grupo} = useContextoGlobalUser()
    const {dadosMembro, setDadosMembro} = useMembroContexto()
    const [loading, setLoading] = useState(true)
    const [form] = useForm()
    const [optionsGrupos, setOptionsGrupos] = useState([])
    const [inputSelectGroupDisabled, setInputSelectGroupDisabled] = useState(true)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleSelectAvatar = (id) => {
        setSelectedAvatar(id);
    };


    const handleCancelar = () => {
        navigate(-1)
    }

    const handleListarGrupos = async () => {
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
    }

    const handleCarregarDadosMembro = async () => {
        const response = await buscarMembroPeloId(usuario.id)
        
        if (!response.error){
            setDadosMembro(response.data)
            form.setFieldsValue(response.data)

        }
        setLoading(false)
    }

    const handleAtualizarMembro = async (dadosForm) => {
        const response = await atualizarMembro(dadosMembro.id, dadosForm)
        if(!response.error){
            setDadosMembro(response.data)
        }
    }

    const handleEmailChange = (e) => {
        const { value } = e.target;
        form.setFieldsValue({ username: value });
    };

    useEffect(() => {
        const fetchData = async () => {
            if (grupo === 'Administradores'){
                setInputSelectGroupDisabled(false)
            }

            if (usuario && usuario.id){
                await handleCarregarDadosMembro()
                await handleListarGrupos()
            }

        }

        fetchData()
    }, [usuario, grupo])

    if (loading) {
        return <Loading />
    }


    return (
        <Section>
            <SectionHeader>
                <Breadcrumb
                    items={[
                        {
                            href: `/academicflow/${group}/home`,
                            title: <HomeOutlined />,
                        },
                        {
                            href: `/academicflow/${group}/perfil`,
                            title: 'Perfil',
                        },
                        
                    ]}
                />
            </SectionHeader>
            
            <Form 
                layout="vertical"
                style={{marginTop: '20px'}}
                form={form}
                onFinish={handleAtualizarMembro}
            >
                <Tabs tabPosition="left">
                    <TabPane className="global-div" style={{marginTop: '0'}} tab="Dados" key="1" forceRender> 

                        <Avatar size={150} style={{ backgroundColor: getRandomColor() }}>
                            {dadosMembro?.nome ? dadosMembro.nome.charAt(0).toUpperCase() : <UserOutlined />}
                        </Avatar>

                        {/* <div 
                            style={{ 
                                position: "relative", 
                                width: "250px", 
                                height: "250px"
                            }}
                        > 
                            <Avatar
                                style={{ width: "250px", height: "250px", border: '1px solid #ddd' }}
                                src={`https://avatar.iran.liara.run/public/${selectedAvatar || dadosMembro.avatar}`}
                                icon={<UserOutlined />}
                            />
                            <Button
                                icon={<EditOutlined />}
                                style={{
                                    border: "none", 
                                    backgroundColor: 'var(--primary-color)',
                                    color: '#FFFFFF',
                                    position: "absolute",
                                    bottom: "10px",
                                    right: "10px",
                                    height: '40px',
                                    width: '40px',
                                    padding: '10px',
                                    borderRadius: '50%',
                                    zIndex: 1,
                                }}
                                onClick={handleOpenModal}
                            />
                        </div> */}

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
                            style={{width: '25%'}}
                            label="Data de Nascimento" 
                            name="data_nascimento"
                            rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
                        >
                            <Input type="date"/>
                            
                        </Form.Item>

                        <Form.Item 
                            style={{width: '25%'}}
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

                        <Form.Item
                            style={{width: '25%'}}
                            name="telefone"
                            label="Telefone"
                            rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
                        >
                            <InputMask mask="(99) 99999-9999" maskChar={null}>
                            {() => <Input placeholder="telefone do membro"/>}
                            </InputMask>
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                            { required: true, message: 'Por favor, preencha este campo!' },
                            { type: 'email', message: 'Por favor, insira um email válido!' },
                            ]}
                        >
                            <Input placeholder="email do membro" onChange={handleEmailChange}/>
                        </Form.Item>
                    </TabPane>

                    <TabPane tab="GitHub" key="2" className="global-div" style={{marginTop: '0'}} forceRender> 
                        <Form.Item 
                            style={{width: '50%'}}
                            name="nome_github"
                            label="Nome do Usuário"
                        >
                            <Input name="nome_github" placeholder="nome do usuário do GitHub" />
                        </Form.Item>

                        <Form.Item 
                            style={{width: '50%'}}
                            name="email_github"
                            label="Email do GitHub"
                        >
                            <Input name="email_github" placeholder="email do usuario do GitHub"/>
                        </Form.Item>

                        <Form.Item 
                            style={{width: '50%'}}
                            name="usuario_github"
                            label="Username do GitHub"
                        >
                            <Input name="usuario_github" placeholder="username do GitHub" />
                        </Form.Item>
                    </TabPane>

                    <TabPane tab="Currículo" key="3" className="global-div" style={{marginTop: '0'}} forceRender> 
                        <Form.Item 
                            name="linkedin"
                            label="Perfil do Linkedin"
                        >
                            <Input name="linkedin" placeholder="perfil do LinkedIn" />
                        </Form.Item>

                        <Form.Item 
                            name="lattes"
                            label="Currículo Lattes"
                        >
                            <Input name="lattes" placeholder="link do currículo Lattes" />
                        </Form.Item>
                    </TabPane>

                    <TabPane tab="Acesso" key="4" className="global-div" style={{marginTop: '0'}} forceRender> 
                        <Form.Item
                            style={{width: '25%'}}
                            name="username"
                            label="Usuário de Acesso"
                            rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
                        >
                            <Input name="username" disabled/> 

                        </Form.Item>
                        <Form.Item
                            style={{width: '25%'}}
                            name="password"
                            label="Senha de Acesso"
                            rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}
                        >
                            <Input.Password name="password" placeholder="senha de acesso"/>
                        </Form.Item>

                        <Form.Item 
                            style={{width: '25%'}}
                            name="grupo"
                            label="Grupo de Usuário"
                            rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
                        >
                            <Select disabled={inputSelectGroupDisabled} options={optionsGrupos}/>
                            
                        </Form.Item>
                    </TabPane>
                </Tabs>
                <Space style={{width: '100%', display: 'flex', justifyContent: 'flex-end', paddingRight: '20px'}}>
                    <Button onClick={() => handleCancelar()} danger type="primary"> Cancelar </Button>
                    <Button type="primary" htmlType="submit"> Salvar </Button >
                </Space>
            </Form>
    
            <ModalAvatars
                isVisible={isModalVisible}
                onClose={handleCloseModal}
                onSelect={handleSelectAvatar}
                gender={dadosMembro.sexo}
            />
        </Section>
    )
}

export default PerfilMembro