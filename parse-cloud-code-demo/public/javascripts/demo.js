Parse.initialize("K3vXmzunZTQpinkZX2TbEKRCKa3sImZnp0EYTVv7", "ykpUBkKa7mN6pyF4eXEAX6zAvUt8trcfjqpivioA");

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

                Parse.serverURL = el.runOnParse?"https://api.parse.com/1":"http://localhost:5555";


                toogleElement("#" + el.resultDiv, true, true,'please wait..');
                Parse.Cloud.run(el.functionName, {testData: true}, {
                    success: function (result) {
                        toogleElement("#" + el.resultDiv, true, false, result.message);
                    },
                    error: function (error) {
                        toogleElement("#" + el.resultDiv, true, false, "Error !");
                        console.log(error.message);
                    }
                });

                runOnParse = false;
            });
        })();

    }
})();

function userLogIn(){
    toogleElement("#resultUser",true,true,'logging user..');
    Parse.User.logIn("test", "test1234", {
        success: function(user) {
            toogleElement("#resultUser",true,false,"User logged in!");
        },
        error: function(user, error) {
            toogleElement("#resultUser",true,true,"User not logged in!");
        }
    });
}

function reset() {
    userLogIn();

    for (var i = 0; i < elements.length; i++) {
        toogleElement("#" + elements[i].resultDiv, false);
    }
}

function toogleElement(elementId, show, loading, text) {
    if (show) {
        $(elementId).show();
        if (loading) {
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



