const initBooking = (place = "Brazil", date = "2024-01-01 2024-01-02") => {
  cy.get("#country").type(place);
  cy.get("input[placeholder='Select the dates']").type(date);
  const room = `This is the room of Hotel ${place}-4`;
  console.log("room", room);
  cy.contains(room).click();

  cy.contains("Total: ").should("exist");
  cy.contains("Continue").click();
  cy.url().should("eq", "http://localhost:3000/booking-checkout");
};

const doLogin = (timeout = 100) => {
  cy.get("nav").should("exist");
  cy.get("nav", { timeout }).then(($body) => {
    if ($body.text().includes("Login")) {
      cy.contains("Login").click();
      cy.get("#email").type("jhondoe@gmail.com");
      cy.get("input[type='password']").type("#Test123");
      cy.get("#login").click();
    }
  });
};
describe("Booking", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should create a booking and redirect to checkout page", () => {
    doLogin();
    initBooking();
    cy.get("#guests").type("Maria Silva Doe, Jhonatan Doe");
    cy.contains("Confirm").should("not.be.disabled");
    cy.contains("Confirm").click();
    cy.contains("My Bookings").click();
    cy.url().should("eq", "http://localhost:3000/bookings");
  });

  it("should update a booking", () => {
    cy.url().should("eq", "http://localhost:3000/");
    cy.get("nav").should("exist");
    doLogin(1000);
    cy.contains("My Bookings").click();
    cy.get("table>tbody>tr").should("have.length", 1);
    cy.contains("Manage Booking").click();
    cy.url().should("contains", "http://localhost:3000/manage-booking/");
    cy.contains(
      "Pay attention! If you want to update the destination, you must first cancel the booking, check the reimbursement policy and then create a new booking."
    ).should("exist");
    cy.get("#guests").clear().type("Maria Doe");
    cy.get("input[placeholder='Select the dates']")
      .clear()
      .type("2024-07-01 2024-07-12");
    cy.contains("Edit").should("exist").click();
    cy.contains("Booking update successfully", { timeout: 1000 }).should(
      "exist"
    );
    cy.contains("Cancel").should("exist").click();
    cy.url().should("eq", "http://localhost:3000/bookings");
  });

  it("should cancel booking", () => {
    cy.url().should("eq", "http://localhost:3000/");
    cy.get("nav").should("exist");
    doLogin(1000);
    cy.contains("My Bookings").click();
    cy.get("table>tbody>tr").should("have.length", 1);
    cy.contains("Cancel Booking").click();
    cy.contains("Confirm").click();
    cy.get("table>tbody>tr").should("have.length", 0);
  });
});
