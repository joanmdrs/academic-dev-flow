import { Table } from "antd";
import React, { useState } from "react";
import "./ListaDeArtefatos.css";

const ListaDeArtefatos = ({colunas, dados, onClickRow}) => {

    const [data, setData] = useState([])

    return (
        <div> 
            {data.length === 0 ? (
                <>
                    <Table 
                        className="tabela-lista-de-artefatos" 
                        dataSource={dados} 
                        columns={colunas} 
                        rowKey="id"
                        onRow={(dados) => ({
                            onClick: () => onClickRow(dados),
                          })}
                        />
                </>
            ) : null}
        </div>
    )

}

export default ListaDeArtefatos;