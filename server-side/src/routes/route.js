const express = require('express');

const router = express.Router();

const taskController=require("../controllers/taskcontroller")

//
router.post('/createTask',taskController.createTask)
router.put('/update/:taskId',taskController.updateTask)
router.get('/getAllTask',taskController.getAllTask)


module.exports = router;

