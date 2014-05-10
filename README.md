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
* Android API (work in progress)

Demo Setup
=====================================================
* 1. Get the files from git !
* 2.1. [WINDOWS] Execute "npm install" in "web-js-demo" as Administrator
* 2.2. [LINUX] Execute "sudo npm install --unsafe-perm" in "web-js-demo"
* 3.1. Copy the following code in the "parse-cloud-code-demo/main.js" file in order to enable local debuging
```javascript
///////////////////////////////////////////////////////////////////////////
//REMOVE THIS CODE WHEN YOU DEPLOY TO PARSE SERVER
(function () {
      var appId = "your app id";
      var javaScriptKey = "your js key";
      var masterKey = "your master key";

      global.Parse = require("parse-cloud-debugger").Parse;

      //init parse modules
      Parse.initialize(appId, javaScriptKey, masterKey);

      //change cloud modules path
      cloudModulesPath = "./";
})
();
//END CODE
///////////////////////////////////////////////////////////////////////////
  ```

* 3.2. Copy the following code in the entrypoint js file in order to enable local debuging on client 
```javascript
///////////////////////////////////////////////////////////////////////////
//REMOVE THIS CODE WHEN YOU DEPLOY 
var runOnParse = false;
var originalParseFunction = Parse._request;

Parse._request = function (options) {
    Parse.serverURL = "https://api.parse.com";

    if (runOnParse === false && options.route == "functions") {
        Parse.serverURL = "http://localhost:5555";
    }

    return originalParseFunction(options);
};
//END CODE
///////////////////////////////////////////////////////////////////////////
  ```

* 4.DEBUG into your IDE or cmd the "main.js" file from "parse-cloud-code-demo"
* 5.RUN into your IDE or cmd the "www.js" file from "web-js-demo/bin" folder
* 6.Now your demo server should be up and running
* 7.Navigate to "http://localhost:3000"
* 8.See the DEMO section for more details !

Demo
=====================================================
* 1.This is the HTML page of the "web-js-demo" project !

![Overview](https://github.com/mariusciocan/parse-cloud-debugger/blob/master/web-js-demo/public/images/demo-first-screen.png?raw=true "Demo")

* 2.We're calling the code from Parse.com cloud to test it! 

![Overview](https://github.com/mariusciocan/parse-cloud-debugger/blob/master/web-js-demo/public/images/demo-loading-parse.png?raw=true "Parse calls")

* 3.We're calling the same function on our local Parse cloud ("parse-cloud-code-demo")

* * We have 2 breakpoint added for "helloWorld2" function at line 29 and 32

* * The first one(line 29) is on the function entrypoint

* * The second one(line 32) is on the function exits when return the answer


![Overview](https://github.com/mariusciocan/parse-cloud-debugger/blob/master/web-js-demo/public/images/demo-loading-local.png?raw=true "Local Parse call")


![Overview](https://github.com/mariusciocan/parse-cloud-debugger/blob/master/web-js-demo/public/images/demo-loading-local-response.png?raw=true "Local Parse response")


* 4. We're receiving the answer in browser ! 


![Overview](https://github.com/mariusciocan/parse-cloud-debugger/blob/master/web-js-demo/public/images/demo-loading-local-demo.png?raw=true "Done")


### Not supported for local debugging :
* Parse.Cloud.beforeSave
* Parse.Cloud.afterSave
* Parse.Cloud.beforeDelete
* Parse.Cloud.afterDelete
* Parse.Cloud.job