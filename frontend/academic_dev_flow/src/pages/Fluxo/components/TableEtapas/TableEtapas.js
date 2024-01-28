import { Table } from "antd";
import React from "react";

const TableEtapas = ({dados, colunas, checkboxMestre, checkboxItems}) => {

    
    
    return (
        <Table 
            dataSource={dados}
            columns={colunas}
            rowKey="id"
        />
    )
}

export default TableEtapas;