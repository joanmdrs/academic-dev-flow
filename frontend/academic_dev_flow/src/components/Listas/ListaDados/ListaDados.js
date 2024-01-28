import { Table } from "antd";
import React, { useState } from "react";
import "./ListaDados.css";

const ListaDados = ({colunas, dados,  onClickRow}) => {

    const [data, setData] = useState([])

    return (
        <React.Fragment> 
            {data.length === 0 ? (
                <Table 
                    className="component-tabela-lista-de-dados" 
                    dataSource={dados} 
                    columns={colunas} 
                    rowKey="id"
                    onRow={(dados) => ({
                        onClick: () => onClickRow(dados),
                        })}
                    />
            ) : null}
        </React.Fragment>
    )

}

export default ListaDados;