import React, { useState } from "react";
import {Button} from 'antd'
import { Input, Space } from 'antd';
import FormTipo from "../../components/FormTipo/FormTipo";
import Titulo from "../../../../components/Titulo/Titulo";
import ModalDeBusca from "../../../../components/Modals/ModalDeBusca/ModalDeBusca";
import ListaTipos from "../../components/ListaTipos/ListaTipos";
import { FaPlus } from "react-icons/fa6";
import { atualizarTipo, criarTipo } from "../../../../services/tipoService";
import { useContextoTipo } from "../../context/ContextoTipo";

const { Search } = Input;

const GerenciarTipos = () => {

    const [isFormVisivel, setIsFormVisivel] = useState(false)
    const [acaoForm, setAcaoForm] = useState('criar')
    const [isPlusBtnEnabled, setIsPlusBtnEnabled] = useState(false)
    const {dadosTipo, setDadosTipo} = useContextoTipo()


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

    const handleSalvarTipo = async (dados) => {
        if (acaoForm === 'criar'){
            console.log(dados)
            await criarTipo(dados)
        } else if (acaoForm === 'atualizar') {
            const response = await atualizarTipo(dadosTipo.id, dados)
        }
    }

    // const handleBuscarMembro = async (parametro) => {
    //     const response = await buscarMembroPeloNome(parametro)
    //     return response
    // }

    // const handleExcluirMembro = async () => {
    //     await excluirMembro(dadosMembro.id)
    //     handleCancelar()
    // }

    return (

        <div> 

            <Titulo 
                titulo='Tipos'
                paragrafo='Tipos > Gerenciar tipos'
            />

            <div className="button-menu"> 
                
                <Search
                    placeholder="Busque todos os tipos"
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
                <ListaTipos />

            </div>



        </div>
    )
}

export default GerenciarTipos