// Logowanie jako kupiec
describe('customer login', () => {
  const customerLogin: string = "testkup@test.com";
  const customerPassword: string = "kupieckupiec"
  const wrongPassword: string = "tojestnieprawidlowehaslo"

  beforeEach(() => {
    cy.viewport(1920, 1080);
  });

  it("should redirect to products page", () => {
    cy.visit("localhost:4200/");
    cy.url().should("contain", "/products");
    cy.contains("Zaloguj").click();
    cy.url().should("contain", "/login");

    cy.wait(10000);
    cy.get("input[name=username]").type(customerLogin);
    cy.get("input[name=password]").type(customerPassword);
    cy.get("input[type=Submit]").click();

    cy.wait(10000);
    cy.url().should('contain', '/products');
    cy.contains("Kupiec");
  });

  it("should show error", () => {
    cy.visit("localhost:4200/");
    cy.url().should("contain", "/products");
    cy.contains("Zaloguj").click();
    cy.url().should("contain", "/login");

    cy.wait(10000);
    cy.get("input[name=username]").type(customerLogin);
    cy.get("input[name=password]").type(wrongPassword);
    cy.get("input[type=Submit]").click();

    cy.wait(10000);
    cy.contains("Nie można się zalogować");
  });
})
