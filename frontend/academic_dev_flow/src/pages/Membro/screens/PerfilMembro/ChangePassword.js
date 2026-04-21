import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { alterarSenha } from "../../../../auth/change.password.service";
import { useAuth } from "../../../../hooks/AuthProvider";

const ChangePassword = () => {
    const [form] = useForm();
    const { logOut } = useAuth();

    const validarConfirmacao = (_, value) => {
        if (value && value !== form.getFieldValue("nova_senha")) {
            return Promise.reject("As senhas não coincidem");
        }
        return Promise.resolve();
    };

    const handleSubmit = async (values) => {
        const response = await alterarSenha(values);

        if (!response.error) {
            message.success("Senha alterada com sucesso!");
            form.resetFields();
            logOut();
            
        } else {
            message.error("Erro ao alterar senha");
        }
    };

    return (
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
            <Form.Item
                name="senha_atual"
                label="Senha atual"
                rules={[{ required: true, message: "Informe sua senha atual" }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="nova_senha"
                label="Nova senha"
                rules={[
                    { required: true },
                    { min: 6, message: "Mínimo 6 caracteres" },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirmar"
                label="Confirmar nova senha"
                dependencies={["nova_senha"]}
                rules={[
                    { required: true },
                    { validator: validarConfirmacao },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Button type="primary" htmlType="submit">
                Alterar senha
            </Button>
        </Form>
    );
};

export default ChangePassword;