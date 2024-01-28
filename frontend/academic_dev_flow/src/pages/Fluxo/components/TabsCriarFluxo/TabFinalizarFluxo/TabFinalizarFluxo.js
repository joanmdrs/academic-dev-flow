import React from "react";
import "./TabFinalizarFluxo.css";
import { useFormContext } from "../../../context/Provider/FormProvider";
import { Button, Empty, Table } from "antd";
import { vincularEtapaFluxo } from "../../../../../services/fluxo_etapa_service";
import { NotificationManager } from "react-notifications";
import { criarFluxo } from "../../../../../services/fluxo_service";
import { recarregarPagina } from "../../../../../services/utils";

const TabFinalizarFluxo = () => {

    const COLUNAS_TABELA = [
        {
          title: 'Código',
          dataIndex: 'id',
          key: 'codigo',
        },
        {
          title: 'Nome',
          dataIndex: 'nome',
          key: 'nome',
        },
        {
          title: 'Descrição',
          dataIndex: 'descricao',
          key: 'descricao',
  
        },
    ];

    const {
        hasDadosFluxo, 
        setHasDadosFluxo, 
        hasDadosEtapas,
        setCurrent
    } = useFormContext()



    const handleCriarFluxo = async () => {
        try {
            const dadosFluxo = hasDadosFluxo;
            const resposta = await criarFluxo(dadosFluxo);
    
            if (resposta.status === 200) {
                setHasDadosFluxo(resposta.data);
                NotificationManager.success('Fluxo criado com sucesso!');
                await handleVincularEtapas(resposta.data.id)
                recarregarPagina()
            } else {
                NotificationManager.error('Falha ao criar o fluxo, contate o suporte!');
            }
        } catch (error) {
            console.error("Ocorreu um erro:", error);
            NotificationManager.error('Ocorreu um problema durante a operação, contate o suporte!');
        }
    }

    const handleVincularEtapas = async (idFluxo) => {
        try {
            const dadosEtapas = hasDadosEtapas
            const resposta = await vincularEtapaFluxo(idFluxo, dadosEtapas)
            
            if(resposta.status === 200) {
                NotificationManager.success("Etapas vinculadas com sucesso !")
            } else {
                NotificationManager.error("Falha ao vincular as etapas ao fluxo, contate o suporte!")
            }
        } catch (error) {
            console.error("Ocorreu um erro:", error);
            NotificationManager.error('Ocorreu um problema durante a operação, contate o suporte!'); 
        }
    }

    return (

        <div className="tab-finalizar-fluxo form-box"> 

            <div className="tab-finalizar-fluxo-header"> 
                <h4> 
                    FINALIZAR FLUXO
                </h4>
                
            </div>
            <div className="tab-finalizar-fluxo-content"> 
            <div className="div-dados-fluxo">
                { (hasDadosFluxo.nome === undefined || hasDadosFluxo.descricao === undefined) ? 
                    ( 
                        <React.Fragment>
                            <h5> DADOS DO FLUXO</h5>
                            <h4> Nome: </h4>
                            <p> {hasDadosFluxo.nome} </p>
                            <h4> Descrição: </h4>
                            <p> {hasDadosFluxo.descricao} </p>
                        </React.Fragment>
                    )

                    : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                }
            </div>
                
                

                <div className="div-dados-etapas"> 
                    <h5> DADOS DE ETAPAS </h5>
                    <Table 
                        dataSource={hasDadosEtapas}
                        columns={COLUNAS_TABELA}
                        rowKey="id"
                    />
                </div>
            </div>

            <div className="tab-finalizar-fluxo-footer"> 
                <Button onClick={() => setCurrent("2")}> 
                    Voltar
                </Button>
                <Button type="primary" onClick={handleCriarFluxo} > 
                    Finalizar
                </Button>
            </div>
        </div>
    )

}

export default TabFinalizarFluxo;