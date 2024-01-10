import React, { useState } from 'react';
import moment from 'moment'
import './PageProjeto.css';
import 'react-notifications/lib/notifications.css';
import {atualizarProjeto, buscarProjetoPeloNome, criarProjeto, excluirProjeto} from '../../services/projeto_service';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Form, Input, Select, DatePicker, Button } from 'antd';
import Titulo from '../../components/Titulo/Titulo';
import BotaoFiltrar from '../../components/Botoes/BotaoFiltrar/BotaoFiltrar';
import BotaoAdicionar from '../../components/Botoes/BotaoAdicionar/BotaoAdicionar';
import BotaoExcluir from '../../components/Botoes/BotaoExcluir/BotaoExcluir';
import ModalBusca from '../../components/Modal/Modal';
import 'moment/locale/pt-br';
import { recarregarPagina } from '../../services/utils';
import BotaoBuscar from '../../components/Botoes/BotaoBuscar/BotaoBuscar';
moment.locale('pt-br');


const PageProjeto = () => {

  const STATUS_CHOICES = [
    { value: 'cancelado', label: 'Cancelado' },
    { value: 'em_andamento', label: 'Em andamento' },
    { value: 'concluido', label: 'Concluído' },
  ];

  const VALORES_INICIAIS = {
    nome: '',
    descricao: '',
    status: '',
    data_inicio: '',
    data_fim: '',
  };

  const [valoresForm, setValoresForm] = useState(VALORES_INICIAIS);
  const [idProjeto, setIdProjeto] = useState('');
  const [acaoForm, setAcaoForm] = useState('criar');
  const [isModalVisivel, setIsModalVisivel] = useState(false);
  const [isFormVisivel, setIsFormVisivel] = useState(false);
  const [isBotaoExcluirVisivel, setIsBotaoExcluirVisivel] = useState(true);
  const [isBotaoAdicionarVisivel, setIsBotaoAdicionarVisivel] = useState(false);
  const [isBotaoBuscarVisivel, setIsBotaoBuscarVisivel] = useState(false);

  const [form] = Form.useForm();
  const { Option } = Select;

  const handleAlteracoesInput = (name, value) => {
    setValoresForm({ ...valoresForm, [name]: value });
  };


  const handleMostrarModal = () => {
    setIsModalVisivel(true);
    setIsFormVisivel(true);
  };

  const handleFecharModal = () => {
    setIsModalVisivel(false);
  };

  const handleCliqueLinha = (record) => {
    form.setFields([
      { name: 'nome', value: record.nome },
      { name: 'descricao', value: record.descricao },
      { name: 'status', value: record.status },
      { name: 'data_inicio', value: moment(record.data_inicio)},
      { name: 'data_fim', value: moment(record.data_fim)}
    ]);
    
    setAcaoForm('atualizar')
    setIdProjeto(record.id);
    setIsBotaoExcluirVisivel(false);
    handleFecharModal()
  }
  
  const handleCriarProjeto = async (dados) => {
    try {
      const resposta = await criarProjeto(dados)
      
      if(resposta.status === 200){
        NotificationManager.success('Projeto criado com sucesso!');
        recarregarPagina()
      } else {
        NotificationManager.error("Ocorreu um problema, contate o suporte!");
      }
    }catch (error) {
      NotificationManager.error("Ocorreu um problema, contate o suporte!");
    }
  }

  const handleAtualizarProjeto = async (dados, id) => {
    try {
      const resposta = await atualizarProjeto(dados)
      
      if(resposta.status === 200){
        NotificationManager.success('Projeto atualizado com sucesso!');
        recarregarPagina()
      } else {
        NotificationManager.error("Ocorreu um problema, contate o suporte!");
      }
    }catch (error) {
      NotificationManager.error("Ocorreu um problema, contate o suporte!");
    }
  }

  const handleSubmeterForm = async (dados) => {
    if (acaoForm === 'criar'){
      await handleCriarProjeto(dados)
    }else if(acaoForm === 'atualizar'){
      await handleAtualizarProjeto(dados, idProjeto)
    }
  };


  const handleExcluirProjeto = async () => {
    try {
      const resposta = await excluirProjeto(idProjeto)

      if (resposta.status === 204){
        NotificationManager.success('Projeto excluído com sucesso!');
      } else {
        NotificationManager.error("Ocorreu um problema, contate o suporte!");
      }
    } catch (error) {
      NotificationManager.error("Ocorreu um problema, contate o suporte!");
    }
  }

  const handleBuscarProjeto = async (parametro) => {
    try {
      const resposta = await buscarProjetoPeloNome(parametro)

      if(resposta.status !== 200){
        NotificationManager.error("Ocorreu um problema ao buscar os dados, contate o suporte!")
      } else {
        return resposta
      }
    } catch (error) {
      NotificationManager.error("Ocorreu um problema ao buscar os dados, contate o suporte!")
    } 
  }

  return (
    <div>
      <Titulo 
        titulo="Projetos" 
        paragrafo="Projetos > Gerenciar projetos"
      />

      <div className='add-and-delete'>
        <BotaoAdicionar funcao={setIsFormVisivel(true)} status={isBotaoAdicionarVisivel}/>
        <BotaoExcluir funcao={handleExcluirProjeto} status={isBotaoExcluirVisivel}/>
      </div>
      
      <BotaoBuscar funcao={handleMostrarModal} status={isBotaoBuscarVisivel}/>
      

      <ModalBusca 

        titulo="Buscar projeto" 
        status={isModalVisivel} 
        onCancel={handleFecharModal}
        onOk={handleBuscarProjeto}
        label="Nome do projeto"
        name="name-projeto"
      />
    
      {isFormVisivel && (
        <Form
          form={form}
          className='form-projeto'
          initialValues={VALORES_INICIAIS}
          onFinish={handleSubmeterForm}
          
        >
          <Form.Item label="Nome" name="nome">
            <Input
              id="input-nome"
              name="nome"
              value={valoresForm.nome}
              onChange={(e) => handleAlteracoesInput('nome', e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Select
              id="status"
              name="status"
              value={valoresForm.status}
              className='field-select'
              onChange={(value) => handleAlteracoesInput('status', value)}
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
              value={valoresForm.data_inicio}
              onChange={(date) => handleAlteracoesInput('data_inicio', date)}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
            />
          </Form.Item>

          <Form.Item label="Data de Fim" name="data_fim">
            <DatePicker
              id="data_fim"
              name="data_fim"
              value={valoresForm.data_fim}
              onChange={(date) => handleAlteracoesInput('data_fim', date)}
              showTime
              format="YYYY-MM-DD HH:mm:ss"
            />
          </Form.Item>

          <Form.Item label="Descrição" name="descricao">
            <Input.TextArea
              id="descricao"
              name="descricao"
              value={valoresForm.descricao}
              className='field-textarea'
              onChange={(e) => handleAlteracoesInput('descricao', e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Salvar
            </Button>
          </Form.Item>
        </Form>

      )}

      <NotificationContainer />
    </div>
  );
};

export default PageProjeto;
