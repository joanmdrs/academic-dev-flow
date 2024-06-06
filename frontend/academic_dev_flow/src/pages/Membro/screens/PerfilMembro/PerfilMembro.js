import React, { useEffect, useState } from "react";
import FormMembro from "../../components/FormMembro/FormMembro";
import { useContextoGlobalUser } from "../../../../context/ContextoGlobalUser/ContextoGlobalUser";
import { useMembroContexto } from "../../context/MembroContexto";
import { buscarUsuarioPeloId } from "../../../../services/usuarioService";
import Loading from "../../../../components/Loading/Loading";
import { atualizarMembro, buscarMembroPeloUser } from "../../../../services/membroService";
import { Navigate, useNavigate } from "react-router-dom";
import BotaoVoltar from "../../../../components/Botoes/BotaoVoltar/BotaoVoltar";

const PerfilMembro = () => {

    const {usuario, setUsuario} = useContextoGlobalUser()
    const {dadosMembro, setDadosMembro} = useMembroContexto()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const handleAtualizarForm = async () => {

        const response = await buscarUsuarioPeloId(usuario.id_user)
        const user = response.data.username
        const password = response.data.password
        
        const dados = {
            id: usuario.id_membro,
            nome: usuario.nome,
            data_nascimento: usuario.data_nascimento,
            telefone: usuario.telefone,
            email: usuario.email,
            nome_github: usuario.nome_github,
            email_github: usuario.email_github,
            usuario_github: usuario.usuario_github,
            linkedin: usuario.linkedin,
            lattes: usuario.lattes,
            grupo: usuario.grupo,
            usuario: user,
            senha: password
        }
        setDadosMembro(dados)
        setLoading(false)
    }

    const handleAtualizarMembro = async (dados) => {
        await atualizarMembro(dadosMembro.id, dados)
        const response = await buscarMembroPeloUser(usuario.id_user);
        setUsuario(response.data)
        await handleAtualizarForm()
    }

    const handleCancelar = () => {
        navigate(-1)
    }
 

    useEffect(() => {
        const fetchData = async () => {

            if (usuario && usuario.id_user){
                await handleAtualizarForm()
            }
        }

        fetchData()
    }, [usuario])


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