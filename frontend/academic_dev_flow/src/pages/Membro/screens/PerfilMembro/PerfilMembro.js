import React, { useEffect, useState } from "react";
import FormMembro from "../../components/FormMembro/FormMembro";
import { useContextoGlobalUser } from "../../../../context/ContextoGlobalUser/ContextoGlobalUser";
import { useMembroContexto } from "../../context/MembroContexto";
import Loading from "../../../../components/Loading/Loading";
import { atualizarMembro, buscarMembroPeloId } from "../../../../services/membroService";
import { useNavigate } from "react-router-dom";
import BotaoVoltar from "../../../../components/Botoes/BotaoVoltar/BotaoVoltar";

const PerfilMembro = () => {

    const {usuario} = useContextoGlobalUser()
    const {dadosMembro, setDadosMembro} = useMembroContexto()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const handleCarregarDadosMembro = async () => {
        const response = await buscarMembroPeloId(usuario.id)
        
        if (!response.error){
            setDadosMembro(response.data)
        }
        setLoading(false)
    }

    const handleAtualizarMembro = async (dados) => {
        const response = await atualizarMembro(dadosMembro.id, dados)
        if(!response.error){
            setDadosMembro(response.data)
        }
    }

    const handleCancelar = () => {
        navigate(-1)
    }
 

    useEffect(() => {
        const fetchData = async () => {

            if (usuario && usuario.id){
                await handleCarregarDadosMembro()
            }
        }

        fetchData()
    }, [usuario])

    if (loading) {
        return <Loading />
    }


    return (
        <React.Fragment>
            <h2 style={{marginLeft: '20px'}}> Meu Perfil </h2>  
            <div className="global-div"> 
                <BotaoVoltar funcao={handleCancelar} />
                <FormMembro onSubmit={handleAtualizarMembro} onCancel={handleCancelar}/>
            </div>
    
        </React.Fragment>
    )
}

export default PerfilMembro