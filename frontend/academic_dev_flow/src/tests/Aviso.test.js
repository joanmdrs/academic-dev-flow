import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Aviso from "../components/Aviso/Aviso";

describe("Aviso Component", () => {
  it("deve renderizar corretamente com os props fornecidos", () => {
    // Mock das funções e props
    const onClose = jest.fn();
    const titulo = "Título do Aviso";
    const descricao = "Descrição do aviso";

    // Renderizar o componente
    render(<Aviso titulo={titulo} descricao={descricao} visible={true} onClose={onClose} />);

    // Verificar se o título e a descrição estão presentes
    expect(screen.getByText(titulo)).toBeInTheDocument();
    expect(screen.getByText(descricao)).toBeInTheDocument();

    // Verificar se o botão "Entendi" está presente
    const button = screen.getByText("Entendi");
    expect(button).toBeInTheDocument();

    // Simular um clique no botão "Entendi"
    fireEvent.click(button);

    // Verificar se a função onClose foi chamada
    expect(onClose).toHaveBeenCalled();
  });

  it("não deve renderizar o drawer quando a prop visible é false", () => {
    // Mock das funções e props
    const onClose = jest.fn();
    const titulo = "Título do Aviso";
    const descricao = "Descrição do aviso";

    // Renderizar o componente com visible={false}
    render(<Aviso titulo={titulo} descricao={descricao} visible={false} onClose={onClose} />);

    // Verificar se o Drawer não está presente no documento
    expect(screen.queryByText(titulo)).not.toBeInTheDocument();
    expect(screen.queryByText(descricao)).not.toBeInTheDocument();
    expect(screen.queryByText("Entendi")).not.toBeInTheDocument();
  });
});
