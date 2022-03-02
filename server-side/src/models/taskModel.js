
const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({

    title: {type:String,required: true},
    discription: {type:String,required: true},
    status: {type: String,required: true,enum: ['Open', 'In-progress', 'Completed']},
    //isDeleted :{type:Boolean,default:false}

    },{ timestamps: true })

module.exports = mongoose.model('taskDB', taskSchema)