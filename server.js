var express = require('express');
var app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var bodyparse=require('body-parser');
app.use(bodyparse.urlencoded({extended:false}));

app.use(express.static('views'));
app.use(express.static('img'));
app.use(express.static('css'));

var filePath=__dirname +"/views/";
db=[];
app.get("/",function(req,res){
    let fileName= filePath +"index.html";
    res.sendFile(fileName);
});
app.get("/addnew",function(req,res){
    let fileName =filePath +"addnew.html";
    res.sendFile(fileName);
})
app.get("/showall",function(req,res){
    res.render("showall.html",{data:db});
})
app.post("/registration",function(req,res){
    let data=req.body;
    db.push(data);
    res.render("showall.html");
})
app.listen(8080);