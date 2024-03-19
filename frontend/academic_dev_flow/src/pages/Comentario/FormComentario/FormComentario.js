import React, { useEffect, useState } from "react";
import './FormComentario.css'
import { Editor } from 'primereact/editor';
import { Button, Form } from "antd";
import { decodeToken } from "react-jwt";
import { buscarMembroPeloUser } from "../../../services/membroService";
import { criarComentario } from "../../../services/comentarioService";
                
const FormComentario = () => {

    const [contentEditor, setContentEditor] = useState('');

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
        setAutor(response.data)
    }

    const handleSaveComment = async () => {
        const dados = {
            texto: contentEditor,
            autor: autor.id_membro_projeto
        }

        const response = await criarComentario(dados)
        console.log(response)
    }

    return (

        <Form className="form-comment" layout="vertical" onFinish={handleSaveComment}>
            <Form.Item className="form-item-text-editor" label='Adicione um comentário' >
                <Editor 
                    className="text-editor"
                    value={contentEditor} 
                    onTextChange={(e) => setContentEditor(e.htmlValue)} 
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