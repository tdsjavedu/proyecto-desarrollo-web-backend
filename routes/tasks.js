const mongoose = require('mongoose');


var express = require('express');
const route = require('.');
const { response } = require('../app');
var router = express.Router();

//let tasks = [
 // { id: 1, name: 'Limpiar la cocina', description: 'Lavar los trastos y estufa' },
 // { id: 2, name: 'Task 2', description: 'Description for Task 2' },
 // { id: 3, name: 'Task 3', description: 'Description for Task 3' }
//];

// Define Task schema and model
const taskInit = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true }
});
const Task = mongoose.model('tasks-proyectofinal', taskInit);


// Initialize the tasks array with data from the database


router.get('/getTasks', async (req, res, next) =>{
 try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks', error: err });
  }
});

router.delete('/deleteTask/:id', async (req, res, next) => {
  if (req.params && req.params.id) {
    try {
      const result = await Task.findByIdAndDelete(req.params.id);
      if (result) {
        res.status(200).json({ message: 'Task deleted successfully' });
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Error deleting task', error: err });
    }
  } else {
    res.status(400).json({ message: 'Task ID is required' });
  }
  });


router.post('/addTask', async function(req, res, next) {
  if (req.body && req.body.name && req.body.description) {
    try{
      const task = new Task ({
        name: req.body.name,
        description: req.body.description
      });
    await task.save();
    res.status(200).json({ message: 'Task added successfully', task: task });
     } catch (err){
    res.status(500).json({ message: 'Error adding task', error: err });
     }
    } else {
    res.status(400).json({ message: 'Invalid task data' });
     }
    });

  //}else{

 //   res.status(400).json(tasks);
 // }
  //  const newTask = {
   //     id: tasks.length + 1,
    //    name: req.body.name,
     //   description: req.body.description
  //  };
  //  tasks.push(newTask);
  //  res.json({ message: 'Task added successfully', task: newTask });

module.exports = router;


