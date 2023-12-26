import React, { useState } from "react";
import "./PageMembro.css";
import Title from "../../components/Title/Title";
import Search from "../../components/Search/Search";
import ModalSearch from "../../components/Modal/Modal";

const PaginaMembro = () => {

    const [modalVisible, setModalVisible] = useState(false);

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

            <Search name="BUSCAR MEMBRO" onClick={showModal} />

            <ModalSearch 
                title="Buscar membro" 
                label="Nome do membro"
                name="name-membro"
                onCancel={handleCancel}
                onOk={handleOk}
                open={modalVisible}
            />


        </div>
    )
}

export default PaginaMembro;