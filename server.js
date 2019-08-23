var express = require('express');
var app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('public'));
let date = new Date();

app.get('/getdate', function (req, res) {
    res.render('index.html', {
        day: date.getDay(),
        mon: date.getMonth(),
        year: date.getFullYear()
    });
});

app.get('/gettime', function (req, res) {
    res.render('index.html', {
        hour: date.getDay(),
        min: date.getMinutes(),
        sec: date.getSeconds()
    });
});
app.listen(8080);