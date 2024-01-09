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
| **TA03.05**     | Editar informações de um fluxo que representa um template. | 1. O usuário seleciona um fluxo de desenvolvimento existente. | O sistema exibe os detalhes do fluxo para o usuário. Porém, o sistema já exibe uma mensagem informando que aquele fluxo de desenvolvimento não pode ser alterado, porque o mesmo se trata de um template. |
| **TA03.06**     | Excluir um fluxo de desenvolvimento. Cenário em que o fluxo de desenvolvimento representa um template. | 1. Selecione um fluxo de desenvolvimento existente. | O sistema exibe os detalhes do fluxo para o usuário. |
|                 |                  | 2. O usuário clica no botão com ícone de lixeira (excluir). Se o projeto selecionado for um template, o mesmo não poderá ser excluído. | O sistema deve informar ao usuário que a exclusão do fluxo não será possível, pois o mesmo se trata de um template e que o mesmo é um modelo de desenvolvimento de software padrão. | 
| **TA03.06**     | Excluir um fluxo de desenvolvimento. Cenário em que o fluxo de desenvolvimento está vinculado a um projeto em andamento. | 1. Selecione um fluxo de desenvolvimento existente. | O sistema exibe os detalhes do fluxo para o usuário. |
|                 |                  | 2. O usuário clica no botão com ícone de lixeira (excluir). Se o projeto selecionado estiver vinculado à um projeto em andamento, o mesmo não poderá ser excluído. | O sistema deve informar ao usuário que a exclusão do fluxo não será possível, pois o mesmo já está vinculado à um projeto existente. | 
| **TA03.08**     | Excluir um fluxo de desenvolvimento. Cenário em que o fluxo de desenvolvimento não está vinculado a um projeto em andamento. | 1. Selecione um fluxo de desenvolvimento existente. | O sistema exibe os detalhes do fluxo para o usuário. |
|                 |                  | 2. O usuário clica no botão com ícone de lixeira (excluir).| O sistema deve perguntar a confirmação da operação ao usuário. Caso seja confirmado, o sistema deve exibir uma mensagem de confirmação para o usuário. Caso o usuário não confirme, o sistema simplesmente encerra a operação. | 
| **TA03.09**     | Buscar um fluxo de desenvolvimento. Cenário em que existe um ou mais fluxos de desenvolvimento nome corresponde a string de busca passada pelo usuário. | 1. O usuário clica na botão de busca "BUSCAR FLUXO DE DESENVOLVIMENTO". | O sistema exibe um Modal com um campo de busca para o usuário informar a string de busca. |
|                 |                  | 2. O usuário preenche o campo de busca e clica no botão de OK. | O sistema resgata os registros que correspondem a string de busca informada pelo usuário e exibe para o usuário no formato de uma tabela. |
| **TA03.10**     | Buscar um fluxo de desenvolvimento. Cenário em que não existe um fluxo de desenvolvimento cujo nome corresponde a string de busca passada pelo usuário. | 1. O usuário clica na botão de busca "BUSCAR FLUXO DE DESENVOLVIMENTO". | O sistema exibe um Modal com um campo de busca para o usuário informar a string de busca. |
|                 |                | 2. O usuário preenche o campo de busca e clica no botão de OK. | O sistema deve informar ao usuário que não foram encontrados resultados para sua busca. |

### User Story US04 - Manter Cronograma/Plano de Iteração

 > **Descrição:** O sistema deve possuir um módulo que o usuário **Professor/Aluno** tenha permissão para: cadastrar um cronograma para o projeto que está trabalhando, assim como realizar mudanças no cronograma e excluir caso seja necessário. Para realizar o cadastro de um cronograma é necessário que já exista um projeto, os membros do projeto, assim como o fluxo de desenvolvimento a ser seguido. Dessa forma, ao cadastrar o cronograma, é possível definir as atividades e artefatos de cada etapa, os membros e suas funções.  

