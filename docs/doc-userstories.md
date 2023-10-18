# Documento de User Stories 

## Descrição 

Este documento descreve os User Stories criados a partir da Lista de Requisitos Funcionais no [Documento de Visão](https://github.com/joanmdrs/academic-dev-flow/edit/main/docs/doc-visao).

> **OBSERVAÇÃO**
> 
> Não inseri os tempos estimados de implementação dos User Story por alguns motivos. Cada projeto de software exige um nível de complexidade diferente, dessa forma, acho melhor não informar uma estimativa para estes User Storys, até porque este projeto tem bastante diferenças em relação aos projetos que já implementei, os User Storys estão interligados e portanto para que algumas funcionalidades funcionem, é necessário que outros User Storys estejam prontos. 

### User Story US01 - Manter Usuário 

 > **Descrição:** O sistema deve possuir um módulo que permita cadastrar pessoas. Neste módulo o sistema deve permitir: cadastrar, buscar, editar e excluir uma pessoa. Além disso, no formulário de criação deve possuir uma aba para definir a qual grupo de usuário esta pessoa pertence, isto é, se ela representa um aluno ou um professor. 
> 
|   #  | Requisitos Envolvidos |
|------|------------------------
| RF01 | Manter Usuário

|                           |              |
| ------------------------- | -------------|
| **Prioridade**            | Essencial    |
| **Estimativa**            |              |
| **Tempo Gasto (real):**   |              |
| **Tamanho Funcional**     |              |
| **Analista**              | Joan         |
| **Desenvolvedor**         | Joan         |
| **Revisor**               | Joan         |
| **Testador**              | Joan         |

**Testes de Aceitação (TA)**

| **ID do Teste** | **Descrição**                                         | **Critérios de Aceitação**                                      | **Resultado Esperado**               |
|-----------------|-------------------------------------------------------|-----------------------------------------------------------------|--------------------------------------|
| **TA01.01**     | Criar um novo usuário                                 | 1. Acesse a página de criação de usuário.                       | O sistema exibe o formulário de criação de usuário. |
|                 |                                                       | 2. Preencha todos os campos obrigatórios.                       | O usuário é criado com sucesso.      |
|                 |                                                       | 3. Clique em "Salvar".                                          | O usuário é salvo no sistema.        |
| **TA01.02**     | Editar informações de um usuário                      | 1. Selecione um usuário existente.                              | O sistema exibe os detalhes do usuário selecionado. |
|                 |                                                       | 2. Clique em "Editar Usuário".                                  | O sistema permite editar as informações do usuário. |
|                 |                                                       | 3. Faça as alterações desejadas.                                | As alterações são salvas com sucesso.  |
| **TA01.03**     | Excluir um usuário                                    | 1. Selecione um usuário existente.                              | O sistema exibe os detalhes do usuário selecionado. |
|                 |                                                       | 2. Clique em "Excluir Usuário".                                 | O sistema exibe uma confirmação de exclusão. |
|                 |                                                       | 3. Confirme a exclusão do usuário.                              | O usuário é removido do sistema.       |
| **TA01.04**     | Pesquisar usuários                                    | 1. Acesse a função de pesquisa de usuários.                     | O sistema exibe um campo de pesquisa. |
|                 |                                                       | 2. Informe as palavras de busca e pressione enter.              | O sistema realiza a busca no banco de dados e exibe os resultados. |
| **TA01.05**     | Visualizar lista de usuários                          | 1. Acesse o módulo de Relatórios na plataforma.                 | O sistema exibe uma lista de possíveis relatórios. |
|                 |                                                       | 2. Selecione o relatório "Listagem de Usuários".                | O sistema exibe um formulário com campos de busca. |
|                 |                                                       | 3. Preencha todos os campos obrigatórios e clique em gerar.     | O sistema abre uma nova aba com uma tabela com os dados cadastrais dos usuários. | 

### User Story US02 - Manter Projeto 

 > **Descrição:** O sistema deve possuir um módulo que o usuário **Professor** tenha permissão para: cadastrar, pesquisar, editar e excluir projetos, além de um módulo de relatórios para listar os projetos. 

|   #  | Requisitos Envolvidos |
|------|------------------------
| RF02 | Manter Projeto

|                           |              |
| ------------------------- | -------------|
| **Prioridade**            | Essencial    |
| **Estimativa**            |              |
| **Tempo Gasto (real):**   |              |
| **Tamanho Funcional**     |              |
| **Analista**              | Joan         |
| **Desenvolvedor**         | Joan         |
| **Revisor**               | Joan         |
| **Testador**              | Joan         |

**Testes de Aceitação (TA)**

| **ID do Teste** | **Descrição**                     | **Critérios de Aceitação**                                       | **Resultado Esperado**               |
|-----------------|-----------------------------------|------------------------------------------------------------------|--------------------------------------|
| **TA02.01**     | Criar um novo projeto             | 1. Clique no botão com ícone de adição (adicionar).              | O sistema exibe o formulário de criação de projeto. |
|                 |                                   | 2. Preencha todos os campos obrigatórios.                        | O projeto é criado com sucesso.      |
|                 |                                   | 3. Clique em "Salvar".                                           | O projeto é salvo no sistema.        |
| **TA02.02**     | Editar informações de um projeto. | 1. Selecione um projeto existente.                               | O sistema preenche os campos do formulário com os detalhes do projeto selecionado. |    
|                 |                                   | 2. Clique no botão com ícone de caneta (edição).                 | O sistema permite editar as informações do projeto. |
|                 |                                   | 3. Faça as alterações desejadas.                                 | As alterações são salvas com sucesso.  |
| **TA02.03**     | Excluir um projeto                | 1. Selecione um projeto existente.                               | O sistema preenche os campos do formulário com os detalhes do projeto selecionado. |     |                 |                                   | 2. Clique no botão com ícone de lixeira (excluir).               | O sistema solicita a confirmação de exclusão do projeto. |
|                 |                                   | 3. Confirme a exclusão do projeto.                               | O projeto é removido do sistema.       |
| **TA02.04**     | Pesquisar projetos                | 1. Clique no botão com ícone de lupa (pesquisar).                | O sistema exibe o formulário de busca. |
|                 |                                   | 2. Informe as palavras de busca e pressione enter.               | O sistema realiza a busca no banco de dados e exibe para a interface. |
| **TA02.05**     | Visualizar lista de projetos      | 1. Acesse o módulo de Relatórios na plataforma.                  | O sistema exibe uma lista de possíveis relatórios. |
|                 |                                   | 2. Selecione o relatório "Listagem de Projetos".                 | O sistema exibe um formulário com campos de busca. |
|                 |                                   | 3. Preencha todos os campos obrigatórios e clique em gerar.      | O sistema abre uma nova aba com uma tabela com os dados cadastrais do projeto. | 


### User Story US03 - Manter Fluxo de desenvolvimento 

 > **Descrição:** O sistema deve possuir um módulo ou aba que permita gerenciar um fluxo de desenvolvimento de software. Este gerenciamento deve permitir que o usuário consiga visualizar fluxos de desenvolvimento já cadastrados previamente pelo administrador do sistema, como uma forma de templates. Além disso, este módulo deve permitir que o usuário consiga cadastrar novos modelos de fluxo de desenvolvimento, assim como editar e excluir caso seja necessário.


|   #  | Requisitos Envolvidos |
|------|------------------------
| RF03 | Manter Fluxo de desenvolvimento

|                           |              |
| ------------------------- | -------------|
| **Prioridade**            | Essencial    |
| **Estimativa**            |              |
| **Tempo Gasto (real):**   |              |
| **Tamanho Funcional**     |              |
| **Analista**              | Joan         |
| **Desenvolvedor**         | Joan         |
| **Revisor**               | Joan         |
| **Testador**              | Joan         |

**Testes de Aceitação (TA)**

| **ID do Teste** | **Descrição** | **Critérios de Aceitação** | **Resultado Esperado** |
|-----------------|---------------|----------------------------|------------------------|
| **TA03.01**     | Criar um novo fluxo de desenvolvimento. Cenário em que o usuário preenche todos os campos corretamente. | 1. O usuário clica no botão com ícone de adição (adicionar). | O sistema exibe o formulário de criação do fluxo de desenvolvimento. |
|                 |               | 2. O usuário preeche todos os campos obrigatórios e clica no botão salvar. | O fluxo é criado com sucesso e é exibido uma mensagem de confirmação para o usuário. |
| **TA03.02**     | Criar um novo fluxo de desenvolvimento. Cenário em que o usuário não preenchou os campos corretamente. | 1. O usuário clica no botão com ícone de adição (adicionar). | O sistema exibe o formulário de criação do fluxo de desenvolvimento. |
|                 |               | 2. O usuário esqueceu de preencher um ou mais campos e clica no botão salvar. | O sistema não cria o fluxo e exibe uma mensagem informando que algo deu errado. | 
|                 |               | 3. O usuário não preeche os campos do formulário e clica no botão Salvar. | O sistema não cria o fluxo e exibe uma mensagem informando que algo deu errado. | 
| **TA03.03**     | Editar informações de um novo fluxo. Cenário em que o usuário preenche todos os campos corretamente.    | 1. O usuário seleciona um fluxo de desenvolvimento existente. | O sistema exibe os detalhes do fluxo para o usuário. |
|                 |               | 2. O usuário faz as alterações desejadas e permitidas e clica no botão de Salvar. As informações precisam está de acordo com os campos do formulário exigidos pelo formulário, assim como de acordo com as permissões. | O sistema atualiza as informações no banco de dados e exibe uma mensagem de confirmação para o usuário. |
| **TA03.04**     | Editar informações de um novo fluxo. Cenário em que o usuário não preenche as informações corretamente.    | 1. O usuário seleciona um fluxo de desenvolvimento existente. | O sistema exibe os detalhes do fluxo para o usuário. |
|                 |               | 2. O usuário apagou um dos campos do formulário e clica no botão salvar. | O sistema não atualiza as informações do fluxo e exibe uma mensagem informando que algo deu errado.|
|                 |               | 3. O usuário preenche um campo incorretamente, por exemplo, um campo que esperava texto, o usuário informou números. | O sistema não atualiza as informações do fluxo e exibe uma mensagem informando que algo deu errado. |
| **TA03.05**     | Editar informações de um fluxo que representa um template. | 1. O usuário seleciona um fluxo de desenvolvimento existente. | O sistema exibe os detalhes do fluxo para o usuário. Porém, o usuário já exibe uma mensagem informando que aquele fluxo de desenvolvimento não pode ser alterado, porque o mesmo se trata de um template. |
| **TA03.03**     | Excluir um fluxo de desenvolvimento    | 1. Selecione um fluxo de desenvolvimento existente.              | O sistema exibe os detalhes do fluxo para o usuário. |
|                 |                                        | 2. Se o projeto selecionado for um template. O mesmo não poderá ser excluído. | O sistema deve informar ao usuário que a exclusão do fluxo não será possível, pois o mesmo se trata de um 






