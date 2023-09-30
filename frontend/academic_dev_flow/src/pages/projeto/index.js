import React, { useState } from 'react';
import 'react-notifications/lib/notifications.css';
import criar_projeto from '../../services/projeto_service';
import {NotificationContainer, NotificationManager} from 'react-notifications';
const STATUS_CHOICES = [
  { value: 'cancelado', label: 'Cancelado' },
  { value: 'em_andamento', label: 'Em andamento' },
  { value: 'concluido', label: 'Concluído' },
];

const MyForm = () => {

  const initialValues = {
    nome: '',
    descricao: '',
    status: '',
    data_inicio: '',
    data_fim: '',
  };

  const [formValues, setFormValues] = useState(initialValues);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    criar_projeto(formValues).then(() => {
      console.log(formValues);
      NotificationManager.success("Projeto criado com sucesso !")
      setTimeout(() => {
        document.location.reload();
      }, 2000);

    }).catch((error) => {
      console.log(error);
      NotificationManager.error("Algo deu errado ! ");
    });
    
    
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formValues.nome}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="descricao">Descrição:</label>
          <textarea
            id="descricao"
            name="descricao"
            value={formValues.descricao}
            onChange={handleInputChange}
          />
        </div>
        <div>
        <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={formValues.status}
            onChange={handleInputChange}
          >
            <option value="">Selecione um status</option>
            {STATUS_CHOICES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="data_inicio">Data de Início:</label>
          <input
            type="datetime-local"
            id="data_inicio"
            name="data_inicio"
            value={formValues.data_inicio}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="data_fim">Data de Fim:</label>
          <input
            type="datetime-local"
            id="data_fim"
            name="data_fim"
            value={formValues.data_fim}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Enviar</button>
        </div>
      </form>
      <NotificationContainer />

    </div>
  );
};

export default MyForm;
