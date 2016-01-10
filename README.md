### This utility is used for debuging Parse.com cloud code.



### Problem:
The code deployed on Parse.com cloud is not available for DEBUG. The only way to "debug" the code is using the "console.log" !! Debuging your code allows you to identify the bugs and code faster !!

### Solution:
A local NodeJs server wich is simulating the Parse cloud enviroment and where YOU CAN DEBUG your code.


##### Currently this utility is available for the following Parse APIs:
* REST API
* JavaScript API


=====================================================

## Demo: [http://parse-cloud-debbuger.parseapp.com](http://parse-cloud-debbuger.parseapp.com)

=====================================================


Demo Project Structure
=====================================================
* 1. parse-cloud-demo - contains all parse js files and the files of the presention site
* 2. parse-cloud-debbuger - local module of the lib used to enable local debugging of parse cloud code

Demo Setup
=====================================================
* 1. Get the files from git and open the folder!
* 2.1. [WINDOWS] Execute `npm install` in that folder as Administrator
* 2.2. [LINUX] Execute `sudo npm install --unsafe-perm` in that folder
* 2.3. **Set NODE_PATH env param to your 'parse-cloud-code-demo' folder && DEV env param to 'true'**
* 3.DEBUG into your IDE or cmd the "startLocalDebugging.js" file from "parse-cloud-code-demo"
* 4.Now your demo server should be up and running at "http://localhost:3000"
* 5.See the DEMO section for more details !

Demo
=====================================================
* 1.This is the HTML page of the "parse-cloud-demo" project:  [ http://parse-cloud-debbuger.parseapp.com ](http://parse-cloud-debbuger.parseapp.com)
* 2.We're calling the same function on our local Parse cloud ("parse-cloud-code-demo")

* * We have a breakpoint added for "helloWorld2" function at line 10 where we can access data sent from browser


![Overview](https://raw.githubusercontent.com/mariusciocan/parse-cloud-debugger/master/parse-cloud-code-demo/public/images/breakpoint.jpg?raw=true "Local Parse call")


### Not supported for local debugging :
* Parse.Cloud.beforeSave
* Parse.Cloud.afterSave
* Parse.Cloud.beforeDelete
* Parse.Cloud.afterDelete

