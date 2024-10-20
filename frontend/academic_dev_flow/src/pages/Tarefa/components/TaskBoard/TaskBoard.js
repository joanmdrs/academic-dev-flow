import { Avatar, Flex, Space, Tooltip, Typography } from "antd";
import React from "react";
import { FaPlay, FaPlus } from "react-icons/fa";
import { formatDate, gerarCorAleatoria, getRandomColor, limitarCaracteres } from "../../../../services/utils";
import { GoCommentDiscussion } from "react-icons/go";
import { IoMdCreate, IoMdTrash } from "react-icons/io";
import { FaRegClock } from "react-icons/fa";
import ColumnTaskBoard from "./ColumnTaskBoard/ColumnTaskBoard";

const maxAvatars = 3 
const tarefas = [
    {
      "categoria": 'PLANEJAMENTO',
      "cor_categoria": gerarCorAleatoria(),
      "nome": "Desenvolver página de login",
      "descricao": "Criar a interface de login e validar as credenciais de usuário.",
      "inicio": "2024-10-10",
      "fim": "2024-10-15",
      "nomes_membros": ["Ana Silva", "Carlos Almeida"],
      "status": "Em andamento",
      "nome_projeto": "Sistema de Autenticação"
    },
    {
      "nome": "Integrar API de pagamentos",
      "descricao": "Conectar a API de pagamentos ao backend e testar transações.",
      "inicio": "2024-10-12",
      "fim": "2024-10-18",
      "nomes_membros": ["João Santos", "Marina Costa"],
      "status": "Pendente",
      "nome_projeto": "Plataforma de E-commerce"
    },
    {
      "nome": "Revisar código do módulo de relatórios",
      "descricao": "Analisar e otimizar o código do módulo de geração de relatórios.",
      "inicio": "2024-10-08",
      "fim": "2024-10-12",
      "nomes_membros": ["Roberto Souza", "Laura Mendes"],
      "status": "Concluída",
      "nome_projeto": "Sistema de Relatórios"
    },
    {
      "nome": "Configurar CI/CD",
      "descricao": "Implementar integração e entrega contínua no projeto.",
      "inicio": "2024-10-07",
      "fim": "2024-10-11",
      "nomes_membros": ["Fernanda Lopes", "Paulo Ribeiro"],
      "status": "Em andamento",
      "nome_projeto": "Infraestrutura DevOps"
    },
    {
      "nome": "Testar funcionalidade de notificação",
      "descricao": "Validar o sistema de envio de notificações push e por e-mail.",
      "inicio": "2024-10-14",
      "fim": "2024-10-20",
      "nomes_membros": ["Lucas Ferreira", "Camila Martins"],
      "status": "Pendente",
      "nome_projeto": "Sistema de Notificações"
    },
    {
      "nome": "Atualizar documentação da API",
      "descricao": "Incluir novos endpoints e parâmetros na documentação.",
      "inicio": "2024-10-09",
      "fim": "2024-10-10",
      "nomes_membros": ["Renato Pereira", "Clara Souza"],
      "status": "Concluída",
      "nome_projeto": "Documentação da API"
    },
    {
      "nome": "Criar banco de dados de usuários",
      "descricao": "Estruturar o banco de dados e definir regras de acesso.",
      "inicio": "2024-10-05",
      "fim": "2024-10-08",
      "nomes_membros": ["Thiago Matos", "Bruna Oliveira"],
      "status": "Concluída",
      "nome_projeto": "Gestão de Usuários"
    },
    {
      "nome": "Implementar autenticação OAuth",
      "descricao": "Adicionar autenticação via OAuth para terceiros.",
      "inicio": "2024-10-15",
      "fim": "2024-10-22",
      "nomes_membros": ["Patrícia Rocha", "Diego Costa"],
      "status": "Pendente",
      "nome_projeto": "Sistema de Autenticação"
    },
    {
      "nome": "Desenvolver dashboard de analytics",
      "descricao": "Criar um painel para visualizar métricas de uso da aplicação.",
      "inicio": "2024-10-13",
      "fim": "2024-10-19",
      "nomes_membros": ["Isabela Faria", "Felipe Lima"],
      "status": "Em andamento",
      "nome_projeto": "Plataforma de Analytics"
    },
    {
      "nome": "Corrigir bugs no sistema de permissões",
      "descricao": "Resolver problemas relacionados ao controle de acesso.",
      "inicio": "2024-10-09",
      "fim": "2024-10-12",
      "nomes_membros": ["Rafael Sousa", "Vanessa Gomes"],
      "status": "Concluída",
      "nome_projeto": "Gestão de Permissões"
    }
  ]
  

const TaskBoard = () => {
    return (
        <div>
            <Flex gap="large" align="flex-start">
                <ColumnTaskBoard tarefas={tarefas} title={'To-Do'}/> 
                
                <ColumnTaskBoard tarefas={tarefas} title={'Doing'}/> 
                
                
                <ColumnTaskBoard tarefas={tarefas} title={'Done'}/> 
            </Flex>
        </div>
    )
}   

export default TaskBoard