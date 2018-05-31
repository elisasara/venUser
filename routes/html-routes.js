var express = require("express");
var app = express();
var db = require("../models")

module.exports = function(app) {

    app.get("/", function (req, res) {
        res.render("index");
    });
};
