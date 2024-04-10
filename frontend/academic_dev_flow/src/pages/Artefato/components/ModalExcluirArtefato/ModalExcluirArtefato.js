import React, { useState } from "react";
import {Modal, Input, Button} from 'antd'

const  ModalExcluirArtefato = ({visible, onDelete, onCancel }) => {

    const [commitMessage, setCommitMessage] = useState('')
    return (
        <Modal
            title="Confirmar exclusão"
            open={visible}
            onCancel={() => onCancel()}
            footer={[
                <Button key="cancel" onClick={() => onCancel()}>Cancelar</Button>,
                <Button key="submit" type="primary" onClick={() => onDelete(commitMessage)}>Excluir</Button>,
            ]}
        >
            <Input.TextArea
                value={commitMessage}
                onChange={(e) => setCommitMessage(e.target.value)}
                placeholder="mensagem de commit"
                autoSize={{ minRows: 2, maxRows: 6 }}
            />
        </Modal>
    )
}

export default ModalExcluirArtefato