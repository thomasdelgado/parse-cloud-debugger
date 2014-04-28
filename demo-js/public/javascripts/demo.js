Parse.initialize("BW59VojYAqo0TOsXw0Y7D7FMNMsZryltFpEdPY4s", "sRbZOLAgzf38sK7DoqKr3R2EJa8Upg7HMMcvr4eR");


oldParseRequestFunction = Parse._request;

originalParseFunction = function (options) {
    Parse.serverURL = "https://api.parse.com";
    return oldParseRequestFunction(options);
}

redirectedRequestFunction = function (options) {
    if (options.route == "functions") {
        Parse.serverURL = "http://localhost:5555";
    }
    else {
        Parse.serverURL = "https://api.parse.com";
    }
    return oldParseRequestFunction(options);
}


$("#reset").click(function () {
    reset();
});

toogleElement = function (elementId, show, loading, text) {
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

reset = function () {
    toogleElement("#result1", false);
    toogleElement("#result2", false);
    toogleElement("#result3", false);
    toogleElement("#result4", false);
}

function init() {
    var elements = [
        {element: "b1", func: "helloWorld", resultDiv: "result1", parseCall: true},
        {element: "b2", func: "helloWorld2", resultDiv: "result2", parseCall: true},
        {element: "b3", func: "helloWorld", resultDiv: "result3", parseCall: false},
        {element: "b4", func: "helloWorld2", resultDiv: "result4", parseCall: false}
    ]

    var length = elements.length,
        e = null;

    for (var i = 0; i < length; i++) {
        e = elements[i];

        (function () {
            var el = e;
            $("#" + el.element).click(function () {
                Parse._request = el.parseCall ? originalParseFunction : redirectedRequestFunction;

                toogleElement("#" + el.resultDiv, true, true);
                Parse.Cloud.run(el.func, {}, {
                    success: function (result) {
                        toogleElement("#" + el.resultDiv, true, false, result.message);
                    },
                    error: function (error) {
                        console.log(error);
                    }
                });
            });
        })();

    }
};

init();
reset();

