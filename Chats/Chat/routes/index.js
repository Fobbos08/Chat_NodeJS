var express = require('express');
var router = express.Router();
var connector = require('../business/dbConnector/connector');

var url = require("url");
/* GET home page. */
router.get('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
  res.render('index', { title: 'Express' });
});

router.post('/sendMessage', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    var data = require('../models/message');
    data.setMessageData(req.body.login, req.body.message);
    connector.postData(data);
    res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res) {
    var data = require('../models/message');
    data.setMessageData(req.body.login, req.body.message);
    connector.postData(data);
    res.render('index', { title: 'Express' });
});

router.get('/messages', function(req, res) {
    var callback = function(result){
        res.header("Access-Control-Allow-Origin", "*");
        var mes = JSON.parse(result);
        res.json({messages: mes});
    }
    connector.getData(req.query.date, callback);
});

module.exports = router;
