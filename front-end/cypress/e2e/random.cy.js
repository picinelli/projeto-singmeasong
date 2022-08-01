/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

beforeEach(() => {
  cy.resetDatabase();
});

describe("should upvote and downvote onclick | RANDOM", () => {
  it("should upvote successfully", () => {
    const recommendation = {
      name: faker.lorem.lines(1),
      youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
    }
    cy.request("POST", "http://localhost:5000/recommendations", recommendation)
    cy.visit("http://localhost:3000/random");

    cy.request("GET", "http://localhost:5000/recommendations/random", recommendation).its("body").then((body) => {
      console.log(body)
      const id = body.id

      cy.intercept("POST", `/recommendations/${id}/upvote`).as("upVote");
      cy.get("#upVote").click();
      cy.wait("@upVote");
    })

  });

  it("should downvote successfully", () => {
    const recommendation = {
      name: faker.lorem.lines(1),
      youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
    }
    cy.request("POST", "http://localhost:5000/recommendations", recommendation)
    cy.visit("http://localhost:3000/random");

    cy.request("GET", "http://localhost:5000/recommendations/random", recommendation).its("body").then((body) => {
      console.log(body)
      const id = body.id

      cy.intercept("POST", `/recommendations/${id}/downvote`).as("downVote");
      cy.get("#downVote").click();
      cy.wait("@downVote");
    })

  });
});
