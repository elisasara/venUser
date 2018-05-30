var Nightmare = require("nightmare");
var expect = require("chai").expect;

describe("venUser", function() {
  // The default tests in mocha is 2 seconds.
  // Extending it to 30 seconds to have time to load the pages

  this.timeout(30000);
  it("should send user to main page", function(done) {
    // ID for the login button.
    Nightmare({ show: true })
      .goto("https://obscure-chamber-89134.herokuapp.com")
      // Enter city.
      .type("#city", "Philadelphia")
      // Enter state.
      .type("#state", "PA")
       // Enter venue.
      .type("#venue", "UNION TRANSFER")
      // Click the search submit button
      .click("#searchSubmit")
      // Evaluate the title
      .evaluate(function() {
        return document.title;
      })
      // is the title as expected?
      .then(function(title) {
        expect(title).to.equal("venUser");
        done();
      });
  })})
