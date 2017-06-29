var mongoose = require("mongoose");
var Favmovdetails = require('../models/schemafav.js')
var request = require('request');

var movielist = {
    /*searching films*/
    search: function(req, res, next) {
        var moviename = req.params.index;
        request.get('https://api.themoviedb.org/3/search/movie?api_key=7aebafe32b82c7ee36fd33d30d8491a1&language=en-US&query=' + moviename + '&page=1&include_adult=false', function(err, response, body, data) {

            if (response.statusCode == 200) {

                res.json(JSON.parse(response.body));
            } else {
                res.send("error");
            }
        });

    },
    /*favorite films added in the database*/
    add: function(req, res, next) {
        var data = JSON.parse(req.body.data_got);
  var favmovie = {
                title: data.title,
                poster: data.poster,
                release_date: data.release_date,
                username:req.body.username
            }
        /*inserting favourite movies into the database*/
        var db = new Favmovdetails(favmovie);
        db.save(
            function(err, data) {
                if (err)
                    throw err;
                else {
                    res.send(data);
                }

            });

    },
    view: function(req, res, next) {
        Favmovdetails.find({"username":req.query.username},function(err, data) {
            if (err)
                throw err;
            else {
                res.send(data);
            }

        });

    },
    /*movie will be deleted by the title name*/
    delete: function(req, res, next) {

        var title = req.query.title;

        Favmovdetails.remove({
            title: title,
            username:req.query.username
        }, function(err, data) {
            if (err)
                throw err;
            else {
                res.send("success");
            }

        });
    }
}
module.exports = movielist;