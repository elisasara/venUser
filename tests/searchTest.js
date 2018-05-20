var expect = require("chai").expect;
var search = require("../public/js/venueSearch.js");

describe("Search", function() {
    it("should return an object listing all of the venues that match the search parameters", function(){
        expect(search().to.equal());
    });
})