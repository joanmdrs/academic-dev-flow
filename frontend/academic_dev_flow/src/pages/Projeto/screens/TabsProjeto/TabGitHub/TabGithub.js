import { Button, Form, Input, Space } from "antd";
import React, { useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import { useContextoProjeto } from "../../../context/ContextoProjeto";

const TabGitHub = ({onSubmit, onCancel}) => {

    const [form] = useForm()
    const {dadosProjeto} = useContextoProjeto()
    
    useEffect(() => {

        const fetchData = async () => {
            try {
                form.setFieldsValue(dadosProjeto)
            } catch (error) {
            } finally {
            }
        };
        fetchData();
    }, [dadosProjeto, form]);

    return (
        <React.Fragment>
            { dadosProjeto ? (
                <Form 
                    className="global-form" 
                    form={form} 
                    onFinish={onSubmit} 
                    labelCol={{
                        span: 6,
                    }}  
                >
                    <Form.Item label="Informe (proprietário/repositório):" name="nome_repo">
                        <Input name="nome_repo"/>
                    </Form.Item>
        
                    <Form.Item label="Link do repositório:" name="link_repo">
                        <Input name="link_repo" />
                    </Form.Item>
        
                    <Form.Item label="Link do MVP:" name="link_site">
                        <Input name="link_site" />
                    </Form.Item>
        
                    <Form.Item label="Token de acesso:" name="token">
                        <Input name="token" />
                    </Form.Item>
        
                    <Space>
                        <Button type="primary" htmlType="submit"> Salvar </Button>
                        <Button type="primary" danger onClick={() => onCancel()}> Cancelar </Button>
                    </Space>
        
                </Form>  
            ) : (
                <div> 
                    É necessário cadastrar os dados do projeto primeiro.
                </div>
            )}
        </React.Fragment>      
        
    )
}

export default TabGitHub