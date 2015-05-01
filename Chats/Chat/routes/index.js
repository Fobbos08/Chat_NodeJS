var express = require('express');
var router = express.Router();
var connector = require('../business/dbConnector/connector');

var counter = 0;
var publicCounter = 0;

var url = require("url");
/* GET home page. */
router.get('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
  res.render('index', { title: 'Express' });
});

var date = new Date();
var time = date.getTime();

setInterval(resetCounter, 1000);

function resetCounter()
{
    publicCounter = counter;
    counter=0;
}


router.post('/sendMessage', function(req, res) {
    counter++;
    res.header("Access-Control-Allow-Origin", "*");
    var data = require('../models/message');
    data.setMessageData(req.body.login, req.body.message);
    connector.postData(data);
    res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res) {
    counter++;
    var data = require('../models/message');
    data.setMessageData(req.body.login, req.body.message);
    connector.postData(data);
    res.render('index', { title: 'Express' });
});

router.get('/messages', function(req, res) {
    counter++;
    var callback = function(result){
        res.header("Access-Control-Allow-Origin", "*");
        var mes = JSON.parse(result);
        res.json({messages: mes});
    }
    connector.getData(req.query.date, callback);
});

router.get('/publiccounter', function(req, res) {
    counter++;
    res.json({count: publicCounter});
});

module.exports = router;
