var router = express.Router();

var review = require("../models/post.js")

var venueSearch = require("../public/js/venue.js");



module.exports = function(app) {

    router.get("/venues", function(req, res){

    })

    router.get("/venues/:id", function(req, res){
        review.findAll(function(data){
            {where: venue_id = req.params.id}
            var reviewObj = {
                reviews: data
            };
            console.log(reviewObj);
            res.render("venue", reviewObj);
        });
    });

    router.post("/api/venues", function(req, res){
        review.create([
            "author name", "review"
        ], [
            req.body.name, req.body.review
        ], function(result){
            res.json({ id: result.insertId });
        });
    });


}