|   #  | Requisitos Envolvidos |
|------|------------------------
| RF04 | Manter Cronograma/Plano de Iterações

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
| **TA04.01**     | Criar o cronograma do projeto. Cenário em que o usuário faz tudo corretamente. | 1. O usuário clica na opção cronograma no menu lateral esquerdo. | O sistema deve redirecionar o usuário para uma tela de cadastro para criação do cronograma. |
|                 |               | 2. O usuário preeche os campos corretamente e clica no botão Salvar. | O sistema deve salvar as informações fornecidas pelo usuário, exibir uma mensagem de confirmação pe depois exibir o cronograma do projeto no modo visualização. |
| **TA04.02**     | Criar o cronograma do projeto. Cenário em que o usuário não preenche os campos de forma correta. | 1. O usuário clica na opção cronograma no menu lateral esquerdo. | O sistema deve redirecionar o usuário para uma tela de cadastro para criação do cronograma. | 
|                 |                | 2. O usuário esquece um campo obrigatório ou coloca um valor diferente do esperado pelo campo, e clica no botão de salvar. | O sistema deve exibir uma mensagem de atenção, além de destacar os campos incorretos. |
| **TA04.03**     | Visualizar o cronograma do projeto. | 1. O usuário clica na opção cronograma no menu lateral esquerdo. | Se o cronograma já estiver criado, o sistema deve mostrar o cronograma em modo de visualização. Caso contrário deve ser exibido o formulário de cadastro do cronograma.  | 
| **TA04.04**     | Editar o cronograma do projeto. Cenário em que o cronograma já foi criado. | 1. O usuário clica na opção cronograma no menu lateral esquerdo. |  O sistema deve mostrar o cronograma em modo de visualização. | 
|                 |                | 2. O usuário seleciona a iteração que ele deseja alterar e clica no botão de caneta ao lado do nome da iteração. | O sistema deve exibir as informações da iteração no formulário de cadastro da iteração. | 
|                 |                | 3. O usuário altera as informações que deseja e clica no botão de salvar. | Caso o usuário tenha preenchido as informações corretamente, o sistema altera as informações da iteração e retorna para a parte de visualização do cronograma com os dados atualizados. Caso contrário, se o usuário preencher os dados incorretamente, o sistema deve exibir uma mensagem de atenção e informar os campos incorretos. | 
| **TA04.05**     | Excluir um cronograma. | 1. O usuário clica na opção cronograma no menu lateral esquerdo. | Se o cronograma já estiver criado, o sistema deve mostrar o cronograma em modo de visualização. Caso contrário deve ser exibido o formulário de cadastro do cronograma.  | 
|                 |                        | 2. O usuário clica no ícone de Lixeira localizado na parte superior direita da tela. | Se o cronograma já estiver em andamento, o sistema deve impedir a exclusão do cronograma e informar que não é possível a exclusão devido o mesmo já está em andamento. Além disso, na mensagem deve constar uma orientação informando que para excluir o cronograma, é necessário atualizar as datas do cronograma, e o mesmo não deve conter tarefas vinculadas a ele. |


### User Story US05 - Manter Membro

 > **Descrição:** O sistema deve possuir uma área de membros que permita o **Professor** cadastrar os membros dos projetos. Além da permissão de realizar o cadastro, o sistema permitir realizar a alteração, a busca, a listagem e exclusão de membros. 

