import { Button } from "antd";
import React from "react";

const FlowButtons = ({steps}) => {

    return (
        <div className="steps-buttons">
            {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
                Próximo
            </Button>
            )}
            {current === steps.length - 1 && (
            <Button type="primary" onClick={() => {
                
            }}
            >
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
    )
}