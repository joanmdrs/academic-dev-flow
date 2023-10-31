import React, { useState } from "react";
import "./FlowSteps.css";
import { Button, Steps} from 'antd';
import FlowForm from "../../components/Flow/FlowForm/FlowForm";
import EtapaForm from "../../components/Etapa/EtapaForm/EtapaForm";
import FlowDetails from "../../components/Flow/FlowDetails/FlowDetails";
import { FormProvider } from "../../components/Flow/FormProvider/FormProvider";

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
                <EtapaForm />
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

    return (
        <FormProvider>
       
            <div className="steps">
                <Steps current={current} items={items} className="fluxo" />
                <div className="content-step">{steps[current].content}</div>
                <div className="steps-buttons">
                    {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Próximo
                    </Button>
                    )}
                    {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => console.log('Processing complete!')}>
                        Finalizar
                    </Button>
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