|   #  | Requisitos Envolvidos |
|------|------------------------
| RF05 | Manter Membros

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
| **TA05.01**     | Cadastrar um membro no sistema. Cenário em que o usuário fornece os dados corretamente. | 1. O usuário clica na opção Área de Membros no menu lateral esquerdo. | O sistema deve redirecionar o usuário para uma página, onde é permitido, buscar, cadastrar, listar e excluir um membro. |
|                 |               | 2. O usuário clica no ícone de adição. | O sistema deve exibir um formulário para cadastro de um membro. | 
|                 |               | 3. O usuário preenche todos os campos de modo correto e clica no botão Salvar. | O sistema salva as informações no banco de dados, exibe uma mensagem de confirmação para o usuário e realiza um reload na página. |
| **TA05.02**     | Cadastrar um membro no sistema. Cenário em que o usuário fornece os dados incorretamento. | 1. O usuário clica na opção Área de Membros no menu lateral esquerdo. | O sistema deve redirecionar o usuário para uma página, onde é permitido, buscar, cadastrar, listar e excluir um membro. |
|                 |               | 2. O usuário clica no ícone de adição. | O sistema deve exibir um formulário para cadastro de um membro. | 
|                 |               | 3. O usuário não preenche um dos campos, ou informa um valor em um formato diferente do esperado. | O sistema deve notificar o usuário que algo deu errado e destacar os campos que estão com problema. |
| **TA05.03**     | Buscar um membro no sistema. Cenário em que as informações passadas pelo usuário existem na base de dados. | 1. O usuário clica no botão com o nome "BUSCAR MEMBRO" dentro da Área de Membros. | O sistema deve exibir um Modal com um campo de nome e outro de cpf para buscar o membro. |
|                 |               | 2. O usuário passa as informações e clica em OK. | O sistema deve chamar a função de busca e consultar se existe um ou mais usuários que correspondem com aquelas informações. Caso existam, o sistema deve retornar estas informações para o frontend, o qual deve exibir para o usuário em formato de lista. |
| **TA05.04**     | Buscar um membro no sistema. Cenário em que as informações passadas pelo usuário não existem na base de dados. | 1. O usuário clica no botão com o nome "BUSCAR MEMBRO" dentro da Área de Membros. | O sistema deve exibir um Modal com um campo de nome e outro de cpf para buscar o membro. |
|                 |               | 2. O usuário passa as informações e clica em OK. | O sistema deve chamar a função de busca e consultar se existe um ou mais usuários que correspondem com aquelas informações. Caso não existam, o sistema deve informar que não existem membros que correspondem as informações passadas.
| **TA05.05**     | Buscar um membro no sistema. Cenário em que o usuário não preenche as informações de busca. | 1. O usuário clica no botão com o nome "BUSCAR MEMBRO" dentro da Área de Membros. | O sistema deve exibir um Modal com um campo de nome e outro de cpf para buscar o membro. | 
|                 |               | 2. O usuário não preenche as informações e clica em OK. | O sistema deve informar ao usuário que ele deve preencher as informações de busca. | 
| **TA05.06**     | Editar as informações de um membro. Cenário em que o usuário realiza o processo corretamente. | 1. O usuário clica no botão com o nome "BUSCAR MEMBRO" dentro da Área de Membros. | O sistema deve exibir um Modal com um campo de nome e outro de cpf para buscar o membro. |
|                 |               | 2. O usuário passa as informações e clica em OK. | O sistema deve chamar a função de busca e consultar se existe um ou mais usuários que correspondem com aquelas informações. Caso existam, o sistema deve retornar estas informações para o frontend, o qual deve exibir para o usuário em formato de lista. | 
|                 |               | 3. O usuário seleciona na lista exibida qual o membro que ele deseja alterar. | O sistema deve preencher os campos do formulário de Membro com as informações do membro selecionado. | 
|                 |               | 4. O usuário altera as informações necessárias de maneira correta e clica em Salvar. | O sistema altera as informações na base de dados e notifica ao usuário que a alteração foi feita com sucesso. |
| **TA05.07**     | Editar as informações de um membro. Cenário em que o usuário realiza o processo incorretamente. | 1. O usuário clica no botão com o nome "BUSCAR MEMBRO" dentro da Área de Membros. | O sistema deve exibir um Modal com um campo de nome e outro de cpf para buscar o membro. |
|                 |               | 2. O usuário passa as informações e clica em OK. | O sistema deve chamar a função de busca e consultar se existe um ou mais usuários que correspondem com aquelas informações. Caso existam, o sistema deve retornar estas informações para o frontend, o qual deve exibir para o usuário em formato de lista. | 
|                 |               | 3. O usuário seleciona na lista exibida qual o membro que ele deseja alterar. | O sistema deve preencher os campos do formulário de Membro com as informações do membro selecionado. | 
|                 |               | 4. O usuário apaga algumas das informações ou altera um campo com um valor de formato incorreto. | O sistema informa que algo deu errado e destaca os campos com problema. |
| **TA05.08**     | Excluir um membro. Cenário em que o membro está vinculado a um projeto. | 1. O usuário clica no botão com o nome "BUSCAR MEMBRO" dentro da Área de Membros. | O sistema deve exibir um Modal com um campo de nome e outro de cpf para buscar o membro. |
|                 |               | 2. O usuário passa as informações e clica em OK. | O sistema deve chamar a função de busca e consultar se existe um ou mais usuários que correspondem com aquelas informações. Caso existam, o sistema deve retornar estas informações para o frontend, o qual deve exibir para o usuário em formato de lista. | 
|                 |               | 3. O usuário seleciona na lista exibida qual o membro que ele deseja excluir. | O sistema deve preencher os campos do formulário de Membro com as informações do membro selecionado. | 
|                 |               | 4. O usuário clica no botão com ícone de Lixeira. | O sistema deve informar que o membro está vinculado há um projeto e o mesmo não poderá ser excluído. No entanto, deve informar que o mesmo poderá ser inativado e portanto não poderá vinculado a outros projetos, além de não conseguir manipular o sistema. O sistema deve perguntar se o usuário deseja realizar a inativação. Caso o usuário responda que sim, o sistema inativa altera o status de membro de "Ativo" para "Suspenso". |
| **TA05.09**     | Excluir um membro. Cenário em que o membro não está vinculado a um projeto. | 1. O usuário clica no botão com o nome "BUSCAR MEMBRO" dentro da Área de Membros. | O sistema deve exibir um Modal com um campo de nome e outro de cpf para buscar o membro. |
|                 |               | 2. O usuário passa as informações e clica em OK. | O sistema deve chamar a função de busca e consultar se existe um ou mais usuários que correspondem com aquelas informações. Caso existam, o sistema deve retornar estas informações para o frontend, o qual deve exibir para o usuário em formato de lista. | 
|                 |               | 3. O usuário seleciona na lista exibida qual o membro que ele deseja excluir. | O sistema deve preencher os campos do formulário de Membro com as informações do membro selecionado. | 
|                 |               | 4. O usuário clica no botão com ícone de Lixeira. | O sistema pergunta se o usuário deseja realmente excluir aquele membro. Caso haja a confirmação, o sistema exclui o membro da base de dados e confirma para o usuário a realização da operação. |
| **TA05.10**     | Listar membros. | 1. O usuário clica na opção de listagem de membros. | O sistema redireciona o usuário para uma página de relatórios. Nesta página o usuário tem a opção de listar por projeto. |
|                 |               | 2. O usuário informa o projeto que deseja realizar a listagem dos membros. | O sistema deve exibir uma lista de todos os membros vinculados a aquele projeto. |

