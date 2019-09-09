const mongoose = require('mongoose');
let developerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    
    name:{
        firstname: String,
        lastname:String,
},
    level: {
        type: String,
        validate: {
            validator: function (level) {
                return  level == 'Beginner' || level == 'Expert' 
            }}
    },
    address:{
    state: String,
    suburb:String,
    street:String,
    unit: String,
}
 
});
module.exports = mongoose.model('developer', developerSchema);