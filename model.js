const mongoose=require('mongoose');
var Schema=mongoose.Schema;
const user=new Schema({
    firstname:{
        type:String,
    },
    lastname:{
        type:String
    },
    location:{
        type:String,
    },
    mobileno:{
        type:Number,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    }
});
module.exports=mongoose.model('User',user);