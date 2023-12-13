const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required : true,
    },
    lastname : {
        type : String,
        required : true,
    },
    phonenumber: {
        type : Number,
        required : true,
    },
    id : {
        type : String,
        required : true,
        unique : true,
    },
    emailid: {
        type : String,
        required : true,
        unique : true,
    },
    username: {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    isAdmin :{
        type : Boolean,
        default : false,
    },
    isStudent: {
        type: Boolean,
        default : false,
    },
    isMentor : {
        type : Boolean,
        default : false,
    },
});

module.exports = mongoose.model("User",userSchema);