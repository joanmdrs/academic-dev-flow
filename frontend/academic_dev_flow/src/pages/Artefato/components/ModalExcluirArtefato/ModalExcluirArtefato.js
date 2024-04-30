import React, { useState } from "react";
import { Modal, Input, Button } from 'antd';
import { MdInfo } from "react-icons/md";

const ModalExcluirArtefato = ({visible, onDelete, onCancel }) => {

    const [commitMessage, setCommitMessage] = useState('');

    return (
        <Modal
            title={
                <span style={{fontSize: '16px', fontWeight: '400', display: 'flex', justifyContent: 'baseline'}}>
                    <MdInfo style={{ marginRight: '8px', color: '#FAAD14', width: '1.5em', height: '1.5em'}} />
                    Confirmar exclusão
                </span>
            }
            open={visible}
            onCancel={() => onCancel()}
            footer={[
                <Button key="cancel" onClick={() => onCancel()}>Cancelar</Button>,
                <Button key="submit" type="primary" onClick={() => onDelete(commitMessage)}>Excluir</Button>,
            ]}
        >
            <Input.TextArea
                required
                value={commitMessage}
                onChange={(e) => setCommitMessage(e.target.value)}
                placeholder="mensagem de commit"
                autoSize={{ minRows: 2, maxRows: 6 }}
            />
        </Modal>
    );
}

export default ModalExcluirArtefato;
