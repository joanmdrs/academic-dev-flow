import React, { useState } from 'react';
import moment from 'moment'
import './PageProjeto.css';
import 'react-notifications/lib/notifications.css';
import {atualizarProjeto, buscarProjetoPeloNome, criarProjeto, excluirProjeto} from '../../services/projeto_service';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { Form, Input, Select, DatePicker, Button } from 'antd';
import Titulo from '../../components/Titulo/Titulo';
import BotaoAdicionar from '../../components/Botoes/BotaoAdicionar/BotaoAdicionar';
import BotaoExcluir from '../../components/Botoes/BotaoExcluir/BotaoExcluir';
import BotaoBuscar from '../../components/Botoes/BotaoBuscar/BotaoBuscar';
import ModalDeBusca from '../../components/Modal/ModalDeBusca';
import 'moment/locale/pt-br';
import { recarregarPagina } from '../../services/utils';
moment.locale('pt-br');


const PageProjeto = () => {

  const VALORES_INICIAIS = {
    nome: '',
    descricao: '',
    status: '',
    data_inicio: '',
    data_fim: '',
  };

  const COLUNAS_MODAL = [
    {
        title: "Código",
        key: "codigo",
        dataIndex: "id",
    },
    {
        title: "Nome",
        dataIndex: "nome",
        key: "nome",
        render:(text, record) => (
          <span 
            style={{color: 'blue', cursor: 'pointer'}}
            onClick={() => {handleCliqueLinha(record)}}
          >
            {text}
          </span>
         )
    },
    {
        title: "Descrição",
        dataIndex: "descricao",
        key: "descricao",
    },
  ];
  

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
  };

  const handleFecharModal = () => {
    setIsModalVisivel(false);
  };

  const handleCliqueLinha = (record) => {

    form.setFields([
      { name: 'nome', value: record.nome },
      { name: 'descricao', value: record.descricao },
      { name: 'status', value: record.status },
      { name: 'data_inicio', value: moment(record.data_inicio, 'YYYY-MM-DD')},
      { name: 'data_fim',  value: moment(record.data_fim, 'YYYY-MM-DD')}
    ]);
    
    setAcaoForm('atualizar')
    setIsFormVisivel(true)
    setIdProjeto(record.id);
    setIsBotaoExcluirVisivel(false);
    handleFecharModal()
  }

  const handleCliqueBotaoAdicionar = () => {
    setAcaoForm('criar')
    setIsFormVisivel(true)
    form.resetFields()
    setIsBotaoExcluirVisivel(true)
    setIsBotaoBuscarVisivel(true)
    setIsBotaoAdicionarVisivel(true)
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
      const resposta = await atualizarProjeto(dados, id)
      
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
        recarregarPagina()
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
        <BotaoAdicionar funcao={handleCliqueBotaoAdicionar} status={isBotaoAdicionarVisivel}/>
        <BotaoExcluir funcao={handleExcluirProjeto} status={isBotaoExcluirVisivel}/>
      </div>
      
      <BotaoBuscar nome="BUSCAR PROJETO" funcao={handleMostrarModal} status={isBotaoBuscarVisivel}/>

      <ModalDeBusca 
        colunas={COLUNAS_MODAL}
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
              <Option value="">Selecione uma opção</Option>
              <Option value="cancelado">Cancelado</Option>
              <Option value="em_andamento">Em andamento</Option>
              <Option value="concluido">Concluído</Option>
            </Select>
          </Form.Item>

          <div style={{display: 'flex'}}>
            <Form.Item label="Data de Início" name="data_inicio" >
              <DatePicker
                id="data_inicio"
                name="data_inicio"
                className='date-picker'
                placeholder='00/00/0000'
                value={valoresForm.data_inicio}
                onChange={(date) => handleAlteracoesInput('data_inicio', date)}
                format="DD/MM/YYYY"
              />
            </Form.Item>

            <Form.Item label="Data de Fim" name="data_fim">
              <DatePicker
                id="data_fim"
                name="data_fim"
                className='date-picker'
                placeholder='00/00/0000'
                value={valoresForm.data_fim}
                onChange={(date) => handleAlteracoesInput('data_fim', date)}
                format="DD/MM/YYYY"
              />
            </Form.Item>
          </div>

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

}

export default PageProjeto;
