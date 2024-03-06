import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { IoIosMore } from 'react-icons/io';
import { FiEdit, FiTrash } from 'react-icons/fi';
import './CustomDropdown.css';

const CustomDropdown = ({ iteracao, handleEdit, handleDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteConfirmVisible, setDeleteConfirmVisible] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const showDeleteConfirm = () => {

    Modal.confirm({
        title: 'Confirmar exclusão',
        content: 'Tem certeza que deseja excluir?',
        okText: 'Sim',
        cancelText: 'Não',
        onOk: async () => {
          await handleDelete(iteracao);
          setIsOpen(false);
        },
        onCancel: () => {
          setIsOpen(false);
        },
      });
  };


  return (
    <div className={`dropdown ${isOpen ? "show" : "" }`}>
        <Button className="actions-iteration" onClick={toggleDropdown}>
            <IoIosMore size="25px" />
        </Button>

      {isOpen && (
            <div className="dropdown-content">
                <Button type="text" onClick={() => handleEdit(iteracao)}>
                    <FiEdit /> Editar
                </Button>

                <Button type="text" onClick={() => showDeleteConfirm()}>
                    <FiTrash /> Excluir
                </Button>

            </div>
      )}
    </div>
  );
};

export default CustomDropdown;
