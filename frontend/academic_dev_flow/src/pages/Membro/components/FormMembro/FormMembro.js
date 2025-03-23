import { Button, Form, Input, Radio, Select, Space, Upload, Image, Avatar } from "antd";
import InputMask from 'react-input-mask';
import { useEffect, useState } from "react";
import { useMembroContexto } from "../../context/MembroContexto";
import Loading from "../../../../components/Loading/Loading";
import { listarGrupos } from "../../../../services/membroService";
import { handleError } from "../../../../services/utils";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";

const optionsSexo = [
    { value: 'M', label: 'Masculino' }, 
    { value: 'F', label: 'Feminino' }, 
    { value: 'O', label: 'Outro' }
];

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  

const FormMembro = ({ onSubmit, onCancel }) => {
    const { dadosMembro } = useMembroContexto();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [optionsGrupos, setOptionsGrupos] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                await handleListarGrupos();
                if (dadosMembro) {
                    form.setFieldsValue(dadosMembro);
                } else {
                    form.resetFields();
                }
            } catch (error) {
                handleError(error, ERROR_MESSAGE_ON_SEARCHING);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [dadosMembro]);

    const handleListarGrupos = async () => {
        try {
            const response = await listarGrupos();
            if (!response.error) {
                const results = response.data.map(item => ({ value: item.id, label: item.name }));
                setOptionsGrupos(results);
            }
        } catch (error) {
            handleError(error, ERROR_MESSAGE_ON_SEARCHING);
        }
    };

    // const handleChange = ({ fileList }) => setFileList(fileList);

    // const uploadProps = {
    //     beforeUpload: (file) => {
    //         const isImage = file.type.startsWith('image/');
    //         if (!isImage) {
    //             return false;
    //         }
    //         return true;
    //     },
    //     onPreview: async (file) => {
    //         if (!file.url && !file.preview) {
    //           file.preview = await getBase64(file.originFileObj);
    //         }
    //         setPreviewImage(file.url || file.preview);
    //         setPreviewOpen(true);
    //     },
    //     onChange: handleChange,
    //     listType: "picture-circle",
    //     maxCount: 1,
    //     accept: "image/jpg,image/jpeg,image/png,image/gif"
    // };

    const handleEmailChange = (e) => {
        const { value } = e.target;
        form.setFieldsValue({ username: value });
    };

    if (loading) {
        return <Loading />;
    }


    return (
        <Form form={form} layout="vertical" onFinish={onSubmit} className="global-form">
            {/* <Form.Item name="avatar">
                <Upload {...uploadProps}>
                    {fileList.length < 1 && (
                        <Avatar  size={80} icon={<UserOutlined />} />

                    )}
                </Upload>
            </Form.Item> */}

            {/* {previewImage && (
                <Image
                    wrapperStyle={{
                        display: 'none',
                    }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )} */}

            <Form.Item label="Nome" name="nome" rules={[{ required: true, message: 'Por favor, preencha este campo!' }]}>
                <Input placeholder="Nome do membro" />
            </Form.Item>

            <Form.Item label="Data de Nascimento" name="data_nascimento" style={{width: 'fit-content'}}>
                <Input type="date" placeholder="Data de nascimento" allowClear />
            </Form.Item>

            <Form.Item label="Sexo" name="sexo" rules={[{ required: true, message: 'Por favor, marque uma opção!' }]}>
                <Radio.Group options={optionsSexo} />
            </Form.Item>

            <Form.Item name="telefone" label="Telefone" style={{width: 'fit-content'}}>
                <InputMask mask="(99) 99999-9999" maskChar={null}>
                    {() => <Input placeholder="Telefone (opcional)" />}
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

            <Form.Item 
                name="nome_github"
                label="Nome do Usuário"
            >
                <Input name="nome_github" placeholder="nome do usuário do GitHub" />
            </Form.Item>

            <Form.Item 
                name="email_github"
                label="Email do GitHub"
            >
                <Input name="email_github" placeholder="email do usuario do GitHub"/>
            </Form.Item>

            <Form.Item 
                name="usuario_github"
                label="Username do GitHub"
                style={{width: '50%'}}
            >
                <Input name="usuario_github" placeholder="username do GitHub" />
            </Form.Item>

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
                style={{width: '50%'}}
            >
                <Input.Password name="password" placeholder="senha de acesso"/>
            </Form.Item>


            <Form.Item 
                name="grupo" 
                label="Grupo de Usuário" 
                rules={[{ required: true, message: 'Por favor, selecione uma opção!' }]}
                style={{width: '50%'}}
            > 
                <Select options={optionsGrupos} />
            </Form.Item>

            <Space>
                <Button type="primary" htmlType="submit">Salvar</Button>
                <Button type="primary" danger onClick={onCancel}>Cancelar</Button>
            </Space>
        </Form>
    );
};

export default FormMembro;
