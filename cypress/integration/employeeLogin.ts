// Logowanie jako pracownik
describe('employee login', () => {
  const employeeLogin: string = "testprac@test.com";
  const employeePassword: string = "pracownik"
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
    cy.get("input[name=username]").type(employeeLogin);
    cy.get("input[name=password]").type(employeePassword);
    cy.get("input[type=Submit]").click();

    cy.wait(10000);
    cy.url().should('contain', '/products');
    cy.contains("Pracownik");
  });

  it("should show error", () => {
    cy.visit("localhost:4200/");
    cy.url().should("contain", "/products");
    cy.contains("Zaloguj").click();
    cy.url().should("contain", "/login");

    cy.wait(10000);
    cy.get("input[name=username]").type(employeeLogin);
    cy.get("input[name=password]").type(wrongPassword);
    cy.get("input[type=Submit]").click();

    cy.wait(10000);
    cy.contains("Nie można się zalogować");
  });
})
