import React from 'react';
import { Badge, Calendar } from 'antd';
import moment from 'moment';

// Função para obter os dados da lista de tarefas
const getListData = (value, tasks) => {
  let listData = [];
  
  // Filtra as tarefas cujas datas incluem o valor atual do calendário
  tasks.forEach(task => {
    const taskStart = moment(task.data_inicio);
    const taskEnd = moment(task.data_termino);
    
    // Verifica se a data atual está entre o início e o término da tarefa
    if (value.isSameOrAfter(taskStart, 'day') && value.isSameOrBefore(taskEnd, 'day')) {
      listData.push({
        type: getStatusType(task.status),  // Mapeia o status da tarefa para o tipo visual
        content: `${task.nome} (${task.nome_categoria})`,
      });
    }
  });

  return listData;
};

// Função para mapear o status da tarefa para o tipo de badge
const getStatusType = (status) => {
  switch (status) {
    case 'concluida':
      return 'success';
    case 'em progresso':
      return 'warning';
    case 'atrasada':
      return 'error';
    default:
      return 'default';
  }
};

const CalendarTask = ({ tarefas }) => {
  const monthCellRender = (value) => {
    // Adapte aqui se precisar de dados mensais
    return null;
  };

  const dateCellRender = (value) => {
    // Obtém a lista de eventos para a data atual
    const listData = getListData(value, tarefas);
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  return <Calendar cellRender={cellRender} />;
};

export default CalendarTask;
