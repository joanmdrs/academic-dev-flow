import React, { useEffect, useState } from 'react';
import './ArvoreComentarios.css';
import { Avatar, Button, Dropdown, Form, Input, Menu, Space } from 'antd';
import FormComentario from '../FormComentario/FormComentario';
import { atualizarComentario, criarComentario, excluirComentario, listarComentariosPorDocumento } from '../../../services/comentarioService';
import { Editor } from 'primereact/editor';
import { SlOptions } from 'react-icons/sl';
import { formatDate } from '../../../services/utils';
import { useProjetoContext } from '../../../context/ProjetoContext';
import { FaCircleUser, FaRegCircleUser } from 'react-icons/fa6';

const ArvoreComentarios = ({ documento }) => {
  const [comentarios, setComentarios] = useState([]);
  const [comentarioEditado, setComentarioEditado] = useState(null);
  const [editorVisible, setEditorVisible] = useState(false);
  const {dadosComentario, setDadosComentario, autor} = useProjetoContext()

  useEffect(() => {
    const fetchData = async () => {
      if (documento) {
        await handleGetComments();
      }
    };

    fetchData();
  }, [documento]);

  const handleGetComments = async () => {
    const response = await listarComentariosPorDocumento(documento.id);
    setComentarios(response.data);
  };

  const handleEdit = (comentario) => {
    setDadosComentario(comentario)
    setComentarioEditado(comentario);
    setEditorVisible(true);
  };

  const handleCancelEdit = () => {
    setComentarioEditado(null);
    setEditorVisible(false);
  };

  const handleUpdateComment = async (texto) => {
    await atualizarComentario(dadosComentario.id, texto)
    setComentarioEditado(null);
    setEditorVisible(false);
    await handleGetComments()
  };

  const handleCreateComment = async (dados) => {
    const dadosEnviar = {
      texto: dados.texto,
      autor: autor,
      documento: documento.id
    }
    await criarComentario(dadosEnviar)
    await handleGetComments()
  }
  
  const handleDeleteComment = async (idComentario) => {
    await excluirComentario(idComentario)
    await handleGetComments()
  }


  return (
    <React.Fragment>

      {comentarios.length !== 0 && (

        <div className='section-comments'>

          {comentarios.map((comentario) => (

            <div key={comentario.id} className='container-comment'>

              <div className='header-comment'>
                <div className='info-comment'>
                  <div>
                    <Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${"1"}`} />
                  </div>

                  <h4 className='autor-comment'>
                    {comentario.nome_autor}
                  </h4>

                  <span className='data-comment'>
                    {formatDate(comentario.data_hora)}
                  </span>

                </div>
                

                <Dropdown trigger={['click']} overlay={
                    <Menu>
                      <Menu.Item onClick={() => handleEdit(comentario)} key="1">Editar</Menu.Item>
                      <Menu.Item onClick={() => handleDeleteComment(comentario.id)} style={{color: 'red'}} key="2">Excluir</Menu.Item>
                    </Menu>
                  }>
                  <Button onClick={(e) => e.preventDefault()}>
                    <Space>
                      <SlOptions />
                    </Space>
                  </Button>
                </Dropdown>
                
              </div>

              {comentarioEditado && comentarioEditado.id === comentario.id && editorVisible ? (
                <div style={{padding: "10px", display: 'flex', flexDirection: 'column', gap:'20px'}}>

                  <Form>
                    <Form.Item>
                      <Input.TextArea
                        value={comentarioEditado.texto}
                        onChange={(e) => setComentarioEditado({ ...comentarioEditado, texto: e.target.value })}
                        rows={4}
                      />
                    </Form.Item>
                  </Form>
                  <div style={{display: 'flex', gap: '5px'}}>
                    <Button onClick={() => handleUpdateComment(comentario.id, comentarioEditado)}  type='primary'> Atualizar Comentário</Button>
                    <Button onClick={handleCancelEdit} danger> Cancelar </Button>
                  </div>

                </div>
            

              ) : (
                <div className='content-comment'>
                  {comentario.texto}
                </div>
              )}

            </div>

          ))}

        </div>
      )}

      <div style={{borderTop: "2px solid var(--primary-color)", marginTop: '30px', marginBottom: "30px", width: '70%'}}>
        <h3> Adicione um comentário </h3>
      </div>

      <FormComentario onSubmit={handleCreateComment} />

    </React.Fragment>
  );
};

export default ArvoreComentarios;
