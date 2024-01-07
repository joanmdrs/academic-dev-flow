# Documento de Visão

## Introdução 

O documento de visão é um componente fundamental do processo de desenvolvimento de software, pois ele estabelece a direção e os objetivos do projeto. Ele serve como um guia para toda a equipe, incluindo desenvolvedores, designers, gerentes e stakeholders, para garantir que todos compartilhem uma compreensão clara e coesa do que o produto final será. 

Este documento tem como objetivo descrever algumas características relacionadas ao sistema a ser desenvolvido, o qual se trata de um sistema Gerenciador de Softwares Acadêmicos desenvolvidos por alunos do curso de Sistemas de Informação. Existem muitas ferramenta de gerenciamento de projetos, no entanto, nenhuma delas é direcionada para o meio acadêmico, mas para o meio corporativo. Diante disso, é sabido que antes dos alunos chegarem no mundo corporativo e começarem a trabalhar com projetos de software reais, primeiro eles precisam passar pela gradução (em muitos casos), logo, uma ferramenta que possa auxiliar o professor no momento de acompanhar o desempenho dos projetos desenvolvidos por seus alunos, assim como seu potencial individual, pode trazer alguns benefícios como por exemplo: a facilidade das atividades de registro e análise feitas pelo docente, assim como promover a possibilidade do aluno trabalhar com uma ferramenta que lhe permita documentar todo o ciclo de desenvolvimento de um sistema, entregado artefatos e atividades, assim como analisar seu desempenho e permitir a comunicação entre os membros da equipe. 

## Público Alvo e Usuários

| Perfil | Descrição | 
| ------ | --------- |
| Aluno  | O perfil de usuário aluno terá um papel importante no sistema, este usuário poderá utilizar o sistema para acompanhar o projeto ou os projetos que ele faz parte, permitindo que ele entregue artefatos e atividades, ou cadastre caso ele seja o gerente do projeto. |
| Professor | O perfil de usuário professor poderá ter acesso a todos os projetos que foram criados por ele. Este tipo de acesso permite que o usuário possa fazer a atribuição de tarefas para os membros do projeto, analisar entregas de artefatos e atividades, assim como atribuir pontuações e penalidades. Além disso, este usuário terá acesso a um grupo diverso de métricas gerados pelo sistema, como relatórios de desempenho gerais e individuais relacionados aos módulos do sistema. |

## Lista de Requisitos Funcionais e Não Funcionais
### Requisitos Funcionais

| Requisito       | Descrição                                                                                                      |
|-----------------|----------------------------------------------------------------------------------------------------------------|
| **RF01 - Manter usuário:**           | O sistema deve possuir um módulo de autenticação e autorização para seu uso. Neste módulo o sistema deve permitir a inserção, consulta, seleção, autenticação e autorização dos usuários. |
| **RF02 - Manter Projeto:**           | O sistema deve permitir o cadastro, alteração, seleção, consulta e visualização dos projetos dos alunos. |
| **RF03 - Manter Fluxo de desenvolvimento:** | O sistema deve permitir o cadastro, alteração e visualização de um novo fluxo de desenvolvimento para cada projeto. |
| **RF04 - Manter Etapa:**             | O sistema deve permitir que no momento do cadastro do fluxo de desenvolvimento ou após a sua criação, seja possível vincular (cadastrar) as etapas do processo de desenvolvimento, assim como sua alteração, seleção, visualização e exclusão. |
| **RF05 - Manter Membro:**            | O sistema deve permitir o cadastro de cada membro da equipe, assim como sua alteração, visualização e exclusão. |
| **RF06 - Manter Equipe:**            | O sistema deve permitir o cadastro da equipes responsável pelo projeto, bem como sua alteração, visualização e exclusão. |
| **RF07 - Manter Coordenador:**       | O sistema deve oferecer a opção de cadastrar um novo coordenador ou vários coordenadores para cada projeto, assim como permitir sua alteração, seleção e visualização. |
| **RF09 - Manter Artefato:**          | O sistema deve permitir o cadastro de artefatos para cada etapa do fluxo de desenvolvimento, assim como a alteração, seleção, visualização e exclusão dos artefatos. |
| **RF10 - Manter Atividade:**         | O sistema deve permitir o cadastro, alteração, seleção, visualização e exclusão de atividades ao longo das etapas do projeto. |
| **RF11 - Manter Plano de Iteração e Plano de \emph{Release:}** | O sistema deve permitir o cadastro, visualização, alteração e exclusão do plano de iteração e plano de release. |
| **RF12 - Integração com o GitHub:** | O sistema deve permitir a integração do projeto com o repositório do GitHub que contém o código desenvolvido ao longo do fluxo de desenvolvimento. |
| **RF13 - Integração com o APF:**    | O sistema deve permitir a integração do projeto com o software de Análise de Ponto de Função. |
| **RF14 - Integração com o sistema da Monitoria do BSI:** | O sistema deve permitir a integração com o Sistema da Monitoria do BSI. |
| **RF15 - Emissão de relatórios:**   | O sistema deve ser capaz de criar relatórios sobre o desempenho da equipe como um todo e de cada membro individualmente. |
| **RF16 - Dashboard de métricas:**   | O sistema deve gerar um painel (dashboard) com gráficos e figuras baseados nas métricas estabelecidas dentro do projeto. |
| **RF17 - Envio de notificações:**   | O sistema deve possuir um módulo de notificações, permitindo que o usuário seja notificado quando o prazo de uma tarefa estiver próximo do fim, quando uma tarefa for atribuída a ele, entre outros casos. |
| **RF18 - Cadastro de pontuação:**   | O sistema deve permitir que o coordenador atribua pontuações para cada etapa do projeto, assim como para os artefatos. |
| **RF19 - Cadastro de penalidades:** | O sistema deve permitir que o coordenador atribua penalidades para atrasos de tarefas ou não entrega de artefatos. |
| **RF20 - Comentários e discussões:** | O sistema deve permitir que os usuários adicionem comentários e participem de discussões sobre os projetos, etapas, artefatos, atividades e outras entidades relacionadas. |

