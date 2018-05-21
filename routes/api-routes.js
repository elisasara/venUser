var db = require("../models");

module.exports = function(app){
   app.get("/api/reviews", function(req, res){
       db.Review.findAll({}).then(function(data){
           res.json(data);
       });
   });

   app.get("api/review/:id", function(req, res){
       db.Review.findOne({
           where: {
               venue_id: req.params.id 
           }
       }).then(function(data){
           res.json(data);
       });
   });

   //post route to send reviews to database status: working =)

   app.post("/api/reviews", function(req, res){

       db.Review.create(req.body).then(function (dbReview) {
         console.log("sent data to database");
           res.json(dbReview);
       });
   }); 

};