### User Story US06 - Manter Equipe

 > **Descrição:** No sistema, mais especificamente, na aba de projetos, deve haver uma aba para vincular os membros da equipe. Dessa forma, ao vincular os membros ao projeto, deve ser criado um objeto equipe que faz referência a aquele projeto. 

|   #  | Requisitos Envolvidos |
|------|------------------------
| RF06 | Manter Equipe

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
| **TA06.01**     | Cadastrar uma equipe no sistema. Cenário em que o usuário realiza os passos corretamente. | 1. O usuário clica na aba de Equipe dentro da área de projetos. | O sistema exibe uma tela onde é permitido o usuário buscar os membros, adicionar, excluir ou visualizar.|
|                 |               | 2. O usuário clica no botão de "BUSCAR MEMBRO". | O sistema exibe o formulário de busca dos membros. | 
|                 |               | 3. O usuário fornece as informações de busca e clica no botão "Ok". | O sistema realiza a busca e exibe os resultados para o usuário em formato de lista. |
|                 |               | 4. O usuário clica em uma das opções de resultados disponíveis. | O sistema adiciona o membro a lista de membros da equipe. | 
|                 |               | 5. O usuário realiza o mesmo processo acima descrito para vínculo dos outros membros. | O sistema adiciona os outros membros a lsita de membros da equipe. | 
|                 |               | 6. O usuário clica na opção "SALVAR EQUIPE". | O sistema cria um objeto equipe no banco de dados e recarrega a página de projetos. |
| **TA06.02**     | Excluir um membro da equipe no sistema. Cenário em que o membro possui tarefas atribuídas no projeto. | 1. O usuário clica na aba de Equipe dentro da área de projetos. | O sistema exibe uma tela onde é permitido o usuário buscar os membros, adicionar, excluir ou visualizar. Nesta tela, caso já exista uma lista de membros vinculados, haverá uma lista de membros, e em cada item haverá um botão de excluir e outro de visualizar as informações daquele membro.|
|                 |               | 2. O usuário clica no ícone de lixeira em algum dos items da lista de membros. | O sistema deve verificar se o membro possui tarefas vinculadas, caso haja, o sistema deve informar que não será possível a exclusão deste membro, pois o mesmo possui tarefas atribuídas a ele. Além disso, o sistema deve fornecer as seguintes orientações: "Como não é possível excluir o membro, o mesmo terá sua atividade inativada neste projeto, impedindo assim o seu acesso. |
| **TA06.03**     | Excluir um membro da equipe. Cenário em que o membro não possui tarefas atribuídas no projeto. | 1. O usuário clica na aba de Equipe dentro da área de projetos. | O sistema exibe uma tela onde é permitido o usuário buscar os membros, adicionar, excluir ou visualizar. Nesta tela, caso já exista uma lista de membros vinculados, haverá uma lista de membros, e em cada item haverá um botão de excluir e outro de visualizar as informações daquele membro.|
|                 |               | 2. O usuário clica no ícone de lixeira em algum dos items da lista de membros. | O sistema pergunta se deseja prosseguir com a ação, caso sim, o sistema exclui as informações que fazem referência entre aquele membro e aquele equipe no banco de dados, e atualiza a lista de membros da equipe do projeto. | 
| **TA06.04**     | Visualizar as informações de um membro vinculado ao projeto. | 1. O usuário clica na aba de Equipe dentro da área de projetos. | O sistema exibe uma tela onde é permitido o usuário buscar os membros, adicionar, excluir ou visualizar. Nesta tela, caso já exista uma lista de membros vinculados, haverá uma lista de membros, e em cada item haverá um botão de excluir e outro de visualizar as informações daquele membro.| 
|                 |               | 2. O usuário clica no ícone de olho em alguns dos items da lista de membros. | O sistema adiciona um Card abaixo do item clicado com as informações referentes a aquele membro. Para remover o Card, basta clica no ícone de "X" no canto superior direito do Card. | 

