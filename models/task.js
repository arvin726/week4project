const mongoose = require('mongoose');
let taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    taskid:{
        type:Number
    },
    taskname: {
        type: String,
        required: true,
    },
    assignto: {
        type:String
    },
    duedate: {
        type: Date
    },
    taskstatus:{
        type:String
    },
    taskde: {
        type: String
    }
});
module.exports = mongoose.model('task', taskSchema);