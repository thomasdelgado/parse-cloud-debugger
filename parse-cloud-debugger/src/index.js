var parseLib = require("./parse.js");
var Parse = parseLib.Parse;
var FUNCTION_TIMEOUT = 15;
var JOB_TIMEOUT = 15 * 60;

var oldParseRunFunction = Parse.Cloud.run;

Parse.localFunctions = [];
Parse.jobs = [];

var runFunction = function (callBack, name, timeout, data, options) {
    var request, response;

    options = options || {};

    if (callBack == undefined) {
        console.log("Unable to run function '" + name + "'. Function is not defined !");
        return;
    }

    request = {};
    request.body = {};
    request.params = data;
    request.user = Parse.User.current();

    response = {};
    response.success = options.success;
    response.error = options.error;

    (function runCallBack() {
        var functionName = name;
        var startTime = new Date();
        var endTime;

        callBack(request, {
            success: function (data) {
                endTime = new Date();
                if ((endTime.getTime() - startTime.getTime()) / 1000 >= timeout) {
                    console.error("Function '" + functionName + "' timeout! ");
                }

                if (response.success != undefined) {
                    response.success(data);
                }
            },
            error: function (error) {
                if (response.error != undefined) {
                    response.error(error);
                }
            }
        });
    })();

}

Parse.Cloud.run = function (name, data, options) {
    //go to real Parse server
    if (options.useParse) {
        oldParseRunFunction(name, data, options);
        return;
    }

    //else call run the function locally
    runFunction(Parse.localFunctions[name], name, FUNCTION_TIMEOUT, data, options);
}


Parse.Cloud.runJob = function (name, data, options) {
    //helper function to run run jobs locally
    runFunction(Parse.jobs[name], name, JOB_TIMEOUT, data, options);
}

Parse.Cloud.beforeSave = Parse.Cloud.afterSave = Parse.Cloud.beforeDelete = Parse.Cloud.afterDelete = function () {
    console.log("This function is not available on client !");
}

Parse.Cloud.httpRequest = function (options) {
    var request = require('request');

    var requestOptions = {
        "url": options.url,
        "headers": options.headers || {},
        "body": options.body || {},
        "params": options.params || {},
        "method": options.method || "GET"
    };

    var callback = function (error, response, body) {
        var result = {
            "headers": response.headers,
            "text": body,
            "status": response.statusCode,
            "cookies": {},
            "data": {},
            "buffer": {}
        };

        options = options || {};

        if (error && options.error != undefined) {
            options.error(error);
            return;
        }

        if (options.success != undefined) {
            options.success(result);
        }
    }

    request(options, callback);
}

Parse.Cloud.define = function (functionName, callBack) {
    Parse.localFunctions[functionName] = callBack;
}

Parse.Cloud.job = function (jobName, callBack) {
    Parse.jobs[jobName] = callBack;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser');

var app = express();
app.set('port', process.env.PORT || 5555);
app.use(bodyParser());
app.use(express.Router());

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
    console.log('Local Parse Cloud runnig at localhost:' + app.get('port') + " !!!");
});

module.exports = parseLib;