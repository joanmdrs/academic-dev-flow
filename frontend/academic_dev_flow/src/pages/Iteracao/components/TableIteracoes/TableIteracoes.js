import { Table } from "antd";
import React from "react";
import RenderEmpty from "../../../../components/Empty/Empty";

const TableIteracoes = ({columns, data}) => {


    return (
        <React.Fragment>
            {
            data.length !== 0 ? (
                <Table  
                    className="bs-1 pa-20"
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                />

                
            ) : (
                <RenderEmpty title="Nenhuma iteração para exibir" />
            )
        }
        </React.Fragment>
        
    )
}

export default TableIteracoes