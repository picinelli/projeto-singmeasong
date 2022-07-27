describe("should navigate through menu page options", () => {
  it("on top button click, should visit /top", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#top").click();

    cy.url().should("equal", "http://localhost:3000/top");
  });

  it("on random button click, should visit /random", () => {
    cy.visit("http://localhost:3000/");
    cy.get("#random").click();

    cy.url().should("equal", "http://localhost:3000/random");
  });

  it("on home button click, should visit /home", () => {
    cy.visit("http://localhost:3000/top");
    cy.get("#home").click();

    cy.url().should("equal", "http://localhost:3000/");
  });
});