### User Story US07 - Manter Coordenador 

 > **Descrição:** No sistema, mais especificamente, na aba de projetos, deve haver uma aba para vincular os membros da equipe. Nesta aba, além de vincular os membros do projeto do grupo "Aluno", também deve ser possível vincular um ou mais membros do grupo "Professor" que vão atuar no projeto como "Coordenadores". Assim como os "Alunos", os coordenadores são cadastrados na Área de Membros do sistema, para isso, no ato do cadastro deve ser informado que aquele membro é um "Professor". 

|   #  | Requisitos Envolvidos |
|------|------------------------
| RF07 | Manter Coordenador

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
| **TA07.01**     | Vincular um coordenador a equipe do projeto. Cenário em que o usuário realiza todos os passos corretamente. | 1. O usuário clica na aba de Equipe dentro da área de projetos. | O sistema exibe uma tela onde é permitido o usuário buscar os membros/coordenadores, adicionar, excluir ou visualizar. Nesta aba, existe uma seção com a descrição "Coordenadores". | 
|                 |               | 2. O usuário clica no botão com ícone de "+" dentro da seção de "Coordenadores". | O sistema exibe o formulário de busca dos membros do grupo "Professores". | 
|                 |               | 3. O usuário fornece as informações de busca e clica no botão "Ok". | O sistema realiza a busca e exibe os resultados para o usuário em formato de lista. |
|                 |               | 4. O usuário clica em uma das opções de resultados disponíveis. | O sistema adiciona o professor a lista de coordenadores do projeto. | 
|                 |               | 5. O usuário realiza o mesmo processo acima descrito para vínculo de outros professores (caso necessário). | O sistema adiciona os outros professores a lista de coordenadores da equipe. | 
|                 |               | 6. O usuário clica na opção "SALVAR". | Caso já exista membros vinculados ao projeto, significa que a entidade equipe já foi criada, e portanto, o sistema só precisa criar a referência entre membro - coordenador - equipe. Caso ainda não tenha membros vinculados ao projeto, o sistema irá criar a entidade equipe também. |
| **TA07.02**     | Excluir um coordenador do projeto. Cenário em que o coordenador possui tarefas vinculadas ao projeto. | 1. O usuário clica na aba de Equipe dentro da área de projetos. | O sistema exibe uma tela onde é permitido o usuário buscar os membros/coordenadores, adicionar, excluir ou visualizar. Nesta tela, caso já exista coordenadores vinculados, haverá uma lista de coordenadores, e em cada item haverá um botão de excluir e outro de visualizar as informações daquele coordenador.|
|                 |               | 2. O usuário clica no ícone de lixeira em algum dos items da lista de coordenadores. | O sistema deve verificar se o coordenador possui tarefas vinculadas, caso haja, o sistema deve informar que não será possível a exclusão deste coordenador, pois o mesmo possui tarefas vinculadas a ele. Além disso, o sistema deve fornecer as seguintes orientações: "Como não é possível excluir o coordenador, o mesmo terá sua atividade inativada neste projeto, impedindo assim o seu acesso". OBSERVAÇÃO: Este tipo de operação só pode ser feita pelo ADMINISTRADOR do sistema. |
| **TA07.03**     | Excluir um coordenador do projeto. Cenário em que o coordenador não possui tarefas vinculadas ao projeto. | 1. O usuário clica na aba de Equipe dentro da área de projetos. | O sistema exibe uma tela onde é permitido o usuário buscar os membros/coordenadores, adicionar, excluir ou visualizar. Nesta tela, caso já exista coordenadores vinculados, haverá uma lista de coordenadores, e em cada item haverá um botão de excluir e outro de visualizar as informações daquele coordenador.|
|                 |               | 2. O usuário clica no ícone de lixeira em algum dos items da lista de coordenadores. | O sistema pergunta se deseja prosseguir com a ação, caso sim, o sistema exclui as informações que fazem referência entre aquele coordenador e aquela equipe no banco de dados, e atualiza a lista de coordenadores da equipe do projeto. OBSERVAÇÃO: Este tipo de operação só pode ser feita pelo ADMINISTRADOR do sistema. |
| **TA06.04**     | Visualizar as informações de um coordenador vinculado ao projeto. | 1. O usuário clica na aba de Equipe dentro da área de projetos. | O sistema exibe uma tela onde é permitido o usuário buscar os membros/coordenadores, adicionar, excluir ou visualizar. Nesta tela, caso já exista coordenadores vinculados, haverá uma lista de coordenadores, e em cada item haverá um botão de excluir e outro de visualizar as informações daquele coordenador.|
|                 |               | 2. O usuário clica no ícone de olho em alguns dos items da lista de coordenadores. | O sistema adiciona um Card abaixo do item clicado com as informações referentes a aquele coordenador. Para remover o Card, basta clica no ícone de "X" no canto superior direito do Card. | 

