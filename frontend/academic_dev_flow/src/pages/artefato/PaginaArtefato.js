import React, { useEffect, useState } from "react";
import { NotificationContainer, NotificationManager } from "react-notifications";
import Add from "../../components/Buttons/Add/Add";
import Delete from "../../components/Buttons/Delete/Delete";
import Search from "../../components/Search/Search";
import Title from "../../components/Title/Title";
import FormBuscarArtefato from "../../components/Forms/FormBuscarArtefato/FormBuscarArtefato";
import BotaoAtualizar from "../../components/Buttons/BotaoAtualizar/BotaoAtualizar";
import "./PaginaArtefato.css";
import BotaoFiltrar from "../../components/Buttons/BotaoFiltrar/BotaoFiltrar";
import ListaDeArtefatos from "../../components/Listas/ListaDeArtefatos/ListaDeArtefatos";
import PaginaCadastrarArtefato from "./PaginaCadastrarArtefato";
import BotaoVoltar from "../../components/Buttons/BotaoVoltar/BotaoVoltar";
import { listarArtefatos } from "../../services/artefato_service";

const PaginaArtefato = () => {

    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [acaoForm, setAcaoForm] = useState("criar")
    const [dadosArtefatos, setDadosArtefatos] = useState([])

    const colunas_tabela_artefatos = [
        {
            title: "Código",
            key: "codigo",
            dataIndex: "id",
        },
        {
            title: "Nome",
            dataIndex: "nome",
            key: "nome",
        },
        {
            title: "Descrição",
            dataIndex: "descricao",
            key: "descricao",
        },
    ];

    const mostrarFormularioAdicao = () => {
        setMostrarFormulario(true);
    };

    const handleListarArtefatos = async () => { 
        
        try {
            const resposta = await listarArtefatos()
            console.log(resposta)

            if(resposta.status === 200) {
                setDadosArtefatos(resposta.data)
            } else {
                NotificationManager.error("Ocorreu um problema durante a busca dos dados, contate o suporte!");
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        // Executar a função handleListarArtefatos uma vez a cada renderização
        handleListarArtefatos();
    }, []);

    return (
        <div>
            <NotificationContainer />

            {mostrarFormulario ? (

                <PaginaCadastrarArtefato onCancel={() => setMostrarFormulario(false)} acaoForm={acaoForm}/>

            ) : (
                <>
                    <Title 
                        title='Artefatos'
                        paragraph='Artefatos > Gerenciar artefatos'
                    />

                   

                    <div className="botoes-de-acao">
                        <div id="botao-filtrar"> 
                            <BotaoFiltrar />
                        </div>
                        <div id="botao-adicionar-atualizar-deletar"> 
                            <Add onClick={mostrarFormularioAdicao}/>
                            <BotaoAtualizar />
                            <Delete />
                        </div>
                    </div>
                    <FormBuscarArtefato />

                    <ListaDeArtefatos colunas={colunas_tabela_artefatos} dados={dadosArtefatos}/>
                </>
            )}
            
        </div>

    )
}

export default PaginaArtefato;