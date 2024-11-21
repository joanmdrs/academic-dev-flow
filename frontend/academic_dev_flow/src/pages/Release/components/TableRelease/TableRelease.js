import { Table } from "antd";
import React from "react";
import RenderEmpty from "../../../../components/Empty/Empty";

const TableRelease = ({columns, data}) => {

    return (
        <React.Fragment>
            {
            data.length !== 0 ? (
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                
                />
            ) : (
                <RenderEmpty title="Nenhuma release para exibir" />
            )
        }
        </React.Fragment>
        
    )
}

export default TableRelease