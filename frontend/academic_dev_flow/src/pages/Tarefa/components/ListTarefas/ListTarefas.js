import { Button, Empty, Pagination, Tooltip } from "antd";
import { IoPlayOutline } from "react-icons/io5";
import { IoMdTrash } from "react-icons/io";
import { MdOpenInNew } from "react-icons/md";
import React, { useState } from "react";
import { formatarTempo } from "../../../../services/utils";
import { IoPauseOutline } from "react-icons/io5";

const ListTarefas = ({ dados, onStart, onPause, onOpen, onDelete}) => {
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 10;

    const handleChangePagina = (pagina) => {
        setPaginaAtual(pagina);
    };

    const indiceInicial = (paginaAtual - 1) * itensPorPagina;
    const indiceFinal = paginaAtual * itensPorPagina;

    const dadosPaginados = dados.slice(indiceInicial, indiceFinal);

    return (

        <React.Fragment>

            { dados.length === 0 ? 
                <Empty description="Não há dados a serem exibidos" />
                : (
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
                            <div style={{ display: 'flex', width: '250px'}}>
                                <h4 style={{ fontWeight: '400', color: 'var(--primary-color)' }}>{item.nome}</h4>
                            </div>

                            <div>

                                <span>{`${formatarTempo(item.tempo_gasto)}`}</span>
                            </div>
                            <div>
                                { item.estado_contagem_tempo === true ? (
                                    <Tooltip title="Pausar">
                                        <Button 
                                            onClick={() => onPause(item.id)}
                                            style={{ border: 'none', color: 'var(--primary-color)' }} 
                                            icon={<IoPauseOutline />} 
                                        />
                                    </Tooltip>
                                ) : (
                                    <Tooltip title="Iniciar">
                                        <Button onClick={() => onStart(item.id)} style={{ border: 'none', color: 'var(--primary-color)' }} icon={<IoPlayOutline />} />
                                    </Tooltip>
                                )}

                                <Tooltip title="Abrir">
                                    <Button onClick={() => onOpen(item)} style={{ border: 'none', color: 'var(--primary-color)' }} icon={<MdOpenInNew />} />
                                </Tooltip>
                                <Tooltip title="Excluir">
                                    <Button onClick={() => onDelete(item.id)} style={{ border: 'none', color: 'var(--primary-color)' }} icon={<IoMdTrash />} />
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
            )}

        </React.Fragment>
    );
};

export default ListTarefas;
