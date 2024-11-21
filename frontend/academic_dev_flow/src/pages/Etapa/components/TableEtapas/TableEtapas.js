import React from "react";
import { useContextoEtapa } from "../../context/ContextoEtapa";
import { Table } from "antd";
import RenderEmpty from "../../../../components/Empty/Empty";

const TableEtapas = ({data, columns}) => {
    
    const {setEtapasSelecionadas} = useContextoEtapa()

    const rowSelection = {
        onChange: (selectedRowsKeys, selectedRows) => {
          setEtapasSelecionadas(selectedRows)
        },
    };

    return (
        <React.Fragment> 
            { data.length !== 0 ? (
                <Table 
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                    rowSelection={rowSelection}
                />
            ) : (
                <RenderEmpty title="Nenhuma etapa para exibir " /> 
            )}
            
        </React.Fragment>
    )
}

export default TableEtapas