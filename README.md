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
# Back-end - Preparando o ambiente para execução 

1. Criar o ambiente virtual com [python3-venv](https://docs.python.org/pt-br/3/library/venv.html):

```console
python -m venv venv
```

2. Ative o ambiente virtual.
   
Para ativar: ```source venv/bin/activate```.
Para desativar: ```deactivate```.

3. Prepare as variáveis de ambiente

Copie os exemplos destes arquivos no diretório raiz do projeto:

```console
cp .env.sample .env
cp path.env.sample path.env
```

4. Edite o arquivo `path.env` para informar as variáveis:
```console
export DJANGO_SETTINGS_MODULE=academic_dev_flow.settings
export PYTHONPATH=${PYTHONPATH}:/home/<seu_diretorio>/academic_dev_flow
```

5. Após editar os valores, execute os comandos:
```console
source .env
source path.env
```

## Execute o servidor do django

1. Ative o ambiente virtual e instale as depedências.
```console
source venv/bin/activate
pip install -r requirements.txt
```

Se houver modificações nos models (em models.py), execute a criação das migrações. Depois execute as migrações.
```console
python3 manage.py makemigrations app
python3 manage.py migrate
```

>Este processo deve ser executado para cada um dos apps. 

Crie um super usuário de administração do Django.

```console
python manage.py createsuperuser
```

Execute o servidor.
```console
python manage.py runserver
```

> Lembre-se: O SGBD deve estar em execução e configure o acesso no arquivo `.env`.

# Docker Deploy

```console
docker compose -f deploy.yml up --build
```
