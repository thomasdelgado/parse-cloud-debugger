var cloudModulesPath = "cloud/";

///////////////////////////////////////////////////////////////////////////
//REMOVE THIS CODE WHEN YOU DEPLOY TO PARSE SERVER
(function () {
    // test keys for a real parse demo project wich contains the code from this file
    var appId = "BW59VojYAqo0TOsXw0Y7D7FMNMsZryltFpEdPY4s";
    var javaScriptKey = "sRbZOLAgzf38sK7DoqKr3R2EJa8Upg7HMMcvr4eR";
    var masterKey = "hdNrcS0umqkopWo3v5hwSO2Cmzs8IMDDacjzT4VJ";

    //local module
    global.Parse = require("./../../parse-cloud-debugger").Parse;

    //npm module
    //global.Parse = require("parse-cloud-debugger").Parse;

    //init parse modules
    Parse.initialize(appId, javaScriptKey, masterKey);

    //change cloud modules path
    cloudModulesPath = "./";
})
();
//END CODE
///////////////////////////////////////////////////////////////////////////


Parse.Cloud.define("helloWorld", function (request, response) {
    response.success({message: "Hello world from Parse !"});
});


Parse.Cloud.define("helloWorld2", function (request, response) {
    var util = require(cloudModulesPath + "util.js");

    util.helloWorld(function (result) {
        response.success(result);
    });
});

Parse.Cloud.define("httpRequestExample", function (request, response) {
    Parse.Cloud.httpRequest({url: "https://www.google.com",
        success: function (result) {
            response.success({message: "Request to google.com done !"});
        },
        error: function (error) {
            console.log(error);
        }
    });
});
