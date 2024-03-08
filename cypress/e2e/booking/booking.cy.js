describe("Booking", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should create a booking and redirect to checkout page", () => {
    // fill the forms
    cy.get("#country").type("Brazil");
    cy.contains("This is the room of Hotel Brazil-1").click();
    cy.get("input[placeholder='Select the dates']").type(
      "2024-01-01 2024-01-02"
    );

    cy.contains("Total: $319.00").should("exist");
    cy.contains("Continue").click();
    cy.url().should("eq", "http://localhost:3000/booking-checkout");
    cy.contains("Your Booking").should("exist");
    cy.contains("Confirm").should("be.disabled");
    // cy.contains("Cancel").should("not.be.disabled");
    // cy.contains("Please, do login to continue!");
    // cy.contains("Cancel").click();
    // cy.url().should("eq", "http://localhost:3000/");
  });
});
