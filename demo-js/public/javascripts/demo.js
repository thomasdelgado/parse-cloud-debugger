Parse.initialize("BW59VojYAqo0TOsXw0Y7D7FMNMsZryltFpEdPY4s", "sRbZOLAgzf38sK7DoqKr3R2EJa8Upg7HMMcvr4eR");

var runOnParse = false;
var originalParseFunction = Parse._request;

Parse._request = function (options) {
    Parse.serverURL = "https://api.parse.com";

    if (runOnParse === false && options.route == "functions") {
        Parse.serverURL = "http://localhost:5555";
    }

    return originalParseFunction(options);
};

var elements = [
    {button: "b1", functionName: "helloWorld", resultDiv: "result1", runOnParse: true},
    {button: "b2", functionName: "helloWorld2", resultDiv: "result2", runOnParse: true},
    {button: "b3", functionName: "helloWorld", resultDiv: "result3", runOnParse: false},
    {button: "b4", functionName: "helloWorld2", resultDiv: "result4", runOnParse: false}
];

(function init() {

    reset();

    $("#reset").click(function () {
        reset();
    });

    var length = elements.length,
        e = null;

    for (var i = 0; i < length; i++) {
        e = elements[i];

        (function () {
            var el = e;
            $("#" + el.button).click(function () {
                runOnParse = el.runOnParse;

                toogleElement("#" + el.resultDiv, true, true);
                Parse.Cloud.run(el.functionName, {}, {
                    success: function (result) {
                        toogleElement("#" + el.resultDiv, true, false, result.message);
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });

                runOnParse = false;
            });
        })();

    }
})();

function reset() {
    for (var i = 0; i < elements.length; i++) {
        toogleElement("#" + elements[i].resultDiv, false);
    }
}

function toogleElement(elementId, show, loading, text) {
    if (show) {
        $(elementId).show();
        if (loading) {
            text = "please wait..";
            $(elementId).removeClass("alert-success");
            $(elementId).addClass("alert-warning");
        }
        else {
            $(elementId).addClass("alert-success");
            $(elementId).removeClass("alert-warning");
        }
        $(elementId).html(text);
    }
    else {
        $(elementId).hide();
    }
}



