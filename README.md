### This utility is used for debuging Parse.com cloud code.



### Problem:
The code deployed on Parse.com cloud is not available for DEBUG. The only way to "debug" the code is using the "console.log" !! Debuging your code allows you to identify the bugs and code faster !!

=====================================================

### Solution:
A local NodeJs server wich is simulating the Parse cloud enviroment and where YOU CAN DEBUG your code.

=====================================================

##### Currently this utility is available for the following Parse APIs:
* REST API
* JavaScript API

Demo Setup
=====================================================
* 1. Execute "parse-modules-init.bat", which will install Parse modules like : mailgun, mandrill, moment, sendgrid, stripe, twilio, underscore
* 2. Execute "npm install" in both "demo-js" and "my-parse-project" folders
* 3. Copy the following code in the "my-parse-project/main.js" file in order to enable local debuging 
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

* 4.DEBUG into your IDE or cmd the "main.js" file from "my-parse-project"
* 5.RUN into your IDE or cmd the "www.js" file from "demo-js/bin" folder
* 6.Now your demo server should be up and running
* 7.Navigate to "http://localhost:3000"
* 8.See the DEMO section for more details !

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
