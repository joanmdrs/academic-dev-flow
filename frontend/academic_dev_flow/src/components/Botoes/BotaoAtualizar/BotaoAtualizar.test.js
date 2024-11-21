import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MdEdit } from 'react-icons/md';
import BotaoAtualizar from './BotaoAtualizar'; // Ajuste o caminho conforme necessário

describe('BotaoAtualizar', () => {
  test('deve renderizar o botão com o ícone MdEdit', () => {
    render(<BotaoAtualizar funcao={() => {}} status={false} />);
    
    // Verifica se o botão está presente no documento
    const botao = screen.getByRole('button');
    expect(botao).toBeInTheDocument();

    // Verifica se o botão tem a classe esperada do Ant Design
    expect(botao).toHaveClass('ant-btn');
    expect(botao).toHaveClass('ant-btn-default');
    expect(botao).toHaveClass('ant-btn-lg');

    // Verifica se o ícone MdEdit está presente no botão
    const icon = screen.getByRole('img'); // Assumindo que o ícone é renderizado como um elemento <svg> com o papel de ícone
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('anticon');
  });

  test('deve chamar a função funcao ao clicar no botão', () => {
    const funcaoMock = jest.fn();
    render(<BotaoAtualizar funcao={funcaoMock} status={false} />);
    
    // Simula o clique no botão
    fireEvent.click(screen.getByRole('button'));
    
    // Verifica se a função foi chamada
    expect(funcaoMock).toHaveBeenCalledTimes(1);
  });

  test('deve desativar o botão quando status é true', () => {
    render(<BotaoAtualizar funcao={() => {}} status={true} />);
    
    // Verifica se o botão está desativado
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('não deve desativar o botão quando status é false', () => {
    render(<BotaoAtualizar funcao={() => {}} status={false} />);
    
    // Verifica se o botão não está desativado
    expect(screen.getByRole('button')).not.toBeDisabled();
  });
});
