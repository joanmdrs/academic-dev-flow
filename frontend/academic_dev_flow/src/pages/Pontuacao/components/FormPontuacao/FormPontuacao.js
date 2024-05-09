import { Button, Checkbox, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import { useContextoArtefato } from "../../../Artefato/context/ContextoArtefato";
import { useContextoPontuacao } from "../../context/ContextoPontuacao";

const FormPontuacao = ({onSubmit, onCancel}) => {
    
    const {dadosArtefato} = useContextoArtefato()
    const {dadosPontuacao} = useContextoPontuacao()

    const [form] = useForm()

    useEffect(() => {
        const fetchData = async () => {
            if (dadosPontuacao) {
                form.setFieldsValue(dadosPontuacao)
            }
        }

        fetchData()
    }, [])  
    
    return (
        <Form className="global-form" onFinish={onSubmit} form={form} layout="vertical">

            <Form.Item>
                <h4 style={{margin: 0}}> 
                    REGISTRAR PONTUAÇÃO - <span style={{color: "var(--primary-color)"}}>{dadosArtefato.nome} </span>
                </h4>
            </Form.Item>

            <Form.Item label="Nota" name="nota">
                <Input name="nota" type="number" step="0.01" style={{width: 'fit-content'}} />
            </Form.Item>

            <Form.Item label="Comentário" name="comentario"  >
                <Input.TextArea name="comentario" rows={4} style={{width: '50%'}} />
            </Form.Item>

            <Form.Item label="Liberar" name="disponivel" valuePropName="checked">
                <Checkbox />
            </Form.Item>

            <Form.Item >
                <Button style={{marginRight: '10px'}} type="primary" htmlType="submit"> Salvar </Button>
                <Button  onClick={onCancel}> Cancelar </Button>
            </Form.Item>
        </Form>
    )
}

export default FormPontuacao