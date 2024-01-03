import React, { useState } from "react";
import "./PageMembro.css";
import Title from "../../components/Title/Title";
import Search from "../../components/Search/Search";
import ModalSearch from "../../components/Modal/Modal";
import Add from "../../components/Buttons/Add/Add";
import Delete from "../../components/Buttons/Delete/Delete";
import FormMembro from "./FormMembro";


const PaginaMembro = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const [formVisible, setFormVisible] = useState(true);

    const showModal = () => {
        setModalVisible(true);
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleOk = () => {
        console.log("Testando !")
    }

    return (
        <div>
            <Title 
                title='Membros'
                paragraph='Membros > Gerenciar membros'
            />

            <div className='add-and-delete'>
                <Add onClick={ () => {setFormVisible(true)}} />
                <Delete />
            </div>

            <Search name="BUSCAR MEMBRO" onClick={showModal} />

            <ModalSearch 
                title="Buscar membro" 
                label="Nome do membro"
                name="name-membro"
                onCancel={handleCancel}
                onOk={handleOk}
                open={modalVisible}
            />

            {formVisible && <FormMembro />}


        </div>
    )
}

export default PaginaMembro;