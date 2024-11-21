import { Button, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import Titulo from "../../../../components/Titulo/Titulo";
import { FaPlus, FaTrash } from "react-icons/fa";
import TableMembroProjeto from "../../components/TableMembroProjeto/TableMembroProjeto";
import { useMembroContexto } from "../../context/MembroContexto";
import FormMembroProjeto from "../../components/FormMembroProjeto/FormMembroProjeto";
import { handleError } from "../../../../services/utils";
import { buscarMembrosPorProjeto, buscarProjetosDoMembro, criarMembroProjeto, excluirMembroProjeto, listarMembroProjeto } from "../../../../services/membroProjetoService";
import { ERROR_MESSAGE_ON_SEARCHING } from "../../../../services/messages";
import { listarProjetos } from "../../../../services/projetoService";
import { listarMembros } from "../../../../services/membroService";

const VincularMembroAoProjeto = () => {

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isTableVisible, setIsTableVisible] = useState(true);
    const {setDadosMembroProjeto, objsMembroProjetoSelecionados, setObjsMembroProjeto} = useMembroContexto();
    const [optionsMembros, setOptionsMembros] = useState([]);
    const [optionsProjetos, setOptionsProjetos] = useState([]);

    const resetTableData = async () => {
        try {
            const response = await listarMembroProjeto();
    
            if (!response.error) { 
                setObjsMembroProjeto(response.data)
            } 
        } catch (error) {
            setObjsMembroProjeto([])
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING)
        }
    };

    const handleCancelar = () => {
        setIsFormVisible(false);
        setIsTableVisible(true);
    };

    const handleReload = () => {
        setIsFormVisible(false);
        setIsTableVisible(true);
        setDadosMembroProjeto(null);
        setObjsMembroProjeto([]);
    };

    const handleAdicionarMembroProjeto = () => {
        setIsFormVisible(true);
        setIsTableVisible(false);
        setDadosMembroProjeto(null);
    };

    const handleVincularMembroAoProjeto = async (formData) => {
        try {
            const response = await criarMembroProjeto(formData);

            if (!response.error){
                handleReload();
            }
        } catch (error) {
            return handleError(error, 'Falha ao tentar vincular o membro ao projeto!');
        }
    };

    const handleDesvincularMembroProjeto = async () => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Tem certeza de que deseja excluir este(s) item(s)? Ao prosseguir, o vínculo entre este(s) membro(s) e o(s) projeto(s) será desfeito',
            okText: 'Sim',
            cancelText: 'Não',
            onOk:  async () => {
                try {
                    setIsTableVisible(false);
                    const ids = objsMembroProjetoSelecionados.map(item => item.id);
                    const response = await excluirMembroProjeto(ids);
                    if (!response.error){
                        handleReload();
                    }
                } catch (error) {
                    return handleError(error, 'Falha ao tentar desvincular os membros do projeto!');
                }
            }
        });
    };

    const handleBuscarProjetosDoMembro = async (idMembro) => {
        if (!idMembro) {
            resetTableData(); // Resetar a tabela quando a seleção é limpa
            return;
        }
        try {
            const response = await buscarProjetosDoMembro(idMembro);

            if(!response.error){
                setObjsMembroProjeto(response.data);
            }
        } catch (error) {
            return handleError(error, 'Falha ao tentar buscar os projetos do membro selecionado!');
        }
    };

    const handleBuscarMembrosDoProjeto = async (idProjeto) => {
        if (!idProjeto) {
            resetTableData(); // Resetar a tabela quando a seleção é limpa
            return;
        }
        try {
            const response = await buscarMembrosPorProjeto(idProjeto);

            if(!response.error){
                setObjsMembroProjeto(response.data);
            }
        } catch (error) {
            return handleError(error, 'Falha ao tentar buscar os membros do projeto!');
        }
    };

    const handleGetProjetos = async () => {
        try {
            const response = await listarProjetos();

            if(!response.error){
                const resultados = response.data.map((item) => ({
                    value: item.id,
                    label: item.nome
                }));
                setOptionsProjetos(resultados);
            }
        } catch (error) {
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING);
        }
    };

    const handleGetMembros = async () => {
        try {
            const response = await listarMembros();
            const resultados = response.data.map((item) => {
                return {
                    value: item.id,
                    label: `${item.nome} (${item.nome_grupo})`,
                };
            });
            setOptionsMembros(resultados);
        
        } catch (error) {   
            return handleError(error, ERROR_MESSAGE_ON_SEARCHING);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await handleGetMembros();
            await handleGetProjetos();
        };

        fetchData();
    }, []);

    return (
        <div className="content">
            
            <Titulo 
                titulo='Vincular Projeto'
                paragrafo='Membros > Vincular Projeto'
            />

            { !isFormVisible && (
                <div style={{display: 'flex', justifyContent: 'space-between', margin: '20px'}}> 
                    <div style={{display: 'flex', gap: '20px'}}>

                        <Select
                            showSearch
                            allowClear
                            placeholder="Pesquise ou selecione o membro"
                            options={optionsMembros}
                            onChange={(value) => handleBuscarProjetosDoMembro(value)} 
                            filterOption={(input, option) =>
                                option?.label.toLowerCase().includes(input.toLowerCase())
                            }
                        />
                        <Select
                            showSearch
                            allowClear
                            placeholder="Pesquise ou selecione o projeto"
                            options={optionsProjetos}
                            onChange={(value) => handleBuscarMembrosDoProjeto(value)}
                            filterOption={(input, option) =>
                                option?.label.toLowerCase().includes(input.toLowerCase())
                            }
                        />

                    </div>

                    <div style={{display: 'flex', gap: '10px'}}> 
                        <Button 
                            icon={<FaPlus />} 
                            type="primary" 
                            onClick={handleAdicionarMembroProjeto}
                        >
                            Vincular Projeto
                        </Button>
                        <Button 
                            icon={<FaTrash />} 
                            type="primary" 
                            danger
                            disabled={objsMembroProjetoSelecionados.length === 0}
                            onClick={handleDesvincularMembroProjeto}
                        >
                            Excluir
                        </Button>
                    </div>
                </div>

            )}

            
            <div className="pa-20"> 
                {isFormVisible && 
                    <FormMembroProjeto 
                        titleForm="VINCULAR MEMBRO(S) AO PROJETO"
                        onSubmit={handleVincularMembroAoProjeto} 
                        onCancel={handleCancelar} 
                    />
                }

                {isTableVisible && <TableMembroProjeto />}
            </div>
            
        </div>
    );
};

export default VincularMembroAoProjeto;
