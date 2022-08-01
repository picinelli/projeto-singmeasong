<div id="top"></div>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/picinelli/projeto-singmeasong">
    <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f399-fe0f.svg" alt="Logo" width="100">
  </a>

<h3 align="center">Projeto - Sing me a song</h3>
  <h4 align="center"> 
	🚀 Concluído! 🚀
  </h4>
  <p align="center">
    Aplicação full-stack destinada a recomendações de músicas. OBS: APENAS TESTES
    <br />
    <a href="https://github.com/picinelli/projeto-singmeasong"><strong>Código JS»</strong></a>
</div>

## Sumário

- [Introdução](#introdução)
- [Instalação](#instalação)
- [Rotas](#rotas)
- [Tecnologias Utilizadas](#tecnologias)
- [Contato](#contato)

## Introdução

Já pediu para alguém alguma recomendação de música? Chegou a hora de transformar isso em código. Este projeto tem o objetivo de construir os testes da aplicação (E2E, Integração e Unitários), **O FRONT-END e BACK-END deste projeto já estavam prontos**

## Instalação

```
git clone https://github.com/picinelli/projeto-singmeasong.git

npm install

npm start

npm run test //no back-end para executar os testes de integração

npm run test:unit //no back-end para executar os testes unitários

npx cypress open //no front-end para executar os testes E2E

```

## Rotas

- **POST** `/recommendations`
    
    Adiciona uma nova recomendação de música. A requisição tem o seguinte formato:
    
    ```json
    {
    	"name": "Falamansa - Xote dos Milagres",
    	"youtubeLink": "[https://www.youtube.com/watch?v=chwyjJbcs1Y](https://www.youtube.com/watch?v=chwyjJbcs1Y&ab_channel=Deck)"
    }
    ```
    
- **POST** `/recommendations/:id/upvote`
    
    Adiciona um ponto à pontuação da recomendação. Não espera nada no corpo.
    
- **POST** `/recommendations/:id/downvote`
    - Remove um ponto da pontuação da recomendação. Não espera nada no corpo.
    - Se a pontuação fica abaixo de -5, a recomendação deve ser excluída.
- **GET** `/recommendations`
    
    Pega todas as últimas 10 recomendações.
    
    A resposta tem o formato:
    
    ```jsx
    [
    	{
    		"id": 1,
    		"name": "Chitãozinho E Xororó - Evidências",
    		"youtubeLink": "https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO",
    		"score": 245
    	}
    ]
    ```
    
- **GET** `/recommendations/:id`
    
    Pega uma recomendação pelo seu ID.
    
    A resposta tem o formato:
    
    ```jsx
    {
    	"id": 1,
    	"name": "Chitãozinho E Xororó - Evidências",
    	"youtubeLink": "https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO",
    	"score": 245
    },
    ```
    
- **GET** `/recommendations/random`
    
    Pega uma recomendação aleatória, baseada na seguinte lógica:
    
    - **70% das vezes que baterem nessa rota**: uma música com pontuação maior que 10 deve ser recomendada aleatoriamente.
    - **30% das vezes que baterem nessa rota**: uma música com pontuação entre -5 e 10 (inclusive), deve ser recomendada aleatoriamente.
    - Caso só haja músicas com pontuação acima de 10 ou somente abaixo/igual a 10, 100% das vezes deve ser sorteada qualquer música.
    - Caso não haja nenhuma música cadastrada, deve ser retornado status 404.
    
    A resposta tem o formato:
    
    ```jsx
    {
    	"id": 1,
    	"name": "Chitãozinho E Xororó - Evidências",
    	"youtubeLink": "https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO",
    	"score": 245
    },
    ```
    
- **GET** `/recommendations/top/:amount`
    
    Lista as músicas com maior número de pontos e sua pontuação. São retornadas as top x músicas (parâmetro `:amount` da rota), ordenadas por pontuação (maiores primeiro)
    
    ```json
    [
    	{
    		"id": 150,
    		"name": "Chitãozinho E Xororó - Evidências",
    		"youtubeLink": "https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO",
    		"score": 245
    	},
    	{
    		"id": 12,
    		"name": "Falamansa - Xote dos Milagres",
    		"youtubeLink": "https://www.youtube.com/watch?v=ePjtnSPFWK8&ab_channel=CHXVEVO",
    		"score": 112
    	},
    	...
    ]
    ```


## Tecnologias
 
![Nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![ExpressJS](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Jest](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white)
![Cypress](https://img.shields.io/badge/-cypress-%23E5E5E5?style=for-the-badge&logo=cypress&logoColor=058a5e)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

<!-- CONTACT -->

## Contato

[![LinkedIn][linkedin-shield]][linkedin-url]
[![Mail][mail-shield]][mail-url]

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=blue
[linkedin-url]: https://www.linkedin.com/in/pedro-ivo-brum-cinelli//
[mail-shield]: https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white
[mail-url]: mailto:cinelli.dev@gmail.com
