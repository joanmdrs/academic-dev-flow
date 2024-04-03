import React from "react";
import { RegisterProvider } from "./context/RegisterContexto";
import StepsRegister from "./components/StepsRegister/StepsRegister";

const Register = () => {
    return (
        <RegisterProvider>
            <StepsRegister />
        </RegisterProvider>
    )
}

export default Register