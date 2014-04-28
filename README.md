parse-local-cloud
=====================================================
This utility is used for debuging Parse.com cloud code.

Currently the following APIs are available:

* REST API
* JavaScript API

Project Setup
=====================================================
* 1.Copy "parse-modules-init.bat" into your parent Parse project and execute it (this bat will install the Parse modules like : mailgun, mandrill, moment, sendgrid, stripe, twilio, underscore )
* 2.(for demo) Go into "demo-js" and "my-parse-project" and call "npm install"
* 3.(for demo) For "my-parse-project" copy this code for local debuging 
    ```javascript
///////////////////////////////////////////////////////////////////////////
//REMOVE THIS CODE WHEN YOU DEPLOY TO PARSE SERVER
(function () {
      var appId = "your app id";
      var javaScriptKey = "your js key";
      var masterKey = "your master key";

      global.Parse = require("./../../parse-local-cloud").Parse;

     //init parse modules
     Parse.initialize(appId, javaScriptKey, masterKey);

      //change cloud modules path
      cloudModulesPath = "./";
})
();
//END CODE
///////////////////////////////////////////////////////////////////////////
    ```
* 4.Start into your IDE or cmd the "main.js" file for "my-parse-project"
* 5.Start into your IDE or cmd the "www.js" file for "demo-js" from "demo-js/bin" folder
* 6.Now your demo server is up and running
* 7.Try into your browser "http://localhost:3000"
* 8.See the Demo section for more details !

Demo
=====================================================
* 1.This is the HTML page of the "demo-js" project !

![Overview](https://github.com/mariusciocan/parse-local-cloud/blob/master/demo-js/public/images/demo-first-screen.png?raw=true "Demo")

* 2.We're calling the code from Parse.com cloud to test it! 

![Overview](https://github.com/mariusciocan/parse-local-cloud/blob/master/demo-js/public/images/demo-loading-parse.png?raw=true "Parse calls")

* 3.We're calling the same function on our local Parse cloud ("my-parse-project")

* * We have 2 breakpoint added for "helloWorld2" function at line 29 and 32

* * The first one(line 29) is on the function entrypoint

* * The second one(line 32) is on the function exits when return the answer


![Overview](https://github.com/mariusciocan/parse-local-cloud/blob/master/demo-js/public/images/demo-loading-local.png?raw=true "Local Parse call")


![Overview](https://github.com/mariusciocan/parse-local-cloud/blob/master/demo-js/public/images/demo-loading-local-response.png?raw=true "Local Parse response")


* 4. We're receiving the answer in browser ! 


![Overview](https://github.com/mariusciocan/parse-local-cloud/blob/master/demo-js/public/images/demo-loading-local-demo.png?raw=true "Done")
