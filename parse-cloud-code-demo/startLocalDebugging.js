//test keys
//change these with your app keys
var appId = "K3vXmzunZTQpinkZX2TbEKRCKa3sImZnp0EYTVv7";
var javaScriptKey = "ykpUBkKa7mN6pyF4eXEAX6zAvUt8trcfjqpivioA";

//local module
global.Parse = require("./../parse-cloud-debugger").Parse;

//npm module
//global.Parse = require("parse-cloud-debugger").Parse;

//init parse modules
Parse.initialize(appId, javaScriptKey);

process.nextTick(function () {
   //run cloud code
    require('./cloud/main.js');

   //run a test job
    Parse.Cloud.runJob("testJOB");
});
