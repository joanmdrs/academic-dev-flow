import React, { useState } from "react";
import "./FlowSteps.css";
import { Button, Steps} from 'antd';
import FormFluxo from "../FormFluxo/FormFluxo";
import EtapaStep from "../../../../components/Etapa/EtapaStep/EtapaStep";
import FlowDetails from "../../../../components/Flow/FlowDetails/FlowDetails";
import { FormProvider } from "../../../../components/Flow/FormProvider/FormProvider";
import ButtonSaveFlow from "../../../../components/Flow/ButtonSaveFlow/ButtonSaveFlow";
import { criarEtapas} from "../../../../services/etapa_service";
import { criarFluxo } from "../../../../services/fluxo_service";
import { NotificationContainer, NotificationManager } from "react-notifications";

const EtapasCriarFluxo = () => {

    const steps = [
        {
            title: "Fluxo",
            content: (
               <FormFluxo />
            )
        },
        
        {
            title: "Etapas",
            content: (
                <EtapaStep />
            )
        },
        
        {
            title: "Finalizar",
            content: ( 
                <FlowDetails />
            )
        }
    ]


    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));
   
    const saveFlow = async (fluxo, etapas) => {

        try {
            if (!fluxo) {
                console.log("Dados inválidos !");
                return;
            }
    
            const response_flow = await criarFluxo(fluxo)
    
            if (response_flow.status === 200) {
                if (etapas) {
                    try {
                        await criarEtapas(etapas, response_flow.data.id);
            
                        NotificationManager.success('Fluxo criado com sucesso!');
                        setTimeout(() => {
                            document.location.reload();
                        }, 2000);
                    } catch (error) {
                        
                        console.log("Algo deu errado ao cadastrar etapas!", error);
                        NotificationManager.error('Algo deu errado ao cadastrar etapas!');
                    }
                } else {
                    console.log("Impossível criar as etapas, chame a função de deletar o fluxo");
                }
            } else {
                console.log("Deu errado ao cadastrar o fluxo!");
                NotificationManager.error('Algo deu errado ao cadastrar o fluxo!');
            }
            
        } catch (error) {
            console.error("Ocorreu um erro:", error);
        }
    }

    return (
        <FormProvider>

            <div className="steps">

                <Steps current={current} items={items} className="fluxo"/>

                <div className="content-step">
                    {steps[current].content}
                </div>

                <div className="steps-buttons">
                    {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Próximo
                    </Button>
                    )}
                    {current === steps.length - 1 && (
                        <ButtonSaveFlow saveFlow={saveFlow}/>
                    )}
                    {current > 0 && (
                    <Button
                        style={{
                        margin: '0 8px',
                        }}
                        onClick={() => prev()}
                    >
                        Anterior
                    </Button>
                    )}
                </div>
            </div>
            <NotificationContainer />
        </FormProvider>
    );

}

export default EtapasCriarFluxo;
