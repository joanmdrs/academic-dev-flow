import React, { useState } from "react"
import {Button, Form, Input, Radio} from "antd"
import { IoIosArrowRoundForward } from "react-icons/io";
import "./SelecionarArea.css"
import { useRegisterContexto } from "../../context/RegisterContexto";

const SelecionarArea = () => {

    const [option, setOption] = useState(null);
    const [valueUsuarioGithub, setValueUsuarioGithub] = useState(null)
    const {setUsuarioGithub, setStep} = useRegisterContexto()

    const handleAlterar = ({ target: { value } }) => {
        setOption(value);
    };

    const handleProsseguir = () => {
        setStep("3")
        setUsuarioGithub(valueUsuarioGithub)
    }

    const handlePegarUserGithub = ({ target: {value}}) => {
        setValueUsuarioGithub(value)
    }

    return (
        <div className="screen-selecionar-area"> 
            <h2> O seu objetivo com este sistema envolve desenvolvimento de software ? </h2>
            <div> 
                <Radio.Group
                    value={option}
                    onChange={handleAlterar}
                >
                    <Radio value="sim">Sim</Radio>
                    <Radio value="não">Não</Radio>
                </Radio.Group>
            </div>


            { option === "sim" ? (

                (
                    <Form layout="vertical">
                        <Form.Item label="Informe seu usuário GitHub" name="github">
                            <Input name="gihtub" required onChange={handlePegarUserGithub} /> 
                        </Form.Item>

                    </Form>
                    
                )
            ) : null}

            {option && (
                <div>
                    <Button type="primary" onClick={handleProsseguir}>
                        Prosseguir <IoIosArrowRoundForward />
                    </Button>
                </div>
            )}
        </div>
    )
}

export default SelecionarArea