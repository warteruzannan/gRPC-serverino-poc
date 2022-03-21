## gRPC - Severino POC

### Executando o projeto

1. Instale as depndências `yarn install`
2. Execute o gRPC server: `yarn start:server`
3. Execute o gRPC client: `yarn start:client`

### Validar um usuário:

Faça uma requisição para o cliente com o usuário a ser validado. 
Essa requisição será recebida pelo server HTTP e fará uma chamada para o server gRPC. 


```
curl --location --request POST 'http://localhost:4000/' \
--header 'Content-Type: application/json' \
--data-raw '{"email": "warteruzannan@gmail.com"}'
```

A resposta será:

```
{"validations":[{"fieldName":"email","ratio":0.47489792108535767,"valid":false}]}
```

<img src="./severino.jpg">
