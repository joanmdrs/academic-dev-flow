import { Button, Empty } from "antd";
import React from "react";
import "./ViewDetalhesEtapas.css";
import { AiFillEdit } from "react-icons/ai";
import { IoMdTrash } from "react-icons/io";
import { useFormContext } from "../../context/Provider/FormProvider";

const ViewDetalhesEtapas = ({ funcaoBotaoEditar, funcaoBotaoExcluir }) => {
  const { hasDadosEtapas } = useFormContext();

  if (!hasDadosEtapas || hasDadosEtapas.length === 0) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="form-box" />;
  }

  return (
    <div className="component-lista-etapas">
      {hasDadosEtapas.map((etapa, id) => (
        <div key={id} className="item-etapa">
          <div className="campo-item-etapa">
            <h5> Nome: </h5>
            <p> {etapa.nome} </p>
          </div>
          <div className="campos-agrupados">
            <div className="campo-item-etapa">
              <h5> Data de início:</h5>
              <p> {etapa.data_inicio} </p>
            </div>
            <div className="campo-item-etapa">
              <h5> Data final:</h5>
              <p> {etapa.data_fim} </p>
            </div>
            <div className="campo-item-etapa">
              <h5> Status:</h5>
              <p> {etapa.status} </p>
            </div>
          </div>
          <div className="campo-item-etapa">
            <h5>Descrição: </h5>
            <p> {etapa.descricao} </p>
          </div>
          <div className="campo-item-etapa botoes-acao">
            <h5> Ações </h5>
            <Button icon={<AiFillEdit />} onClick={() => funcaoBotaoEditar(etapa)}> Editar</Button>
            <Button icon={<IoMdTrash />} onClick={() => funcaoBotaoExcluir(etapa)}> Excluir </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewDetalhesEtapas;
