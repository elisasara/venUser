var expect = require("chai").expect;
// update to js file that has post ajax call
var postReview = require("../public/js/venueSearch.js");

describe("postReview", function() {
    it("should take the fields from the form and create a new review in the database", function(){
        expect(postReview().to.equal());
    });
})