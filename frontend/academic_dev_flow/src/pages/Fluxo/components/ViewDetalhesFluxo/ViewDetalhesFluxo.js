import React from "react";
import { Empty } from "antd";
import "./ViewDetalhesFluxo.css";
import { useFormContext } from "../../context/Provider/FormProvider";

const DetalharFluxo = () => {
  const { hasDadosFluxo } = useFormContext();

  if (!hasDadosFluxo || (!hasDadosFluxo.nome && !hasDadosFluxo.descricao)) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} className="form-box"/>;
  }

  return (
    <div className="component-detalhar-fluxo">
      <h5> Nome: </h5>
      <p> {hasDadosFluxo.nome} </p>

      <h5> Descrição: </h5>
      <p> {hasDadosFluxo.descricao}</p>
    </div>
  );
};

export default DetalharFluxo;
