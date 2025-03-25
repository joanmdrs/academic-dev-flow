import { Avatar, Space, Switch, Table, Tooltip } from "antd";
import React from "react";
import RenderEmpty from "../../../../components/Empty/Empty";
import RenderCategoria from "../../../../components/RenderCategoria/RenderCategoria";
import { IoIosCheckmark, IoIosClose, IoMdTrash } from "react-icons/io";
import { UserOutlined } from "@ant-design/icons";
import { getRandomColor } from "../../../../services/utils";

const TableFuncoes = ({data, onDelete, onDisable}) => {

    const formatarData = (dataIso) => {
        const data = new Date(dataIso);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês começa do 0
        const ano = data.getFullYear();
        const horas = String(data.getHours()).padStart(2, '0');
        const minutos = String(data.getMinutes()).padStart(2, '0');
    
        return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
    };

    const colunasTableFuncoes = [
        {
            title: 'Membro',
            key: 'membro',
            dataIndex: 'membro',
            render: (_, record) => (
                <Space>
                    <Avatar style={{backgroundColor: getRandomColor()}}>
                        {record?.nome_membro ? record.nome_membro.charAt(0).toUpperCase() : <UserOutlined />}
                    </Avatar>
                </Space> 
            )
        }, 
        {
            title: 'Função',
            dataIndex: 'funcao',
            key: 'funcao',

            render: (_, record) => (
                <RenderCategoria nome={record.nome_categoria_funcao} cor={record.cor_categoria_funcao} />
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
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => (
                <Space>
                    { record.status ? 
                        <span> <Tooltip title="Ativo"><IoIosCheckmark color="green" size="25px"/> </Tooltip></span>
                        : <span> <Tooltip title="Inativo"><IoIosClose color="red"  size="25px" /> </Tooltip></span>
                    }
                </Space>
            )
        },
        {
            title: 'Alterar status',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Switch
                        checked={record.status}
                        checkedChildren="Desativar"
                        unCheckedChildren="Ativar"
                        onChange={() => onDisable(record.id, !record.status)}
                        
                    />
                </Space>
            ),
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
        <React.Fragment>
            { data.length !== 0 ? (
                <Table
                    rowKey="id"
                    columns={colunasTableFuncoes}
                    dataSource={data}

                />
            ) : (
                <RenderEmpty title="Nenhum dado para exibir " />
            )}
        </React.Fragment>
    )
}

export default TableFuncoes