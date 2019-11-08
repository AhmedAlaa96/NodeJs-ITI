const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name: {
        type:String,
        required:true
    },
    username: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    age: {
        type:Number,
        required:true
    },
    phone: {
        type:String,
        required:true
    },
    token:{
        type:String,
        default:null
    },
    isDeleted : {
        type:Boolean,
        default:false
    }

});

module.exports = mongoose.model('users',userSchema);