### User Story US08 - Manter Artefato  

> **Descrição:** O sistema deve possuir um módulo que tanto o usuário **Professor**, quanto o usuário **Aluno** tenha permissão para: cadastrar, pesquisar, editar e excluir artefatos.

|   #  | Requisitos Envolvidos |
|------|------------------------
| RF08 | Manter Artefato

|                           |              |
| ------------------------- | -------------|
| **Prioridade**            | Essencial    |
| **Estimativa**            |              |
| **Tempo Gasto (real):**   | 1h (back-end)|
| **Tamanho Funcional**     |              |
| **Analista**              | Joan         |
| **Desenvolvedor**         | Joan         |
| **Revisor**               | Joan         |
| **Testador**              | Joan         |

**Testes de Aceitação (TA)**

| **ID do Teste** | **Descrição** | **Critérios de Aceitação** | **Resultado Esperado** |
|-----------------|---------------|----------------------------|------------------------|
| **TA08.01**     | Criar um novo artefato. Cenário em que o usuário realiza o processo corretamente. | 1. O usuário clica no item "Artefatos" disponível no Menu. | O sistema chama a página de cadastro dos artefatos do projeto. | 
|                 |               | 2. O usuário clica no botão com ícone de "+". | O sistema exibe o formulário de cadastro do objeto Artefato. |
|                 |               | 3. O usuário preenche todos os campos do formulário corretamente e clica em "SALVAR". | O sistema salva as informações no banco de dados, exibe uma mensagem de confirmação para o usuário e recarrega a página. |         
| **TA08.02**     | Criar um novo artefato. Cenário em que o usuário não realiza o processo corretamente. | 1. O usuário clica no item "Artefatos" disponível no Menu. | O sistema chama a página de cadastro dos artefatos do projeto. | 
|                 |               | 2. O usuário clica no botão com ícone de "+". | O sistema exibe o formulário de cadastro do objeto Artefato. |
|                 |               | 3. O usuário esquece de preencher algum dos campos do formulário ou preenche algum campo com um formato de dado incorreto. | O sistema deve apontar o(s) campo(s) que apresentarão problema para o usuário e não salva as informações. |
| **TA08.03**     | Buscar um artefato. Cenário em que as informações fornecidas pelo usuário correspondem a um objeto existente no banco de dados. | 1. O usuário clica no item "Artefatos" disponível no Menu. | O sistema chama a página de gerenciamento dos artefatos do projeto. |
|                 |               | 2. O usuário clica na opção "BUSCAR ARTEFATO". | O sistema exibe um Modal com um formulário de busca. |
|                 |               | 3. O usuário fornece as informações de busca e clica no botão de "Ok". | O sistema realiza a busca no banco de dados e exibe os resultados em formato de lista para o usuário.|
| **TA08.04**     | Buscar um artefato. Cenário em que as informações fornecidas pelo usuário não correspondem a um objeto existente no banco de dados. | 1. O usuário clica no item "Artefatos" disponível no Menu. | O sistema chama a página de gerenciamento dos artefatos do projeto. |
|                 |               | 2. O usuário clica na opção "BUSCAR ARTEFATO". | O sistema exibe um Modal com um formulário de busca. | 
|                 |               | 3. O usuário fornece as informações de busca e clica no botão de "Ok". | O sistema realiza a busca no banco de dados e informa a seguinte mensagem: "Não foram encontrados resultados para esta busca." |
| **TA08.05**     | Editar um artefato. Cenário em que o usuário realiza o processo corretamente. | 1. O usuário clica no item "Artefatos" disponível no Menu. | O sistema chama a página de gerenciamento dos artefatos do projeto. | 
|                 |               | 2. O usuário clica na opção "BUSCAR ARTEFATO". | O sistema exibe um Modal com um formulário de busca. |
|                 |               | 3. O usuário fornece as informações de busca e clica no botão de "Ok". | O sistema realiza a busca no banco de dados e exibe os resultados em formato de lista para o usuário.|
|                 |               | 4. O usuário clica em algum dos items da lista. | O sistema chama o formulário de cadastro dos artefatos e preenche os campos com as informações do objeto clicado. |
|                 |               | 5. O usuário altera os campos necessários e clica em "SALVAR". | O sistema salva as informações no banco de dados e exibe uma mensagem de confirmação. |
| **TA08.06**     | Editar um artefato. Cenário em que o usuário realiza o processo incorretamente. | 1. O usuário clica no item "Artefatos" disponível no Menu. | O sistema chama a página de gerenciamento dos artefatos do projeto. | 
|                 |               | 2. O usuário clica na opção "BUSCAR ARTEFATO". | O sistema exibe um Modal com um formulário de busca. |
|                 |               | 3. O usuário fornece as informações de busca e clica no botão de "Ok". | O sistema realiza a busca no banco de dados e exibe os resultados em formato de lista para o usuário.|
|                 |               | 4. O usuário clica em algum dos items da lista. | O sistema chama o formulário de cadastro dos artefatos e preenche os campos com as informações do objeto clicado. |
|                 |               | 5. O usuário altera os campos de maneira incorreta e clica em "SALVAR". | O sistema indica os campos que foram preenchidos incorretamente e não salva as informações. |
| **TA08.07**     | Excluir um artefato. Cenário em que o artefato está vinculado a algum projeto | 1. O usuário clica no item "Artefatos" disponível no Menu. | O sistema chama a página de gerenciamento dos artefatos do projeto. | 
|                 |               | 2. O usuário clica no ícone de "lixeira". | O sistema verifica se aquele artefato está vinculado a algum projeto. Caso exista esse vínculo, o sistema deve informar que não é possível excluir o artefato. |
| **TA08.08**     | Excluir um artefato. Cenário em que o artefato não está vinculado a algum projeto. | 1. O usuário clica no item "Artefatos" disponível no Menu. | O sistema chama a página de gerenciamento dos artefatos do projeto. | 
|                 |               | 2. O usuário clica no ícone de "lixeira". | O sistema verifica se aquele artefato está vinculado a algum projeto. Caso não exista esse vínculo, o sistema pergunta se o usuário deseja prosseguir com a operação. |
|                 |               | 3. O usuário clica em "Ok". | O sistema exclui o artefato, exibe uma mensagem de confirmação e recarrega a página. |

