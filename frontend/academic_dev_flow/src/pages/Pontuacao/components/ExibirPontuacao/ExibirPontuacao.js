import "./ExibirPontuacao.css";
import React from "react";
import { Button, Empty } from "antd";
import { FaTrash } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useContextoPontuacao } from "../../context/ContextoPontuacao";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";

const ExibirPontuacao = ({ onEdit, onDelete }) => {
  const { dadosPontuacao } = useContextoPontuacao();
  const { grupo } = useContextoGlobalProjeto()

  return (
    <div className="global-form">
      {dadosPontuacao !== null && (
        <div>
          {grupo === "Docentes" && (
            <div className="score-buttons">
              <Button onClick={onEdit} type="primary" ghost>
                {" "}
                <FaEdit /> Editar{" "}
              </Button>
              <Button onClick={onDelete} danger>
                {" "}
                <FaTrash /> Excluir{" "}
              </Button>
            </div>
          )}

          {(grupo === "Discentes" && dadosPontuacao.disponivel) ||
          grupo === "Docentes" ? (
            <div className="score-container">
              <div className="score-note">
                <h2> Nota: {dadosPontuacao.nota} </h2>
              </div>
              <div className="score-comment">
                <h4>Comentário(s):</h4>
                <p> {dadosPontuacao.comentario} </p>
              </div>
              <div className="score-autor">
                <h4>
                  {" "}
                  Professor:{" "}
                  <span style={{ fontWeight: "400" }}>
                    {" "}
                    {dadosPontuacao.nome_autor}{" "}
                  </span>
                </h4>
              </div>
            </div>
          ) : (
            <Empty
              description="As notas não estão disponíveis"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ExibirPontuacao;
