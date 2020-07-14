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
