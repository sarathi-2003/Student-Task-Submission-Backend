const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title:{
        type: String,
        required : true,
        unique: true,
    },
    links:{
        type : Array,
        required : true,
    },
    submitted:[
        {
            studentId : {
                type : String,
            },
            assignmentLinks : {
                type : Array,
            },
        },
    ],
    isenabled:{
        type: Boolean
    }
});

module.exports = mongoose.model("Assignment", assignmentSchema);