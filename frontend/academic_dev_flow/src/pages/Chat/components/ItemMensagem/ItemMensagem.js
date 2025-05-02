import React from "react";
import './ItemMensagem.css';
import { formatDateTime } from "../../../../services/utils";
import { Dropdown, Menu, Button } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

const ItemMensagem = ({ item, isUser, onEdit, onDelete }) => {

    const menu = (
        <Menu>
            <Menu.Item key="editar" onClick={() => onEdit(item)}>
                Editar
            </Menu.Item>
            <Menu.Item key="excluir" onClick={() => onDelete(item.id)}>
                Excluir
            </Menu.Item>
        </Menu>
    );

    return (
        <div className={`item-mensagem-container ${isUser ? 'mensagem-direita' : 'mensagem-esquerda'}`}>
            <div className={`item-mensagem ${isUser ? 'bg-usuario' : 'bg-outro'}`}>
                <div className="mensagem-header">
                    <h4 className="autor">{item.nome_autor}</h4>
                    {isUser && (
                        <Dropdown overlay={menu} trigger={['click']}>
                            <Button type="text" size="small" icon={<EllipsisOutlined />} />
                        </Dropdown>
                    )}
                </div>
                <p className="conteudo">{item.conteudo}</p>
                <span className="data">{formatDateTime(item.enviado_em)}</span>
            </div>
        </div>
    );
};

export default ItemMensagem;
