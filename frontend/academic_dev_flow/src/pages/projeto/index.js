import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Select from 'react-select';
import criar_projeto from '../../services/projeto_service';

const STATUS_CHOICES = [
  { value: 'cancelado', label: 'Cancelado' },
  { value: 'em_andamento', label: 'Em andamento' },
  { value: 'concluido', label: 'Concluído' }
];

function MyForm() {
  return (
    <div>
      <h1>Cadastrar projeto</h1>
      <Formik
        initialValues={{
          nome: '',
          descricao: '',
          status: '',
          data_inicio: '',
          data_fim: ''
        }}
        onSubmit={(values) => {
          // Faça alguma coisa com os valores do formulário, por exemplo, enviar para o servidor
          console.log(values);
        }}
      >
        <Form>
          <div>
            <label htmlFor="nome">Nome:</label>
            <Field type="text" id="nome" name="nome" />
          </div>
          <div>
            <label htmlFor="descricao">Descrição:</label>
            <Field as="textarea" id="descricao" name="descricao" />
          </div>
          <div>
            <label htmlFor="status">Status:</label>
            <Field
              as={Select}
              options={STATUS_CHOICES}
              id="status"
              name="status"
            />
          </div>
          <div>
            <label htmlFor="data_inicio">Data de Início:</label>
            <Field type="datetime-local" id="data_inicio" name="data_inicio" />
          </div>
          <div>
            <label htmlFor="data_fim">Data de Fim:</label>
            <Field type="datetime-local" id="data_fim" name="data_fim" />
          </div>
          <div>
            <button type="submit">Enviar</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default MyForm;
