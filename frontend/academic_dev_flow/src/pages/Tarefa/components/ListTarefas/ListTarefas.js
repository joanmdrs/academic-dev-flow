import { Button, Pagination, Tooltip } from "antd";
import { IoPlayOutline } from "react-icons/io5";
import { IoMdTrash } from "react-icons/io";
import { MdOpenInNew } from "react-icons/md";
import React, { useState } from "react";
import { limitarCaracteres } from "../../../../services/utils";

const ListTarefas = ({ dados }) => {
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 10; // Defina o número de itens a serem exibidos por página

    const handleChangePagina = (pagina) => {
        setPaginaAtual(pagina);
    };

    const indiceInicial = (paginaAtual - 1) * itensPorPagina;
    const indiceFinal = paginaAtual * itensPorPagina;

    const dadosPaginados = dados.slice(indiceInicial, indiceFinal);

    return (
        <div style={{ display: 'flex', gap: '10px', flexDirection: 'column'}}>
            {dadosPaginados.map((item, index) => (
                <div key={index} style={{
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    padding: '5px 10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                }}>
                    <div style={{ display: 'flex' }}>
                        <h4 style={{ fontWeight: '400', color: 'var(--primary-color)' }}>{limitarCaracteres(item.nome, 30)}</h4>
                    </div>

                    <div>
                        <Tooltip title="Iniciar">
                            <Button style={{ border: 'none', color: 'var(--primary-color)' }} icon={<IoPlayOutline />} />
                        </Tooltip>
                        <Tooltip title="Abrir">
                            <Button style={{ border: 'none', color: 'var(--primary-color)' }} icon={<MdOpenInNew />} />
                        </Tooltip>
                        <Tooltip title="Excluir">
                            <Button style={{ border: 'none', color: 'var(--primary-color)' }} icon={<IoMdTrash />} />
                        </Tooltip>
                    </div>
                </div>
            ))}

            <Pagination
                style={{ marginTop: '20px', textAlign: 'center' }}
                current={paginaAtual}
                total={dados.length}
                pageSize={itensPorPagina}
                onChange={handleChangePagina}
            />
        </div>
    );
};

export default ListTarefas;
