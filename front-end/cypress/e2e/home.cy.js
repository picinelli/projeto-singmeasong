/// <reference types="cypress" />

import { faker } from "@faker-js/faker";

beforeEach(() => {
  cy.resetDatabase();
});

describe("should create new recommendation", () => {
  it("given random name with youtube URL, should create new recommendation", () => {
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

    cy.contains(`${recommendation.name}`).should("be.visible");
  });

  it("Should fail to create recommendation with same name", () => {
    const stub = cy.stub() 
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

    cy.intercept("POST", "/recommendations").as("createRecommendation");
    cy.on ('window:alert', stub)
    cy.get("#createRecommendation").click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Error creating recommendation!')
    })
    cy.wait("@createRecommendation");
  })
});

describe("should upvote and downvote onclick | HOME", () => {
  it("should upvote successfully", () => {
    cy.visit("http://localhost:3000/");
    const recommendation = {
      name: faker.lorem.lines(1),
      youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
    }

    cy.request("POST", "http://localhost:5000/recommendations", recommendation)
    cy.request("GET", "http://localhost:5000/recommendations", recommendation).its("body").then((body) => {
      const id = body[0].id

      cy.intercept("POST", `/recommendations/${id}/upvote`).as("upVote");
      cy.get("#upVote").click();
      cy.wait("@upVote");
    })

  });

  it("should downvote successfully", () => {
    cy.visit("http://localhost:3000/");
    const recommendation = {
      name: faker.lorem.lines(1),
      youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
    }

    cy.request("POST", "http://localhost:5000/recommendations", recommendation)
    cy.request("GET", "http://localhost:5000/recommendations", recommendation).its("body").then((body) => {
      const id = body[0].id

      cy.intercept("POST", `/recommendations/${id}/downvote`).as("downVote");
      cy.get("#downVote").click();
      cy.wait("@downVote");
    })

  });
});
