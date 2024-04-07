import React, { useState } from "react";
import {Button} from 'antd'
import { Input, Space } from 'antd';
import FormTipo from "../../components/FormTipo/FormTipo";
import Titulo from "../../../../components/Titulo/Titulo";
import ModalDeBusca from "../../../../components/Modals/ModalDeBusca/ModalDeBusca";
import ListaTipos from "../../components/ListaTipos/ListaTipos";
import { FaPlus } from "react-icons/fa6";
import { atualizarTipo, buscarTipo, criarTipo, excluirTipo } from "../../../../services/tipoService";
import { useContextoTipo } from "../../context/ContextoTipo";
import { showDeleteConfirm } from "../../../../services/utils";

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

    // const handleOrganizarDados = async (dados) => {
    //     const response = await buscarUsuarioPeloId(dados.usuario)
    //     dados['usuario'] = response.data.username
    //     dados['senha'] = response.data.password
    //     setDadosMembro(dados)
    // }
    
    // const handleReload = async (acao, dadosMembro) => {
    //     await handleOrganizarDados(dadosMembro)
    //     setAcaoForm(acao)
    //     setIsPlusBtnEnabled(false)
    //     setIsTrashBtnEnabled(true)
    //     setIsSearchBtnEnabled(false)
    // }

    // const handleSelecionarMembro = async (dados) => {
    //     await handleOrganizarDados(dados)
    //     setAcaoForm('atualizar')
    //     setIsFormVisivel(true)
    //     setIsModalVisivel(false)
    //     setIsTrashBtnEnabled(false)
    // }

    const handleAdicionarTipo = () => {
        setIsFormVisivel(true)
        setAcaoForm('criar')
        setIsPlusBtnEnabled(true)
    }

    const handleAtualizarTipo = (record) => {
        console.log('estou passando ')
        setIsFormVisivel(true)
        setAcaoForm('atualizar')
        setDadosTipo(record)
    }

    const handleSalvarTipo = async (dados) => {
        if (acaoForm === 'criar'){
            console.log(dados)
            await criarTipo(dados)
        } else if (acaoForm === 'atualizar') {
            await atualizarTipo(dadosTipo.id, dados)
        }
    }

    const handleBuscarTipoPeloNome = async (nome) => {
        const response = await buscarTipo(nome)
        setTipos(response.data)
    }

    const handleExcluirTipo = async (id) => {
        showDeleteConfirm({
            handleDelete: () => excluirTipo(id)
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