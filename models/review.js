const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema ({
    title: {
        type:String,
        required:true
    },
    body: {
        type:String,
        required:true
    },
    typeId: {
        type:Schema.Types.ObjectId,
        required:true,
        refPath: 'type'
    },
    type:{
        type:String,
        enum:["users","posts"],
        required:true
    },
    isDeleted : {
        type:Boolean,
        default:false
    }

});

module.exports = mongoose.model('reviews',reviewSchema);

