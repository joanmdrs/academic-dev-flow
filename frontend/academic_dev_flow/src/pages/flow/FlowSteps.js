import React, { useState } from "react";
import "./FlowSteps.css";
import { Button, Steps} from 'antd';
import FlowForm from "../../components/Flow/FlowForm/FlowForm";
import EtapaStep from "../../components/Etapa/EtapaStep/EtapaStep";
import FlowDetails from "../../components/Flow/FlowDetails/FlowDetails";
import { FormProvider } from "../../components/Flow/FormProvider/FormProvider";
import ButtonSaveFlow from "../../components/Flow/ButtonSaveFlow/ButtonSaveFlow";
import { cadastrar_etapas, criar_etapas } from "../../services/etapa_service";
import { cadastrar_fluxo } from "../../services/flow_service";

const FlowSteps = () => {

    const steps = [
        {
            title: "Fluxo",
            content: (
               <FlowForm />
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

        
        if (fluxo !== undefined) {
           let response_flow = await cadastrar_fluxo(fluxo);
           console.log(response_flow.data)

           if (response_flow.statusText === 'OK') {
                
                if (etapas !== undefined) {
                    let response_etapa = await cadastrar_etapas(etapas, response_flow.data.id);
                    console.log(response_etapa)
                } else {
                    console.log("Impossível criar as etapas, chame a função de deletar o fluxo")
                }
           } else {
                
                console.log("Deu errado !")
           }
        } else {
            console.log("Dados inválidos !");
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
        </FormProvider>
    );

}

export default FlowSteps;
