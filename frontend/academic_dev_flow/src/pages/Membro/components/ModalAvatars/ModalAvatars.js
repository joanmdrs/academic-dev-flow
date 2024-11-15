import React, { useState } from "react";
import { Avatar, Modal, Button } from "antd";

const ModalAvatars = ({ isVisible, onClose, onSelect, gender }) => {
    const [selectedAvatar, setSelectedAvatar] = useState(null);

    // Definir os IDs de avatares com base no gênero
    const avatarList = gender === "M" 
        ? Array.from({ length: 50 }, (_, index) => index + 1)  // IDs de 1 a 50 para "M"
        : Array.from({ length: 50 }, (_, index) => index + 51); // IDs de 51 a 100 para "F"

    const handleAvatarSelect = (id) => {
        setSelectedAvatar(id);
    };

    const handleConfirm = () => {
        if (selectedAvatar) {
            onSelect(selectedAvatar);
            onClose();
        }
    };

    return (
        <Modal
            width={1000}
            open={isVisible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancelar
                </Button>,
                <Button
                    key="confirm"
                    type="primary"
                    disabled={!selectedAvatar}
                    onClick={handleConfirm}
                >
                    Confirmar
                </Button>,
            ]}
            title="Selecione um Avatar"
        >
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
                {avatarList.map((id) => (
                    <Avatar
                        key={id}
                        src={`https://avatar.iran.liara.run/public/${id}`}
                        style={{
                            width: "100px",
                            height: "100px",
                            cursor: "pointer",
                            border: selectedAvatar === id ? "2px solid blue" : "none",
                        }}
                        onClick={() => handleAvatarSelect(id)}
                    />
                ))}
            </div>
        </Modal>
    );
};

export default ModalAvatars;
