var app = require('../app');

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    console.log('web-js-demo is up and running at localhost:' + server.address().port + " !!!");
});
