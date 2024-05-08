import { Button, Dropdown, Form, Input, Menu, Space } from "antd";
import { formatDate } from "../../../../services/utils";
import "./ListaComentarios.css";
import React from "react";
import { SlOptions } from "react-icons/sl";
import { useContextoComentario } from "../../context/ContextoComentario";

const ListaComentarios = ({ comentarios, onUpdate, onDelete }) => {
    const { 
        setDadosComentario, 
        comentarioEditado, 
        setComentarioEditado,
        editorVisivel, 
        setEditorVisivel

    } = useContextoComentario();

  const handleEditar = (comentario) => {
    setDadosComentario(comentario);
    setComentarioEditado(comentario);
    setEditorVisivel(true);
  };

  const handleCancelarEdicao = () => {
    setComentarioEditado(null);
    setEditorVisivel(false);
  };

  return (
    <div>
      {comentarios.length > 0 ? (
        <React.Fragment>
          {comentarios.map((comentario) => (
            <div key={comentario.id} className="global-div" style={{width: '50%', padding: '0'}}>
              <div className="header-comment">
                <div className="info-comment">
                  <h4 className="autor-comment">{comentario.nome_autor}</h4>
                  <span className="data-comment">
                    {formatDate(comentario.data_hora)}
                  </span>
                </div>
                <Dropdown
                  trigger={["click"]}
                  overlay={
                    <Menu>
                      <Menu.Item onClick={() => handleEditar(comentario)} key="1">
                        Editar
                      </Menu.Item>
                      <Menu.Item
                        onClick={() => onDelete(comentario.id)}
                        style={{ color: "red" }}
                        key="2"
                      >
                        Excluir
                      </Menu.Item>
                    </Menu>
                  }
                >
                  <Button onClick={(e) => e.preventDefault()}>
                    <Space>
                      <SlOptions />
                    </Space>
                  </Button>
                </Dropdown>
              </div>

              {comentarioEditado?.id === comentario.id && editorVisivel ? (
                <div style={{ padding: "10px", display: "flex", flexDirection: "column", gap: "20px" }}>
                  <Form>
                    <Form.Item>
                      <Input.TextArea
                        value={comentarioEditado.texto}
                        onChange={(e) => setComentarioEditado({ ...comentarioEditado, texto: e.target.value })}
                        rows={4}
                      />
                    </Form.Item>
                  </Form>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <Button onClick={() => onUpdate(comentario.id, comentarioEditado.texto)} type="primary">
                      Atualizar Comentário
                    </Button>
                    <Button onClick={handleCancelarEdicao} danger>
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="content-comment">
                  <p>{comentario.texto}</p>
                </div>
            
              )}
            </div>
          ))}
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default ListaComentarios;
