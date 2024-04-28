import React, { useState } from "react";
import {Button} from 'antd'
import { Input } from 'antd';
import { Modal } from 'antd'
import FormTipo from "../../components/FormTipo/FormTipo";
import Titulo from "../../../../components/Titulo/Titulo";
import ListaTipos from "../../components/ListaTipos/ListaTipos";
import { FaPlus } from "react-icons/fa6";
import { atualizarTipo, buscarTipo, criarTipo, excluirTipo } from "../../../../services/tipoService";
import { useContextoTipo } from "../../context/ContextoTipo";

const { Search } = Input;

const GerenciarTipos = () => {

    const [isFormVisivel, setIsFormVisivel] = useState(false)
    const [acaoForm, setAcaoForm] = useState('criar')
    const [isPlusBtnEnabled, setIsPlusBtnEnabled] = useState(false)
    const {dadosTipo, setDadosTipo, setTipos} = useContextoTipo()


    const handleCancelar = () => {
        setAcaoForm('criar')
        setDadosTipo(null)
        setIsFormVisivel(false)
        setIsPlusBtnEnabled(false)
    }

    const handleReload = () => {
        setIsFormVisivel(false)
        setIsPlusBtnEnabled(false)
        setTipos([])
    }

    const handleAdicionarTipo = () => {
        setDadosTipo(null)
        setIsFormVisivel(true)
        setAcaoForm('criar')
        setIsPlusBtnEnabled(true)
    }

    const handleAtualizarTipo = (record) => {
        setIsFormVisivel(true)
        setAcaoForm('atualizar')
        setDadosTipo(record)
    }

    const handleSalvarTipo = async (dados) => {
        if (acaoForm === 'criar'){
            await criarTipo(dados)
        } else if (acaoForm === 'atualizar') {
            await atualizarTipo(dadosTipo.id, dados)
        }
        handleReload()
    }

    const handleBuscarTipoPeloNome = async (nome) => {
        const response = await buscarTipo(nome)
        setTipos(response.data)
    }

    const handleExcluirTipo = async (id) => {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: 'Você está seguro de que deseja excluir este(s) item(s) ?',
            okText: 'Sim',
            cancelText: 'Não',
            onOk: async () => {
                await excluirTipo(id)
                handleReload()
            }
        });
    }
    return (

        <div> 

            <Titulo 
                titulo='Tipos'
                paragrafo='Tipos > Gerenciar tipos'
            />

            <div className="button-menu"> 
                
                <Search
                    placeholder="Busque todos os tipos"
                    onSearch={handleBuscarTipoPeloNome}
                    style={{
                        width: 400,
                    }}
                />

                    <Button 
                        icon={<FaPlus />} 
                        type="primary" 
                        onClick={handleAdicionarTipo}
                        disabled={isPlusBtnEnabled}> 
                        Criar Tipo 
                    </Button>
            </div>

            { isFormVisivel && 
                (
                    <div className="global-div"> 
                        <FormTipo onSubmit={handleSalvarTipo} onCancel={handleCancelar}/>
                    </div>
                )
            }

            <div className="global-div"> 
                <ListaTipos onEdit={handleAtualizarTipo} onDelete={handleExcluirTipo}/>
            </div>



        </div>
    )
}

export default GerenciarTipos