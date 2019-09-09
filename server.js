var express = require('express');
var app = express();
const mongoose = require('mongoose');
const task = require('./models/task');
const developer =require('./models/developer')

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var bodyparse=require('body-parser');
app.use(bodyparse.urlencoded({extended:false}));

app.use(express.static('views'));
app.use(express.static('img'));
app.use(express.static('css'));
app.use(express.static('models'));

var filePath=__dirname +"/views/";
var url="mongodb://localhost:27017/task";

mongoose.connect(url, { useNewUrlParser: true },function (err) {
    if (err) {
        console.log('Error in Mongoose connection');
        throw err;
    }
})

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
    task.deleteMany({taskstatus:'completed'}, function (err, doc) {

    });
    res.redirect("/showall")
    });

app.get("/showall",function(req,res){
    task.find().exec(function (err, docs) {

        res.render('showall', {db: docs });
    });
})
app.get("/developer",function(req,res){
    let fileName =filePath +"developer.html";
    res.sendFile(fileName);
})

app.get("/alldeveloper",function(req,res){
    developer.find().exec(function (err, docs) {
        res.render('alldeveloper', { db:docs });
    });
});


app.post("/registration",function(req,res){
    let taskid=Math.round(Math.random()*1000);
    let data=req.body;
    let date= new Date(req.body.duedate)
    developer.find({'_id':data.assignto},(function(err,docs){
        if(err){
            res.send("developer not exist")
        }
        else{
        task.create({ 
            _id:new mongoose.Types.ObjectId(),
            taskid: taskid,
            taskname: data.taskname,
            assignto: data.assignto,
            duedate:date,
            taskstatus:data.status ,
            taskde:data.Description},function(err){
                if(err){
                   res.send("input no correct");
                }else{
                   res.redirect('/showall');
                }
            });}
    }))
    // task.create({ taskid: taskid,
    //      taskname: data.taskname,
    //      assignto: ii,
    //      duedate:date,
    //      status:data.status ,
    //      Description:data.Description},function(err){
    //          if(err){
    //             res.send("input no correct");
    //          }else{
    //             res.redirect('/showall');
    //          }
    //      });
});

app.post("/deveregistration",function(req,res){
    let date=req.body;
        developer.create({
        _id:new mongoose.Types.ObjectId(),
        name:{
        firstname:date.firstname,
        lastname:date.lastname},
        level:date.level,
        address:{
        state:date.state,
        suburb:date.suburb,
        street:date.street,
        unit:date.unit}},function(err,docs){
            if(err){
                res.send("input no correct");
            }else{
               res.redirect('/alldeveloper');
            }
        });
});

app.post("/deletetask", function(req,res){
    let taskdetails = req.body;
    task.deleteOne({ 'taskid': parseInt(taskdetails.taskid) },function(err,docs){
        if(err){

        }
        else{
            res.redirect('/showall');
        }
    });
})
app.post("/updatetask",function(req,res){
    let taskdetails = req.body;
    let filter = { taskid: parseInt(taskdetails.taskid) };
    let theUpdate = { $set: { taskstatus: taskdetails.status} };
    task.updateOne(filter, theUpdate,function(err,docs){
        if(err){

        }
        else{
            res.redirect('/showall');
        }
    });
    });
app.listen(8080);