import React, { useEffect, useState } from 'react';
import './ArvoreComentarios.css';
import { Button, Dropdown, Menu, Space } from 'antd';
import FormComentario from '../FormComentario/FormComentario';
import { criarComentario, listarComentariosPorDocumento } from '../../../services/comentarioService';
import { Editor } from 'primereact/editor';
import { SlOptions } from 'react-icons/sl';
import { formatDate } from '../../../services/utils';

const ArvoreComentarios = ({ documento }) => {
  const [comentarios, setComentarios] = useState([]);
  const [comentarioEditado, setComentarioEditado] = useState(null);
  const [editorVisible, setEditorVisible] = useState(false);

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
    setComentarioEditado(comentario);
    setEditorVisible(true);
  };

  const handleCancelEdit = () => {
    setComentarioEditado(null);
    setEditorVisible(false);
  };

  const handleSaveEdit = () => {
    // Implemente a lógica para salvar o comentário editado
    setComentarioEditado(null);
    setEditorVisible(false);
  };

  const handleCreateComment = async (autor, comment) => {
    const dados = {
      texto: comment,
      autor: autor,
      documento: documento.id
    }

    await criarComentario(dados)
    await handleGetComments()
  }


  return (
    <React.Fragment>

      {comentarios.length !== 0 && (

        <div className='section-comments'>

          {comentarios.map((comentario) => (

            <div key={comentario.id} className='container-comment'>

              <div className='header-comment'>

                <span className='autor-comment'>
                  {comentario.nome_autor} | {formatDate(comentario.data_hora)}
                </span>

                <Dropdown trigger={['click']} overlay={
                    <Menu>
                      <Menu.Item onClick={() => handleEdit(comentario)} key="1">Editar</Menu.Item>
                      <Menu.Item style={{color: 'red'}} key="2">Excluir</Menu.Item>
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

                  <Editor 
                    style={{ minHeight: '100px' }}
                    value={comentarioEditado.texto}
                    onTextChange={(e) => setComentarioEditado({ ...comentarioEditado, texto: e.htmlValue })}
                  />

                  <div style={{display: 'flex', gap: '5px'}}>
                    <Button type='primary'> Atualizar Comentário</Button>
                    <Button onClick={handleCancelEdit} danger> Cancelar </Button>
                  </div>

                </div>
            

              ) : (
                <div className='content-comment' dangerouslySetInnerHTML={{ __html: comentario.texto }}>
                </div>
              )}

            </div>

          ))}

        </div>
      )}

      <FormComentario onSubmit={handleCreateComment} />

    </React.Fragment>
  );
};

export default ArvoreComentarios;
