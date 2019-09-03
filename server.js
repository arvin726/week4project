var express = require('express');
var app = express();
var mongodb= require('mongodb');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var bodyparse=require('body-parser');
app.use(bodyparse.urlencoded({extended:false}));

app.use(express.static('views'));
app.use(express.static('img'));
app.use(express.static('css'));

var filePath=__dirname +"/views/";
var MongoClient= mongodb.MongoClient;
var url="mongodb://localhost:27017/";
let db;

MongoClient.connect(url, { useNewUrlParser: true , useUnifiedTopology: true },
    function (err, client) {
        if (err) {
            console.log("Err  ", err);
        } else {
            console.log("Connected successfully to server");
            db = client.db("task");
        }
    });

app.get("/",function(req,res){
    let fileName= filePath +"index.html";
    res.sendFile(fileName);
});
app.get("/addnew",function(req,res){
    let fileName =filePath +"addnew.html";
    res.sendFile(fileName);
})
app.get("/delete",function(req,res){
    let fileName =filePath +"delete.html";
    res.sendFile(fileName);
})

app.get("/update",function(req,res){
    let fileName =filePath +"update.html";
    res.sendFile(fileName);
})

app.get("/deleteall",function(req,res){
    db.collection("task").deleteMany({status:'completed'})
    res.redirect("/showall")
    });

app.get("/showall",function(req,res){
    db.collection('task').find({}).toArray(function (err, data) {
        res.render('showall', { db: data });
    });
})
app.get("/findtasks/:a/:b",function(req,res){
    let a =parseInt(req.params.a);
    let b =parseInt(req.params.b);
    let filter= { $and: [ { taskid: { $gt: a } }, { taskid: { $lt: b} } ] }
    db.collection('task').find(filter).toArray(function(err,result){
        if(err){
            res.send("not find")
        }
        else{
        res.render('showall',{db:result})
        }
    })
})
app.post("/registration",function(req,res){
    let taskid=Math.round(Math.random()*1000);
    let data=req.body;
    db.collection('task').insertOne({ taskid: taskid, taskname: data.taskname, assignto: data.assignto,duedate:data.duedate ,status:data.status ,Description:data.Description});
    res.redirect('/showall');
})
app.post("/deletetask", function(req,res){
    let taskdetails = req.body;
    db.collection("task").deleteOne({ taskid: parseInt(taskdetails.taskid) });
    res.redirect('/showall');
})
app.post("/updatetask",function(req,res){
    let taskdetails = req.body;
    let filter = { taskid: parseInt(taskdetails.taskid) };
    let theUpdate = { $set: { status: taskdetails.status} };
    db.collection('task').updateOne(filter, theUpdate);
    res.redirect('/showall');
})
app.listen(8080);