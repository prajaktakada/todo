const taskModel = require("../models/taskModel")

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const createTask = async function (req, res) {
    try {
        const requestBody = req.body
        
        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters.' })
        }

        const { title, discription, status } = requestBody

        if (!isValid(title)) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide valid title' })
        }
        if (!isValid(discription)) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide valid discription' })
        }
        if (!isValid(status)) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide valid status' })
        }
        
        const taskDetails = { title, discription, status }

        let savedtask = await taskModel.create(taskDetails)
        res.status(201).send({ status: true, message: "created successfully", data: savedtask })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}


const updateTask = async function (req, res) {
    try {
        let findTask = await taskModel.findOne({ _id: req.params.taskId })
       
        // if(findTask.status=='Completed'){
        //     res.status(400).send({status:false,message:'task completed not allow to update'})
        // }
        if (findTask ) {
            // let newdata = await taskModel.findOneAndUpdate({ _id: findTask._id }, { "title": req.body.title, "discription": req.body.discription,"status": req.body.status}, { new: true })
            let newdata = await taskModel.findOneAndUpdate({ _id: req.params.taskId }, {status:'Completed'}, { new: true })
            res.status(200).send({ status: true, data: newdata })
        } else {
            res.status(400).send({ Message: "given data is not found" })
        }
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}


const getAllTask = async function (req, res){
    try{
        let taskData = await taskModel.find()
        res.status(200).send({ status: true, data: taskData })
    }catch(err){
        res.status(500).send({ status: false, message: err.message });
    }
}



// const deleteTask = async (req, res) => {
//     try {
//         const params = req.params.taskId;
//         if (!isValidRequestBody(params)) {
//             return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide task details' })
//         }
//         const findTask = await taskModel.findById({ _id: params })

//         if (!findTask) {
//             return res.status(404).send({ status: false, message: `No findTask found ` })
//         }

//         else if (findTask.isDeleted == true) {
//             return res.status(400).send({ status: false, message: `task has been already deleted.` })
//         } else {
//             const deleteData = await taskModel.findOneAndUpdate({ _id: { $in: findTask } }, { $set: { isDeleted: true} }, { new: true });
//             return res.status(200).send({ status: true, message: "task deleted successfullly.", data: deleteData })
//         }
//     } catch (err) {
//         return res.status(500).send({ status: false, message: "Something went wrong", Error: err.message })
//     }
// }

module.exports = { createTask, updateTask, getAllTask };
//module.exports.deleteTask = deleteTask