import { Button } from "antd";
import React from "react";
import { useFormContext } from "../FormProvider/FormProvider";

const ButtonSaveFlow = ({saveFlow}) => {

    const {flowDetails, etapaDetails} = useFormContext();

    return (
        <Button type="primary" onClick={() => {
            saveFlow(flowDetails, etapaDetails)
        }}>
            Finalizar
        </Button>
    )
}

export default ButtonSaveFlow;