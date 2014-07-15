### This utility is used for debuging Parse.com cloud code.



### Problem:
The code deployed on Parse.com cloud is not available for DEBUG. The only way to "debug" the code is using the "console.log" !! Debuging your code allows you to identify the bugs and code faster !!

### Solution:
A local NodeJs server wich is simulating the Parse cloud enviroment and where YOU CAN DEBUG your code.


##### Currently this utility is available for the following Parse APIs:
* REST API
* JavaScript API
* Android API (work in progress)

=====================================================

## Online Demo : http://parse-debugger.parseapp.com

=====================================================


Demo Project Structure
=====================================================
* 1. parse-cloud-demo - contains all parse js files and the files of the presention site
* 2. parse-cloud-debbuger - local module of the lib used to enable local debugging of parse cloud code

Demo Setup
=====================================================
* 1. Get the files from git and open the folder!
* 2.1. [WINDOWS] Execute "npm install" in that folder as Administrator
* 2.2. [LINUX] Execute "sudo npm install --unsafe-perm" in that folder (thanks @pcecchetti)
* 2.3. Set NODE_PATH env param to your 'parse-cloud-code-demo' folder && DEV env param to 'true'
* 3.1. In 'parse-cloud-code-demo\startLocalDebugging.js' is the code to start the app in debug mode
```javascript
      global.Parse = require("parse-cloud-debugger").Parse;
      Parse.initialize( "your app id", "your js key", "your master key");
      require('./cloud/main.js');

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

* 4.DEBUG into your IDE or cmd the "startLocalDebugging.js" file from "parse-cloud-code-demo"
* 5.Now your demo server should be up and running at "http://localhost:3000"
* 6.See the DEMO section for more details !

Demo
=====================================================
* 1.This is the HTML page of the "web-js-demo" project !

![Overview](https://raw.githubusercontent.com/mariusciocan/parse-cloud-debugger/master/parse-cloud-code-demo/public/images/demo-first-screen.png?raw=true "Demo")


* 2.We're calling the code from Parse.com cloud to test it! 

![Overview](https://raw.githubusercontent.com/mariusciocan/parse-cloud-debugger/master/parse-cloud-code-demo/public/images/demo-loading-parse.png?raw=true "Parse calls")

* 3.We're calling the same function on our local Parse cloud ("parse-cloud-code-demo")

* * We have 2 breakpoint added for "helloWorld2" function at line 29 and 32

* * The first one(line 29) is on the function entrypoint

* * The second one(line 32) is on the function exits when return the answer


![Overview](https://raw.githubusercontent.com/mariusciocan/parse-cloud-debugger/master/parse-cloud-code-demo/public/images/demo-loading-local.png?raw=true "Local Parse call")


![Overview](https://raw.githubusercontent.com/mariusciocan/parse-cloud-debugger/master/parse-cloud-code-demo/public/images/demo-loading-local-response.png?raw=true "Local Parse response")


* 4. We're receiving the answer in browser ! 


![Overview](https://raw.githubusercontent.com/mariusciocan/parse-cloud-debugger/master/parse-cloud-code-demo/public/images/demo-loading-local-demo.png?raw=true "Done")


Change log
=====================================================
0.0.50
* Support for express added


### Not supported for local debugging :
* Parse.Cloud.beforeSave
* Parse.Cloud.afterSave
* Parse.Cloud.beforeDelete
* Parse.Cloud.afterDelete

