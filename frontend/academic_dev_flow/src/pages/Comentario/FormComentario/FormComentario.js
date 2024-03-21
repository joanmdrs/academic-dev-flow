import React, { useEffect, useState } from "react";
import './FormComentario.css'
import { Editor } from 'primereact/editor';
import { Button, Form } from "antd";
import { decodeToken } from "react-jwt";
import { buscarMembroPeloUser } from "../../../services/membroService";
import { criarComentario } from "../../../services/comentarioService";
                
const FormComentario = ({onSubmit}) => {

    const [comment, setComment] = useState('');
    const [token] = useState(localStorage.getItem("token") || null);
    const [autor, setAutor] = useState(null)

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

        <Form className="form-comments" layout="vertical" onFinish={() => onSubmit(autor, comment)}>
            <Form.Item>

                <h3> Adicione um comentário </h3>

                <Editor 
                    className="text-editor"
                    value={comment} 
                    onTextChange={(e) => setComment(e.htmlValue)} 
                    style={{ 
                        minHeight: "100px"
                    }} 
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Comentar
                </Button>
            </Form.Item>

        </Form>
 
    )
}
        

export default FormComentario