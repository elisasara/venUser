var router = express.Router();

var review = require("../models/post.js")

module.exports = function(app) {
    router.get("/venues", function(req, res){
        review.all(function(data){
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