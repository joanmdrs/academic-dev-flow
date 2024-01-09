import { Table } from "antd";
import React, { useState } from "react";
import "./ListaDeArtefatos.css";

const ListaDeArtefatos = ({colunas}) => {

    const [data, setData] = useState([])

    return (
        <div> 
            {data.length == 0 ? (
                <>
                    <Table 
                        className="tabela-lista-de-artefatos" 
                        dataSource={data} 
                        columns={colunas} 
                        rowKey="id"/>
                </>
            ) : null}
        </div>
    )

}

export default ListaDeArtefatos;