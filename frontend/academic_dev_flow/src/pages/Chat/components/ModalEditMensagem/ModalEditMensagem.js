import { Form, Input, Modal } from "antd";
import React, { useEffect } from "react";
import { useContextoChat } from "../../context/ContextoChat";

const ModalEditMensagem = ({ visible, onCancel, onOk }) => {
    const [form] = Form.useForm();
    const {mensagemToUpdate} = useContextoChat()

    useEffect(() => {
        if (mensagemToUpdate && visible) {
            console.log(mensagemToUpdate)
            form.setFieldValue('conteudo', mensagemToUpdate.conteudo)
        }
    }, [mensagemToUpdate]);
   
    return (
        <Modal
            title="Editar Mensagem"
            open={visible}
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        onOk(values);
                        form.resetFields();  // Resetar campos apenas após confirmar a edição
                    })
                    .catch((info) => {
                        console.log('Validation Failed:', info);
                    });
            }}
            okText={"OK"}
            cancelText="Cancelar"
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="conteudo"
                    rules={[{ required: true, message: 'Este campo não pode ser vazio' }]}
                >
                    <Input 
                        placeholder="Preencha este campo"
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalEditMensagem;
