// Dodanie przedmiotu do koszyka, przejście do koszyka i przejście do zamówienia
describe('find and buy one album', () => {
  const searchPhrase : string = "Revo";
  const expectedId : number = 3;

  beforeEach(() => {
    cy.viewport(1920, 1080);
  });

  it('use search bar, pick first result, go to details page, ' +
          'add to basket, check basket, complete checkout', () => {
    cy.visit("localhost:4200/");
    cy.url().should("contain", "/products");
    cy.get("input[name=searchBar]").type(searchPhrase);
    cy.contains("Szukaj").click();

    cy.wait(10000);
    cy.contains(searchPhrase).click();
    cy.url().should("contain", `/products/${expectedId}`);

    cy.contains("Dodaj do koszyka").click();
    cy.contains("Dodaj do koszyka").click();
    cy.contains("PLN105.98").click();
    cy.url().should("contain", "/cart-details");
    cy.contains(searchPhrase);

    cy.contains("Złóż zamówienie").click();
    cy.url().should("contain", "/checkout");
  });
})
