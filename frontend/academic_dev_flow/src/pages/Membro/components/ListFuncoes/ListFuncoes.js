import "./ListFuncoes.css"
import { Empty, Space, Table, Tooltip } from "antd";
import React from "react";
import { getRandomColor } from "../../../../services/utils";
import { IoMdCreate, IoMdTrash } from "react-icons/io";

const formatarData = (dataIso) => {
    const data = new Date(dataIso);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês começa do 0
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, '0');
    const minutos = String(data.getMinutes()).padStart(2, '0');

    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
};


const ListFuncoes = ({data, onDelete}) => {

    const columnsTable = [
        {
            title: 'Função',
            dataIndex: 'funcao',
            key: 'funcao',

            render: (_, record) => (
                <span 
                    style={{
                        padding: '10px',
                        width: 'fit-content',
                        borderRadius: '5px',
                        backgroundColor: `${getRandomColor()}`,
                        color: '#FFFFFF',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {record.nome_categoria_funcao}
                </span>
            )
        }, 
        {
            title: 'Iteração',
            dataIndex: 'iteracao',
            key: 'iteracao',
            align: 'center',
            render: (_, record) => (
                <Space>
                    {record.nome_iteracao}
                </Space>
            )
        },
        {
            title: 'Data atribuição',
            dataIndex: 'data_atribuicao',
            key: 'data_atribuicao',
            align: 'center',
            render: (_, record) => (
                <Space>{formatarData(record.data_atribuicao)}</Space>
            )
        },
        {
            title: 'Ações',
            dataIndex: 'actions',
            key: 'actions',
            align: 'center',
            render: (_, record) => (
                <Space>
                    <a 
                        onClick={() => onDelete(record.id)}
                    >
                        <Tooltip title="Excluir">
                            <IoMdTrash fontSize="15px" /> 
                        </Tooltip>
                    </a>

                </Space>
                
            )
        }
    ]

    return (
        <div 
            style={{
                padding: '20px'
            }}
        >
            { data.length !== 0 ? (
                <React.Fragment>
                    <Table
                        className="table-funcoes-membro-projeto"
                        dataSource={data}
                        columns={columnsTable}
                        rowKey="id"
                    />
                </React.Fragment>
                
                
            ) : (
                <Empty
                    description="Nenhua função para exibir"
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    style={{
                        display: 'flex',
                        width: "100%",
                        height: "100%",
                        padding: '20px',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                </Empty>
            )

            } 
        </div>
        
    )
}

export default ListFuncoes