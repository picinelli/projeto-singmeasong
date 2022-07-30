// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { faker } from "@faker-js/faker";


Cypress.Commands.add("resetDatabase", () => {
  cy.request("DELETE", "http://localhost:5000/recommendations/delete").as(
    "resetDatabase"
  );
});

Cypress.Commands.add("createRecommendation", () => {
  const recommendation = {
    name: faker.lorem.lines(1),
    youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
  };
  cy.visit("http://localhost:3000/");

  cy.get("#name").type(recommendation.name);
  cy.get("#youtubeLink").type(recommendation.youtubeLink);

  cy.intercept("POST", "/recommendations").as("createRecommendation");
  cy.get("#createRecommendation").click();
  cy.wait("@createRecommendation");
});
