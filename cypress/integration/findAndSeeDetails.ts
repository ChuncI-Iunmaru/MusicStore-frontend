// Wyszukiwanie przedmiotu i przejście do jego detali
describe('find product, go to details, check recommendations', () => {
  const searchPhrase : string = "Revo";
  const expectedId : number = 3;
  const expectedTitle : string = "London Calling"
  const expectedNewId : number = 8;

  beforeEach(() => {
    cy.viewport(1920, 1080);
  });

  it('use search bar, pick first result, go to details page, click recommendations', () => {
    cy.visit("localhost:4200/");
    cy.url().should("contain", "/products");
    cy.get("input[name=searchBar]").type(searchPhrase);
    cy.contains("Szukaj").click();

    cy.wait(10000);
    cy.contains(searchPhrase).click();
    cy.url().should("contain", `/products/${expectedId}`);

    cy.contains(expectedTitle).click();
    cy.url().should("contain", `/products/${expectedNewId}`);
  });
})
