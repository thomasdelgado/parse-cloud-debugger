var path = require('path');

//test keys
//change these with your app keys
var appId = "BW59VojYAqo0TOsXw0Y7D7FMNMsZryltFpEdPY4s";
var javaScriptKey = "sRbZOLAgzf38sK7DoqKr3R2EJa8Upg7HMMcvr4eR";
var masterKey = "hdNrcS0umqkopWo3v5hwSO2Cmzs8IMDDacjzT4VJ";

//local module
global.Parse = require("./../parse-cloud-debugger").Parse;

//npm module
//global.Parse = require("parse-cloud-debugger").Parse;

//init parse modules
Parse.initialize(appId, javaScriptKey, masterKey);

//init static http server
Parse.initStaticHttp(path.join(__dirname, '/public'));

//change cloud modules path
cloudModulesPath = "./";

//run cloud code
require('./cloud/main.js');