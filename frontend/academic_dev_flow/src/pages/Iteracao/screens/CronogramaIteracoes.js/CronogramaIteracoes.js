import React, { useState } from "react";
import { useContextoIteracao } from "../../context/contextoIteracao";
import { Button } from "antd";
import { FaPlus, FaTrash } from "react-icons/fa";
import TableIteracoesSelect from "../../components/TableIteracoesSelect/TableIteracoesSelect";
import FormIteracao from "../../components/FormIteracao/FormIteracao";
import { useContextoGlobalProjeto } from "../../../../context/ContextoGlobalProjeto";
import { atualizarIteracao, criarIteracao } from "../../../../services/iteracaoService";

const CronogramaIteracoes = () => {

    const {
        dadosIteracao,
        setDadosIteracao,
        setIteracoes, 
        iteracoesSelecionadas} = useContextoIteracao()

    const {dadosProjeto} = useContextoGlobalProjeto()

    const [isFormSalvarVisivel, setIsFormSalvarVisivel] = useState(false)
    const [isBtnPlusDisabled, setIsBtnPlusDisabled] = useState(false)
    const [acaoForm, setAcaoForm] = useState('criar')

    const handleCancelar = () => {
        setIsFormSalvarVisivel(false)
        setIsBtnPlusDisabled(false)
        setDadosIteracao(null)
        setAcaoForm('criar')
    }

    const handleReload = () => {
        setIsFormSalvarVisivel(false)
        setDadosIteracao(null)
        setIteracoes([])
    }

    const handleAdicionarIteracao = () => {
        setIsFormSalvarVisivel(true)
        setIsBtnPlusDisabled(true)
        setAcaoForm('criar')
        setDadosIteracao(null)
    }

    const handleAtualizarIteracao = (record) => {
        setIsFormSalvarVisivel(true)
        setDadosIteracao(record)
        setAcaoForm('atualizar')
    }

    const handleSalvarIteracao = async (dadosForm) => {
        dadosForm['projeto'] = dadosProjeto.id

        if (acaoForm === 'criar'){
            await criarIteracao(dadosForm)
        } else if (acaoForm === 'atualizar'){
            await atualizarIteracao(dadosIteracao.id, dadosForm)
        }
        handleReload()
    }


    return (
        <React.Fragment>

            <div> 
        
                <Button 
                    icon={<FaPlus />} 
                    type="primary"
                    disabled={isBtnPlusDisabled}
                    onClick={handleAdicionarIteracao} 
                >
                    Criar Iteração
                </Button>
            </div>

            <h4 style={{textAlign: "center"}}> Cronograma de Iterações </h4> 
        
            <React.Fragment>
                
                <div style={{display: "flex", justifyContent: "flex-end", marginRight: "20px"}}>  
                    {
                        (iteracoesSelecionadas.length > 0) && <Button danger icon={<FaTrash />}> Excluir </Button>
                    }
                </div>

                { isFormSalvarVisivel ? (
                    <div className="global-div"> 
                        <FormIteracao onSubmit={handleSalvarIteracao} onCancel={handleCancelar}/>
                    </div> 

                ) : (
                    <TableIteracoesSelect onEdit={handleAtualizarIteracao}/>
                )}

            </React.Fragment>
            
        </React.Fragment>
    )
}

export default CronogramaIteracoes