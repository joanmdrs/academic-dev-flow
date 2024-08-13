# AcademicDevFlow by LABENS/UFRN
Sistema de Gerenciamento de Projetos Acadêmicos

# Pré-requisitos

A arquitetura do sistema é composta por uma API REST desenvolvida com Django e Python 3, servindo como backend. A interface da aplicação foi construída com React.js, e a comunicação com a API é gerenciada via requisições HTTP utilizando a biblioteca Axios. Para o armazenamento de dados, a aplicação utiliza o banco de dados PostgreSQL Utilizamos o Docker e docker-compose para deploy e execução no servidor. 

# Criação do Banco de Dados

Utilizamos o SGBD PostgreSQL para armazenar os dados. Você pode utilizar o **Docker** para executar o [PostgreSQL + pgAdmin](https://github.com/tacianosilva/bsi-tasks/tree/master/database/docker/postgres).

Crie o usuário de acesso ao banco de dados:

```sql
CREATE ROLE adf_user WITH
	LOGIN
	NOSUPERUSER
	NOCREATEDB
	NOCREATEROLE
	NOINHERIT
	NOREPLICATION
	CONNECTION LIMIT -1
	PASSWORD 'xxxxxx';
```

Crie o banco de dados com *Collate* `pt_BR` ([Configuração do Locale `pt_BR` no seu container](docs/dev.md)):
```sql
CREATE DATABASE adfdb_dev
    WITH
    OWNER = sc_user
    ENCODING = 'UTF8'
    LC_COLLATE = 'pt_BR.utf8'
    LC_CTYPE = 'pt_BR.utf8'
    TABLESPACE = pg_default
    TEMPLATE= template0
    CONNECTION LIMIT = -1;
```

Defina as permissions e privilégios do Usuário:
```sql
GRANT ALL PRIVILEGES ON DATABASE scdb_dev TO sc_user;
GRANT ALL ON SCHEMA public TO sc_user;
```

# Docker Deploy

```console
docker compose -f deploy.yml up --build
```
