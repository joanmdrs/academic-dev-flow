import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BotaoAdicionar from './BotaoAdicionar'; // Ajuste o caminho conforme necessário

describe('BotaoAdicionar', () => {
  test('deve renderizar o botão com o ícone PlusOutlined', () => {
    render(<BotaoAdicionar funcao={() => {}} status={false} />);
    
    // Verifica se o botão está no documento
    const botao = screen.getByRole('button');
    expect(botao).toBeInTheDocument();
    
    // Verifica se o botão contém o ícone PlusOutlined
    const icone = botao.querySelector('svg'); // Ant Design usa SVG para ícones
    expect(icone).toBeInTheDocument();
    // Você pode adicionar mais verificações se souber detalhes específicos do ícone
  });

  test('deve chamar a função funcao ao clicar no botão', () => {
    const funcaoMock = jest.fn();
    render(<BotaoAdicionar funcao={funcaoMock} status={false} />);
    
    // Simula o clique no botão
    fireEvent.click(screen.getByRole('button'));
    
    // Verifica se a função foi chamada
    expect(funcaoMock).toHaveBeenCalledTimes(1);
  });

  test('deve desativar o botão quando o status é true', () => {
    render(<BotaoAdicionar funcao={() => {}} status={true} />);
    
    // Verifica se o botão está desativado
    const botao = screen.getByRole('button');
    expect(botao).toBeDisabled();
  });

  test('não deve desativar o botão quando o status é false', () => {
    render(<BotaoAdicionar funcao={() => {}} status={false} />);
    
    // Verifica se o botão não está desativado
    const botao = screen.getByRole('button');
    expect(botao).not.toBeDisabled();
  });
});
