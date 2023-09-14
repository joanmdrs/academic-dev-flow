## Documento de Modelos

Neste documento temos o modelo Conceitual (UML) ou de Dados (Entidade-Relacionamento). Temos também a descrição das entidades e o dicionário de dados.

## Modelo de Dados

## Modelo de Dados (Entidade-Relacionamento)

```mermaid
erDiagram
  Projeto ||--|{Fluxo: possui
  Projeto ||--|{Equipe: possui
  Projeto }|..|{ Responsavel: possui
  Responsavel ||--|| Equipe: coordena
  Responsavel ||--|| Pessoa: representa
  Membro ||--|| Pessoa: representa
  Pessoa ||--|| Usuario: associa
  Usuario ||--|| Membro: associa
  Usuario ||--|| Responsavel: associa
  Membro }|..|{ Equipe: envolve
  Fluxo }|--||Etapa: possui
  Etapa }|--||Artefato: possui
  Etapa }|--||Atividade: possui
  Membro }|..|{ Artefato: faz
  Membro }|..|{ Atividade: faz
  Artefato }|--|| Comentario: possui
  Atividade }|--|| Comentario: possui
  Artefato ||--|| Pontuacao: possui
  Atividade ||--|| Pontuacao: possui
  Pontuacao ||--|| Comentario: possui
  Pontuacao ||--|{Responsavel: atribui

 


  

 
