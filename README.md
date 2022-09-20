# SISTEMA REPO PROVAS

## Inicialização

O sistema será montado a partir do comando `npm i`, que fará a instalação das bibliotecas e dependências do projeto.

## Testes Thunder Client

Os arquivos de testes de casos de sucesso (_casos felizes_) estão disponíveis nos arquivos _thunderclient\_\*_:

- O arquivo _thunderclient-environment\_\*_ define variáveis de ambiente, que definem as rotas e outros dados importantes dos testes.
- O arquivo é _thunderclient_collection\_\*_ define os testes que serão executados.

## Testes jest

Os testes pela biblioteca jest podem ser executados através do comando `npm run test`, estes cobrem tanto casos de sucesso quanto de erro, e possuem um banco de dados de teste populado com dados válidos porém aleatórios.

O tamanho do banco é definido pela constante `SAMPLE_SIZE` localizado no arquivo `./databases/seed.ts`;

As rotas testadas podem ser encontrados na rota [/docs](http://localhost:4000/docs) na porta definida pelo arquivo de variáveis de ambiente `(Padrão: 4000)` ou pelo endereço do deploy [heroku/docs](https://repoprovas-api-ts.herokuapp.com/docs)
