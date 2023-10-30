import React, { useState } from "react";
import "./FlowSteps.css";
import { Button, Steps} from 'antd';
import FormFlow from "../../components/Flow/FormFlow/FormFlow";
import EtapaForm from "../../components/Etapa/EtapaForm/EtapaForm";


const FlowSteps = () => {

    const onFinish = () => {
        console.log("Está funcionando !");
    }


    const steps = [
        {
            title: "Fluxo",
            content: (
               <FormFlow onFinish={onFinish}/>
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
            content: "Content"
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
        <div className="steps">
            <Steps current={current} items={items} className="fluxo" />
            <div className="content-step">{steps[current].content}</div>
            <div>
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
    )

}

export default FlowSteps;
