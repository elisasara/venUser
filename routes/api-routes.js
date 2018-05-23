require('dotenv').config();
var db = require("../models");
var request = require("request");

module.exports = function(app){
   app.get("/api/reviews", function(req, res){
       db.Review.findAll({}).then(function(data){
           res.json(data);
       });
   });

   app.get("/api/review/:id", function(req, res){
       db.Review.findOne({
           where: {
               venue_id: req.params.id 
           }
       }).then(function(data){
           res.json(data);
       });
   });

   app.post("/api/retrievelist", function(req, res){
    var searchResults = [];
    request({
        url: "https://api.foursquare.com/v2/venues/search",
        method: "GET",
        qs: {
            client_id: process.env.fourSquare_API_client_id,
            client_secret: process.env.fourSquare_API_client_secret,
            near: "Philadelphia, PA",
            query: "Fillmore",
            v: 20180515,
            limit: 10
        },
    }, function (err, response, body) {
        if (err) {
            console.log(err);
        }
        var venues = JSON.parse(body);
        var venueInfo = venues.response.venues;
        for (var i = 0; i < venueInfo.length; i++) {
            // create object for diplaying info in handlebars
            var eachResult = {
                id: venueInfo[i].id,
                name: venueInfo[i].name,
                address: venueInfo[i].location.address,
                city: venueInfo[i].location.city,
                state: venueInfo[i].location.state,
                zip: venueInfo[i].location.postalCode
            }
            // push each object into the array
            searchResults.push(eachResult);
        };
        console.log(searchResults);
        console.log(searchResults.length);
        // res.redirect()
        res.render("results", {venue: searchResults, test: searchResults[0] });
    });

   });

   //post route to send reviews to database status: working =)

   app.post("/api/reviews", function(req, res){
       db.Review.create(req.body).then(function(data){
           res.json(data);

       });
   }); 

};