### User Story US08 - Manter Atividade - (MODO USUÁRIO)

> **Descrição:** O sistema deve possuir um módulo que tanto o usuário **Professor**, quanto o usuário **Aluno** tenha permissão para: cadastrar, pesquisar, editar e excluir atividades. Os testes de aceitação descritos abaixo serão já no modo usuário. 


|   #  | Requisitos Envolvidos |
|------|------------------------
| RF09 | Manter Atividade

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
| **TA09.01**     | Criar uma nova atividade. Cenário em que o usuário realiza o processo corretamente. | 1. O usuário clica no Projeto desejado, disponível na página inicial do seu perfil. | O sistema abre a Área de Trabalho do projeto. Esta Área de Trabalho tem um menu que contém uma opção "Atividades". | 
|                 |               | 2. O usuário clica na opção "Atividades". | O sistema exibe um painel de colunas com todas as etapas do fluxo de desenvolvimento do projeto. | 
|                 |               | 3. O usuário clica em alguma das colunas de etapas. | O sistema deve puxar um formulário da direita com os campos para cadastro da atividade. |
|                 |               | 4. O usuário preenche corretamente os campos do formulário e clica em "SALVAR" ou pressiona a tecla "ENTER". | O sistema salva as informações e exibe uma mensagem sutil de confirmação. Após esse processo, o nome da tarefa ficará vísivel no corpo da etapa. |
| **TA09.02**     | Criar uma nova atividade. Cenário em que o usuário realiza o processo incorretamente. | 1. O usuário clica no Projeto desejado, disponível na página inicial do seu perfil. | O sistema abre a Área de Trabalho do projeto. Esta Área de Trabalho tem um menu que contém uma opção "Atividades". | 
|                 |               | 2. O usuário clica na opção "Atividades". | O sistema exibe um painel de colunas com todas as etapas do fluxo de desenvolvimento do projeto. | 
|                 |               | 3. O usuário clica em alguma das colunas de etapas. | O sistema deve puxar um formulário da direita com os campos para cadastro da etapa. |
|                 |               | 4. O usuário preenche incorretamente os campos do formulário e clica em "SALVAR" ou pressiona a tecla "ENTER". | O sistema não salva as informações e destaca os campos preenchidos incorretamente. |
| **TA09.03**     | Editar uma atividade. Cenário em que o usuário realiza o processo corretamente. | 1. O usuário clica no Projeto desejado, disponível na página inicial do seu perfil. | O sistema abre a Área de Trabalho do projeto. Esta Área de Trabalho tem um menu que contém uma opção "Atividades". | 
|                 |               | 2. O usuário clica na opção "Atividades". | O sistema exibe um painel de colunas com todas as etapas do fluxo de desenvolvimento do projeto e suas respectivas atividades. | 
|                 |               | 3. O usuário clica em alguma das atividades cadastradas previamente. | O sistema deve puxar um banner da lateral direita com todas as informações disponíveis para editar. | 
|                 |               | 4. O usuário realiza as mudanças desejadas e clica em "SALVAR". | O sistema salva as informações e exibe uma mensagem sutil de confirmação. | 
| **TA09.04**     | Editar uma atividade. Cenário em que o usuário realiza o processo incorretamente. | 1. O usuário clica no Projeto desejado, disponível na página inicial do seu perfil. | O sistema abre a Área de Trabalho do projeto. Esta Área de Trabalho tem um menu que contém uma opção "Atividades". | 
|                 |               | 2. O usuário clica na opção "Atividades". | O sistema exibe um painel de colunas com todas as etapas do fluxo de desenvolvimento do projeto e suas respectivas atividades. | 
|                 |               | 3. O usuário clica em alguma das atividades cadastradas previamente. | O sistema deve puxar um banner da lateral direita com todas as informações disponíveis para editar. | 
|                 |               | 4. O usuário realiza as mudanças desejadas, mas faz isso de maneira incorreta e clica em "SALVAR". | O sistema não salva as informações e destaca os campos que estão incorretos. |
| **TA09.05**    | Excluir uma atividade. | 1. O usuário clica no Projeto desejado disponível na página Inicial do seu Perfil. | O sistema abre a Área de Trabalho do projeto. Esta Área de Trabalho tem um menu que contém uma opção "Atividades". | 
|                 |               | 2. O usuário clica na opção "Atividades". | O sistema exibe um painel de colunas com todas as etapas do fluxo de desenvolvimento do projeto. | 
|                 |               | 3. O usuário passa o mouse sob alguma das atividades cadastradas previamente e clica no ícone de "X". | O sistema pergunta se o usuário deseja prosseguir com o processo. Caso o usuário confirme, o sistema exclui aquela atividade e exibe uma mensagem sutil de confirmação. Caso o usuário cancele a operação, o sistema simplesmente cancela o processo. | 
