var express = require('express');
var app = express();

app.use(express.bodyParser());
app.set('view engine', 'jade');
app.set('views', 'cloud/views');

app.get('/', function (req, res) {
    res.render('index', { title: 'Parse JS Debug Demo' });
});

if (process.env && process.env['DEV']) {
    app.use(express.static(__dirname + '/../public'));
    app.listen(3000);
} else {
    app.listen();
}
