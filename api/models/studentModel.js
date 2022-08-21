import mongoose from 'mongoose'


const studentSchema = mongoose.Schema({
    name : {
        type        : String,
        required    : true,
        trim        : true
    },
    email : {
        type        : String,
        required    : true,
        trim        : true,
        unique      : true
    },
    cell : {
        type        : String,
        required    : true,
        trim        : true,
        unique      : true
    },
    username : {
        type        : String,
        required    : true,
        trim        : true,
        unique      : true
    },
    age : {
        type        : Number,
        required    : true,
        trim        : true
    },
    gender : {
        type        : String
    },
    photo : {
        type        : String
    },
    password : {
        type        : String,
        required    : true,
        trim        : true
    },
    isAdmin : {
        type        : Boolean,
        default     : false
    },
    status : {
        type        : Boolean,
        default     : true
    },
    trash : {
        type        : Boolean,
        default     : false
    },


}, {
    timestamps : true
})



export default mongoose.model('Student', studentSchema)