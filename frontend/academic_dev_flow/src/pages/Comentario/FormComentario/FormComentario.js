import React, { useEffect, useState } from "react";
import './FormComentario.css'
import { Editor } from 'primereact/editor';
import { Button, Form, Input } from "antd";
import { decodeToken } from "react-jwt";
import { buscarMembroPeloUser } from "../../../services/membroService";
import { criarComentario } from "../../../services/comentarioService";
import { FaCircleUser } from "react-icons/fa6";
import { useForm } from "antd/es/form/Form";
import { useProjetoContext } from "../../../context/ProjetoContext";

                
const FormComentario = ({onSubmit}) => {

    const [token] = useState(localStorage.getItem("token") || null);
    const [form] = useForm()
    const {dadosComentario, setAutor} = useProjetoContext()

    useEffect(() => {
        const fetchData = async () => {
            if (token !== null){
                await handleGetMembro()
            }
            
        };
        fetchData()
        
    }, [token]);

    const handleGetMembro = async () => {

        const decodedToken = await decodeToken(token);
        const response = await buscarMembroPeloUser(decodedToken.user_id)
        const idAutor = response.data.id_membro_projeto
        setAutor(idAutor)
    }

    return (

        <Form form={form} className="form-comments" layout="vertical" onFinish={onSubmit}>

            <div>
                <FaCircleUser size="25px" />
            </div>

            <div style={{flex: '1'}}>

                <Form.Item name="texto">
                    <Input.TextArea rows={4} name="texto" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Comentar
                    </Button>
                </Form.Item>
            </div>
            

        </Form>
 
    )
}
        

export default FormComentario