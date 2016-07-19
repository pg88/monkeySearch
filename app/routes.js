var express = require('express');
var Twitter = require('twitter-node-client').Twitter;


var error = function (err, response, body) {
    console.log('ERROR [%s]', err);
};
var success = function (data) {
    return data;
};

var config = {
    consumerKey: "E12BETVdwI1MRuR5LTAYVzM3g",
    consumerSecret: "YbnfPcR1ObCcHJsuyompPAKI6uEwCqu4T855LsXKFs4Zetvjx5",
    accessToken: "199949633-HsC9RmUsqKlLrcM6qMKmSMM9Q0HphloV106g7zU5",
    accessTokenSecret: "9knGV1pw1MKD4XOeiQDYQNJg5BPpOaHihaWVwWiS239Ee",
    callBackUrl: ""
};
var twitter = new Twitter(config);

module.exports = function (app) {

    var router = express.Router();
    // api ---------------------------------------------------------------------
    // get hashtags
    app.get('/api/', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        var data = twitter.getSearch({ q: '#monkey','count': 50}, function(error, response, body){
            res.send({
                error : error
            });
        }, function(data){
            res.send({
                data :  JSON.parse(data)
            });
        });


    });
    //search over hashtags
    router.get('/api/search/:userQuery',function(req,res,next){
        if(req.params.userQuery == ''){
            res.statusCode = 404;
            return res.send('Error 404: No quote found');
        }
        res.setHeader('Content-Type', 'application/json');
        var data = twitter.getSearch({ q: req.params.userQuery,'count': 5}, function(error, response, body){
            res.send({
                error : error
            });
        }, function(data){
            res.send({
                data :  JSON.parse(data)
            });
        });
    });



    app.use('/', router);
    // application -------------------------------------------------------------
    app.get('/', function (req, res) {
        res.sendFile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });


};