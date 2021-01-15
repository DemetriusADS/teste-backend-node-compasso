# Desafio Técnico NodeJS - Compasso Uol

Neste desafio, eu não optei por não me aprofundar muito na aplicação, como, por exemplo, não adicionar os métodos para apagar ou alterar os Estados ou cidades. Optei por seguir o conselho dado nas instruções do desafio, e para ajudar na execução do projeto, criei um passo a passo para executar e testar o projeto.
Espero que gostem e estou a disposição para tirar qualquer dúvida.

---

## Tecnologias utilizadas

- NodeJS 14.13.0
- ExpressJS 4.17.1
- Typescript 3.3.3333
- TypeORM 0.2.29
- PostgresSQL

---

## Iniciando o Projeto

Certifique-se que você possui o PostgreSQL instalado e rodando em Docker ou normalmente no sistema.

No Terminal, dentro da pasta raiz do projeto, executar o comando:
`yarn` ou `npm i`

Depois, executar as **migrations**, com o comando:
`yarn typeorm migration:run` ou `npm run typeorm migration:run`

E por fim, executar o projeto:
`yarn dev:server` ou `npm run dev:server`

---

## Insomnia:

_Na raiz do projeto, há um arquivo chamado Insomnia_import_2021-01-12.json._

Este arquivo é para ser importado no Insomnia. Nele contém todas as rotas a serem testadas na API.
[image:04025B6E-0053-4EB1-8CFC-989440529255-846-00000157EB71EB40/Screen Shot 2021-01-15 at 10.11.07.png]

Na aba de query, nos requests **GET**, **PUT**, **DELETE**, há os query params disponíveis para serem enviados aos endpoints.

---

## Arquitetura utilizada

Optei por utilizar a arquitetura DDD (Domin Driven Development).
Separei a aplicação em três domínios: Clients, Cities, States; pertencentes aos módulos. Há também uma pasta para configurações gerais, onde se encontram as Interfaces e uma pasta Shared, onde se encontram classes, métodos e configurações comuns a todos os domínios da aplicação.

Dentro dos módulos, há as pastas:

- **Controllers:** onde ficam os arquivos de controllers, responsáveis por receber as requisições e direcionar para os métodos dos services e retornar uma resposta.
- **Infra:** onde ficam os arquivos responsáveis pelas rotas (pasta http) e os arquivos responsáveis pelo ORM utilizado, neste caso, typeorm;
- **Services:** aqui, é onde ficam as classes responsáveis pela regra de negócio da aplicação.
