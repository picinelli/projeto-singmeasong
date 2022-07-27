import { faker } from "@faker-js/faker";

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
});

beforeEach(() => {
	cy.resetDatabase();
});
