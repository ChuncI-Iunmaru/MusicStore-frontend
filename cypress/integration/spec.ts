// Scenariusze:

// Rejestracja konta kupca
describe('register account', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
  });

  it('should find form button, fill form and register new user', () => {
    cy.visit("localhost:4200/");
    cy.url().should('contain', '/products');
    cy.contains('Zaloguj').click();
    cy.url().should('contain', '/login');
    cy.contains("Zarejestruj się").click();

    cy.wait(10000);
    cy.get('input[name=email]').type("cypress@test.com");
    cy.get('input[name=password]').type("c12345678");
    cy.get('input[name=firstName]').type("Cypress");
    cy.get('input[name=lastName]').type("Testowy");
    cy.get('input[value=Zarejestruj]').click();

    cy.wait(10000);
    cy.url().should('contain', '/products');
    cy.contains("Cypress");

    cy.contains('Wyloguj').click();
    cy.url().should('contain', '/products');
  });
})

// Logowanie jako pracownik
// Logowanie jako kupiec
// Wyszukiwanie przedmiotu i przejście do jego detali
// Dodanie przedmiotu do koszyka, przejście do koszyka i przejście do zamówienia
