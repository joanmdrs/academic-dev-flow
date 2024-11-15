import { Table } from "antd";
import React from "react";
import RenderEmpty from "../../../../components/Empty/Empty";

const TableFluxos = ({data, columns}) => {


    return (
        <React.Fragment>
            { data.length !== 0 ? (
                <Table 
                    className="bs-1 pa-20" 
                    dataSource={data} 
                    columns={columns} 
                    rowKey="id"
                />
            ) : (
                <RenderEmpty title="Nenhum fluxo para exibir" />
            )}
        </React.Fragment>
    )
}

export default TableFluxos