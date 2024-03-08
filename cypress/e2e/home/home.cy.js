/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("HomePage", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays home page properly", () => {
    cy.contains("Home");
    cy.contains("Login");
    cy.contains("Where are you going?");
    cy.contains("When will you go?");
    cy.get(".grid").should("exist");
    cy.get("img").should("have.length", 12);
    cy.contains("This is the room of Hotel Brazil-1");
    cy.contains("This is the room of Hotel Argentina-4");
  });

  it("should go to login page", () => {
    cy.get("a").contains("Login").click();
    cy.url().should("eq", "http://localhost:3000/login");
  });

  it("should not to be able to access booking page without login", () => {
    cy.visit("/bookings");
    cy.url().should("eq", "http://localhost:3000/");
  });

  it("should not be able to access manage-booking page without login", () => {
    cy.visit("/manage-booking/10");
    cy.url().should("eq", "http://localhost:3000/");
  });

  it("should receive an error message when try to access checkout page without a cookie booking", () => {
    cy.visit("/booking-checkout");
    cy.contains("First you need to:");
    cy.contains("Select a place");
    cy.contains("Select the dates: Check-in and Check-out");
    cy.contains("Select the room");
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
    cy.contains("Cancel").should("not.be.disabled");
    cy.contains("Please, do login to continue!");
    cy.contains("Cancel").click();
    cy.url().should("eq", "http://localhost:3000/");
  });
});
