import { Empty, Space, Table, Tooltip } from "antd";
import React from "react";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import { formatDate } from "../../../../services/utils";
import RenderStatus from "../../../../components/RenderStatus/RenderStatus";
import { optionsStatusReleases } from "../../../../services/optionsStatus";

const TableRelease = ({columns, data}) => {

    const rowSelection = {
        onChange: (selectedRowsKeys, selectedRows) => {
            console.log(selectedRows)
        },
    };

    return (
        <React.Fragment>
            {
            data.length !== 0 ? (
                <Table
                    className="bs-1 pd-20"
                    columns={columns}
                    dataSource={data}
                    rowKey="id"
                    rowSelection={rowSelection}
                
                />

                
            ) : (
                <Empty
                    description="Nenhuma release para exibir"
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    style={{
                        display: 'flex',
                        width: "100%",
                        height: "100%",
                        padding: '40px',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                </Empty>
            )
        }
        </React.Fragment>
        
    )
}

export default TableRelease