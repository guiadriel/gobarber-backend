# Configurando o NodeJS com typescript do zero
```
$ yarn init -y
$ yarn add express
```

## Tipescript

Adicionando módulo do typescript em desenvolvimento.

Todos os arquivos do typescript são no formato ts ou tsx
```
$ yarn add typescript -D
```

Geração do arquivo tsconfig.json onde serão salvas todas as definições do typescript dentro do projeto
```
$ yarn tsc --init
```

### tsconfig.json
- outDir: "./dist"
- rootDir: "./src"

Sempre lembrar de verificar os @types/NOME_DA_DEPENDENCIA em dev "-D"


### package.json
scripts
- build: "tsc"
- dev:server "ts-node-dev --inspect --transpileOnly --ignore-watch node_modules src/server.ts "

> --transpileOnly o vscode já vai fazer a identificação dos erros, não precisamos que o ts-node-dev faça isso
> --inspect permite que o vscode se conecte com a aplicação


> --ignore-watch node_modules ignorar o acesso do tsc a pasta de node_modules pois nunca estaremos editando arquivos nessa pasta

Instalando o ts-node-dev
Obs: o ts-node-dev faz o papel do TSC para converter e faz o papel do nodemon para atualizar o código de forma automática
```
$ yarn add ts-node-dev -D
```

### launch.json
> configurations
  - request: attach
  - restart: true

### eslint

```
$ yarn add eslint@6.8.0 -D
```

yarn eslint --init

1. To check syntax, find problems, and enforce code style
2. JavaScript modules (import/export)
3. None of these
4. y (use typescript)


###
  Dominio: Organização via aŕea de conhecimento daquele módulo/arquivo

src
  config
  database
  errors
  middlewares
  models
  repositories
  routes
  services

## DDD: Domain Driven Design (metodologia)
  Patterns pra você utilizar somente dentro do backend

  Separa regra de negócio da camada de infra.
  Camada de infra: Ferramentas que a gente escolhe




  Infra:
    > Banco de dados
    > Express
    > Decisões técnicas da aplicação




## TDD: Test Driven Development (metodologia)
  Criar testes antes sde criar a funcionalidade em sí


## tsconfig.json
"paths": {

}


Injeção de dependências

yarn add tsyringe


## Testes automatizados
Nossa aplicação continue funcionando independente do número de novas funcionalidades
e do numero de devs no time.

1. Testes unitários ( TDD )
  Testam funcionalidades específicas da nossa aplicação ( precisam ser funções puras).
    JAMAIS: Chamada à uma API,
    JAMAIS: sem efeitos colaterais ( Ex: não deve ser envio de emails )
    !!! Só depende de coisas da nossa própria aplicação


2. Testes de integração ( Prova )
  Testam uma funcionalidade completa passando por várias camadas da aplicação
  Ex: (Teste na funcionalidade de criação de usuário)
    > Route -> Controller -> Serviço -> Repositório -> Serviço -> Controller -> Route


3. Testes E2E (End to End)
  Simulam a ação do usuário dentro da nossa aplicação
   1. Clique no input de email
   2. Preencha guilherme@teste.com.br
   3. Clique no input de senha
   4. Preencha 123456
   5. Clique no botão "Logar"
   6. Espero que a página tenha enviado o usuário para o dashboard


## TDD ( Test Driven Development )
  Criar os testes antes de criar a funcionalidade na aplicação.
    > No teste você diz qual é o funcionamento que você espera da funcionalidade.
    > Se você já tem um teste que garante um jeito específico pra quando desenvolver
    > essa funcionalidade você tem uma bússola.



```
yarn add jest -D
yarn add ts-jest -D
jest.config.js >> {
  ...
  preset: 'ts-jest',
}
.eslintrc.json >> {
  env : {
    ...
    jest: true
  }
}
```


## Definindo funcionalidades

**RF** (Requisitos funcionais)
**RNF** (Requisitos não funcionais)
**RN** (Regra de negócio)

MACRO
 - Recuperação de senha
   **RF**
    - O usuário deve poder recuperar a senha informando o seu email;
    - O usuário deve receber um e-mail com instruções de recuperação de senha;
    - O usuário deve poder resetar sua senha;

   **RNF**
    - Utilizar Mailtrap para testar envios em dev;
    - Utilizar o Amazon SES para envios em produção;
    - O envio de e-mails deve acontecer em segundo plano (background job);

   **RN**
    - O link enviado por email para resetar senha deve expirar em 2h;
    - O usuário precisa confirmar a nova senha ao resetar a senha anterior;

 - Atualização do perfil
   **RF** 
    - O usuário deve poder atualizar seu nome, email e senha;
   **RN**
    - O usuário não pode alterar seu email para um e-mail já utilizado;
    - Para atualizar sua senha, o usuário deve informar a senha antiga;
    - Para atualizar sua senha, o usuário precisa confirmar a nova senha;
 
 - Painel do prestador
   **RF** 
    - O usuário deve poder listar seus agendamentos de um dia específico;
    - O prestador deve receber uma notificação sempre que houver um novo agendamento;
    - O prestador deve poder visualizar as notificações não lidas;

   **RNF** 
    - Os agendamentos do prestador no dia deve ser armazenados em cache;
    - As notificações do prestador devem ser armazenadas no MongoDB;
    - As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;
   **RN**
    - A notificação deve ter um status de lida ou não lida para que o prestador possa controlar;

 - Agendamento de serviços
   **RF** 
    - O usuário deve poder listar todos prestadores de serviços cadastrados;
    - O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
    - O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
    - O usuário deve poder realizar um novo agendamento com um prestador;
   **RNF** 
    - A listagem de prestadores deve ser armazenada em cache; 
   **RN**
    - Cada agendamento deve durar 1h exatamente;
    - Os agendamentos devem estar disponíveis entre 8h às 18h ( Primeiro às 8h, último as 17h );
    - O usuário não pode agendar em um horário já ocupado;
    - O usuário não pode agendar em um horário que já passou;
    - O usuário não pode agendar serviços consigo mesmo;


// RED > Primeiro der erro
// GREEN > Enviar o email
// BLUE > Refactor o codigo 


1. Rotas e controllers
2. Repositório de tokens (TypeORM)
3. Criar migration de tokens
4. Provider de envio de e-mail (DEV)
5. Register providers no container
6. Testar tudo!
7. 