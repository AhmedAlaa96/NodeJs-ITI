const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema ({
    title: {
        type:String,
        required:true
    },
    body: {
        type:String,
        required:true
    },
    userId: {
        type:Schema.Types.ObjectId,
        required:true,
        ref: 'users'
    },
    isDeleted : {
        type:Boolean,
        default:false
    }

});

module.exports = mongoose.model('posts',postSchema);

