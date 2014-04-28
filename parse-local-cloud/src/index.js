var parseLib = require("./parse.js");
var Parse = parseLib.Parse;

var oldParseRunFunction = Parse.Cloud.run;

Parse.localFunctions = [];

Parse.Cloud.run = function (name, data, options) {
    options = options || {};

    if (options.useParse) {
        oldParseRunFunction(name, data, options);
    }
    else {
        var callBack = Parse.localFunctions[name];
        var request = {};
        var response = {};

        request.body = {};
        request.params = data;
        request.user = Parse.User.current();

        response.success = options.success;
        response.error = options.error;

        callBack(request, response);
    }
}

Parse.Cloud.define = function (functionName, callBack) {
    Parse.localFunctions[functionName] = callBack;
}

var http = require('http'),
    express = require('express');
var app = express();
app.set('port', process.env.PORT || 5555);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(app.router);

var reqHandler = function (req, res) {
    var functionName = req.params.functionName;

    try {
        Parse.Cloud.run(functionName, req.body, {
            success: function (data) {
                res.header("Access-Control-Allow-Origin", "*");
                res.send({result: data});
            },
            error: function (err) {
                res.send(err);
            }
        });
    }
    catch (e) {
        res.send(e);
    }
};

app.post('/functions/:functionName', reqHandler);
app.post('/1/functions/:functionName', reqHandler);

http.createServer(app).listen(app.get('port'), function () {
    console.log('App Server is now running at:' + app.get('port'));
});

module.exports = parseLib;