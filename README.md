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
 
 - Painel do prestador
 - Agendamento de serviços
 