import React from "react";
import { useContextoGlobalUser } from "../../../../context/ContextoGlobalUser/ContextoGlobalUser";
import ItemMensagem from "../ItemMensagem/ItemMensagem";

const ListMensagens = ({ data, onEdit, onDelete }) => {
    const { usuario } = useContextoGlobalUser();

    return (
        <div className="list-mensagens">
            {data.map((item, index) => (
                <ItemMensagem 
                    key={index} 
                    item={item} 
                    isUser={item.autor === usuario.usuario} 
                    onEdit={onEdit} 
                    onDelete={onDelete }
                />
            ))}
        </div>
    );
};

export default ListMensagens;
