import React, { useState } from 'react';
import moment from 'moment'
import './styles.css';
import 'react-notifications/lib/notifications.css';
import {criar_projeto} from '../../services/projeto_service';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Form, Input, Select, DatePicker, Button } from 'antd';
import Title from '../../components/Title/Title';
import Search from '../../components/Search/Search';
import Add from '../../components/Buttons/Add/Add';
import Delete from '../../components/Buttons/Delete/Delete';
import ModalSearch from '../../components/Modal/Modal';
import 'moment/locale/pt-br';
moment.locale('pt-br');


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
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { Option } = Select;

  const handleInputChange = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleRowClick = (record) => {
    form.setFields([
      { name: 'nome', value: record.nome },
      { name: 'descricao', value: record.descricao },
      { name: 'status', value: record.status },
      { name: 'data_inicio', value: moment(record.data_inicio)},
      { name: 'data_fim', value: moment(record.data_fim)}
    ]);
    handleCancel();
  }

  const handleSubmit = (values) => {
    criar_projeto(values).then(() => {
      NotificationManager.success('Projeto criado com sucesso!');
      setTimeout(() => {
        document.location.reload();
      }, 2000);
    }).catch((error) => {
      console.log("Algo deu errado !", error);
      NotificationManager.error('Algo deu errado!');
    });
  };

  return (
    <div>
      <Title 
        title="Cadastrar projeto" 
        paragraph="Projetos > Cadastrar projetos"
      />

      <div className='add-and-delete'>
        <Add />
        <Delete />
      </div>
      
      <Search name="BUSCAR PROJETO" onClick={showModal} />

      <ModalSearch 
        title="Buscar projeto" 
        open={modalVisible} 
        onCancel={handleCancel}
        handleRowClick={handleRowClick} 
        label="Nome do projeto"
        name="name-projeto"
      />
    
      <Form
        form={form}
        className='form-projeto'
        initialValues={initialValues}
        onFinish={handleSubmit}
      >
        <Form.Item label="Nome" name="nome">
          <Input
            id="input-nome"
            name="nome"
            value={formValues.nome}
            onChange={(e) => handleInputChange('nome', e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Status" name="status">
          <Select
            id="status"
            name="status"
            value={formValues.status}
            className='field-select'
            onChange={(value) => handleInputChange('status', value)}
          >
            <Option value=""></Option>
            {STATUS_CHOICES.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Data de Início" name="data_inicio">
          <DatePicker
            id="data_inicio"
            name="data_inicio"
            value={formValues.data_inicio}
            onChange={(date) => handleInputChange('data_inicio', date)}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
          />
        </Form.Item>

        <Form.Item label="Data de Fim" name="data_fim">
          <DatePicker
            id="data_fim"
            name="data_fim"
            value={formValues.data_fim}
            onChange={(date) => handleInputChange('data_fim', date)}
            showTime
            format="YYYY-MM-DD HH:mm:ss"
          />
        </Form.Item>

        <Form.Item label="Descrição" name="descricao">
          <Input.TextArea
            id="descricao"
            name="descricao"
            value={formValues.descricao}
            className='field-textarea'
            onChange={(e) => handleInputChange('descricao', e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
        </Form.Item>
      </Form>

      <NotificationContainer />
    </div>
  );
};

export default MyForm;
