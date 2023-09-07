# Antes de tudo pensar em rodar o projeto.


Primeiramente você tera que clonar o repositorio

    git clone https://github.com/MatheusRFilho/teste_shopper.git


Para rodar o projeto você tera que ter instalado na sua maquina o nodeJs, um gerenciador de pacotes (npm ou yarn) recomando o yarn e um editor de texto de sua preferencia.

Nota importante: tanto o backend quanto o frontend estão no mesmo repositorio então lembre se entrar nas pastas corretas.

Nota 2: Lembre-se tambem que você terá que rodar os projetos em terminais separados.

# Como rodar o backend

Abra o repositorio no seu editor de texto de preferencia.
Apos clonar o repositorio entre na pasta do projeto via terminal e digite o comando:

    cd backend
Como pode ver na imagem abaixo existe um arquivo chamado .env.example duplique ele, renomeie para apenas .env e apos isso coloque as configurações do seu banco de dados local ou do seu servidor.
![Texto alternativo da imagem](https://github.com/MatheusRFilho/teste_shopper/raw/master/images/image1.png)

Apos isso rode o comando para instalar as dependencias do projeto:

    yarn
ou caso se preferir:

    npm install

Apos instalar as dependecias rode o comando:

    yarn build
  
  ou caso preferir:
  

    npm run build
Apos transpilar para Js os arquivos rode o comando para inicializar o projeto

    yarn start
  
  ou caso preferir:
  

    npm run start
e pronto o backend estará rodando.
# Como rodar o Frontend

Apos clonar o repositorio entre na pasta do projeto via terminal e digite o comando:

    cd frontend

Apos isso rode o comando para instalar as dependencias do projeto:

    yarn
ou caso se preferir:

    npm install

Apos instalar as dependecias  rode o comando para inicializar o projeto

    yarn start
  
  ou caso preferir:
  

    npm run start
e pronto o frontend estará rodando.