### Requisitos Não Funcionais 

| Requisito | Descrição                                                                                                                             |
|-------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| **RNF1 - Funcionamento na web:**      | O sistema deve ser totalmente funcional e acessível por meio de navegadores web modernos, garantindo que os usuários possam acessá-lo de qualquer lugar, a qualquer momento, utilizando diferentes dispositivos, como computadores, laptops, tablets e smartphones. |
| **RNF02 - Plataformas suportadas:**   | O sistema deve ser compatível e capaz de rodar em ambientes Windows e Linux, garantindo a sua disponibilidade em diferentes sistemas operacionais. |
| **RNF03 - Alta disponibilidade:**     | O sistema deve possuir alta disponibilidade, garantindo que esteja acessível e operacional a maior parte do tempo, minimizando interrupções e tempo de inatividade não planejado. |
| **RNF04 - Conformidade legal:**       | O sistema deve estar em conformidade com as normas legais e regulamentações aplicáveis, garantindo que as operações realizadas no sistema estejam de acordo com as leis vigentes. |
| **RNF05 - Privacidade dos dados:**     | Os dados dos clientes devem ser tratados de forma privada e confidencial, seguindo as melhores práticas de segurança da informação, protegendo a integridade, confidencialidade e disponibilidade desses dados. |
| **RNF06 - Desempenho:**               | O sistema deve ter um desempenho adequado, respondendo de forma rápida e eficiente às solicitações dos usuários, mesmo em situações de alta carga de trabalho. |
| **RNF07 - Escalabilidade:**           | O sistema deve ser capaz de lidar com um aumento na demanda de usuários e volume de dados, permitindo a escalabilidade horizontal ou vertical da infraestrutura, conforme necessário. |
| **RNF08 - Segurança:**                | O sistema deve adotar medidas de segurança robustas, incluindo autenticação, autorização, criptografia de dados sensíveis, garantindo a integridade e confidencialidade do sistema e dos dados. |
| **RNF09 - Integração com outros sistemas:** | O sistema deve ser capaz de integrar-se com outros sistemas ou serviços externos. |
| **RNF10 - Usabilidade:**              | O sistema deve ser intuitivo e fácil de usar, proporcionando uma experiência agradável para os usuários. |
| **RNF11 - Tolerância a falhas:**      | O sistema deve ser capaz de lidar com falhas de forma adequada, minimizando o impacto para os usuários, recuperando-se de falhas de forma rápida e mantendo a integridade dos dados. |
| **RNF12 - Manutenibilidade:**         | O sistema deve ser projetado de forma modular e seguindo boas práticas de programação, facilitando a manutenção, evolução e correção de problemas ao longo do tempo. |
| **RNF13 - Documentação:**             | O sistema deve ser acompanhado de documentação clara e atualizada, descrevendo sua arquitetura, funcionalidades, configurações e procedimentos de uso. |
| **RNF14 - Responsividade:**           | O sistema deve ser responsivo, adaptando-se adequadamente a diferentes dispositivos e tamanhos de tela, garantindo uma experiência consistente em dispositivos móveis, tablets e computadores de mesa. |
| **RNF15 - Capacitação e suporte:**     | O sistema deve contar com recursos de capacitação e suporte aos usuários, como documentação de ajuda, tutoriais, treinamentos e suporte técnico, visando facilitar o uso correto e eficiente do sistema. |

## Riscos do Sistema

| ID  | Risco                                     | Descrição                                                                                                 | Impacto                  | Probabilidade | Severidade | Ação de Mitigação                   |
|-----|-------------------------------------------|-----------------------------------------------------------------------------------------------------------|--------------------------|--------------|------------|-------------------------------------|
| R01 | Falha na integração com sistemas externos | Dificuldade em estabelecer conexões estáveis e eficientes com sistemas externos.                        | Atraso nas funcionalidades | Média        | Alta       | Realizar testes rigorosos de integração e ter planos de contingência.                          |
| R02 | Falha na segurança dos dados              | Vulnerabilidades de segurança que podem levar a vazamentos de dados sensíveis.                         | Risco de penalizações    | Alta         | Alta       | Implementar medidas de segurança, criptografia e monitoramento constante.                      |
| R03 | Mudanças frequentes nos requisitos         | Requisitos em constante mudança, levando a retrabalho e confusão na equipe.                             | Atraso no desenvolvimento | Alta         | Média      | Estabelecer um processo sólido de gerenciamento de mudanças e envolver stakeholders chave.   |
| R04 | Indisponibilidade de recursos chave        | Ausência de membros da equipe-chave ou falta de recursos técnicos necessários para o desenvolvimento. | Atraso no desenvolvimento | Média        | Alta       | Cross-training da equipe e planejamento cuidadoso para alocar recursos de maneira eficiente. |
| R05 | Problemas de desempenho do sistema         | Lentidão ou falhas no sistema durante picos de uso, afetando a experiência do usuário.                | Impacto na usabilidade   | Média        | Alta       | Realizar testes de carga e otimização do sistema, escalonando recursos conforme necessário. |
| R06 | Falta de alinhamento com os stakeholders   | Desalinhamento entre as expectativas dos stakeholders e as entregas do projeto.                       | Insatisfação dos usuários | Média        | Alta       | Manter comunicação regular com os stakeholders, realizar revisões e ajustes frequentes.      |

Desenvolvido por: Joan de Azevedo Medeiros. 
