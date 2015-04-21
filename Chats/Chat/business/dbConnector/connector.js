var querystring = require('querystring');
var http = require('http');
var fs = require('fs');

exports.createDB = function() {
    // Build the post string from an object
    var post_data = querystring.stringify({
    });

    // An object of options to indicate where to post to
    var post_options = {
        host: 'localhost',
        port: '5984',
        path: '/chat',
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': post_data.length
        }
    };

    // Set up the request
    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
        });
    });

    // post the data
    post_req.write(post_data);
    post_req.end();
}

exports.postData = function(data) {
    // Build the post string from an object
    var date = new Date();

    var post_data = JSON.stringify({
        login: data.getLogin(),
        message: data.getMessage(),
        date: date.getTime()
    });

    // An object of options to indicate where to post to
    var post_options = {
        host: '127.0.0.1',
        port: 5984,
        path: '/chat',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
        //data: post_data
    };

    // Set up the request
    var post_req = http.request(post_options, function(res) {
        res.setEncoding('utf8');
    });

    post_req.write(post_data);
    post_req.end();
}

exports.getData = function(date, callback) {
        // An object of options to indicate where to post to
        var start = "";
        if(date!=undefined)
        {
            start = '&endkey='+date;
        }
        var options = {
            host: '127.0.0.1',
            port: 5984,
            path: '/chat/_design/DateFilter/_view/DateFilter?descending=true&limit=20'+start,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        var str="";
        var req = http.get(options, function(res) {
            res.on('data', function (chunk) {
                str += chunk;
            });

            res.on('end', function () {
                callback(str);
                console.log(str);
            });
        });

        req.end();
        return str;
}
