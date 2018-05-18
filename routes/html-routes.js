var router = express.Router();

var review = require("../models/post.js")

var venueSearch = require("../public/js/venueSearch.js");



module.exports = function(app) {

    router.get("/venues", function(req, res){
        res.render("results", venueSearch);
    });

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
            // check these names with database
            "name_author", "category", "content"
        ], [
            req.body.name, req.body.type, req.body.review
        ], function(result){
            res.json({ id: result.insertId });
        });
    });


}