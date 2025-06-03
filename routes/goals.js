const mongoose = require('mongoose');

var express = require('express');
const route = require('.');
var router = express.Router();

// Define Goal schema and model
const goalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true }
});
const Goal = mongoose.model('Goal', goalSchema);

router.get('/getGoal', async (req, res, next) => {
   try {
    const goals = await Goal.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks', error: err });

  }
});

router.delete('/deleteGoal/:id', async (req, res, next) => {
try {
    await Goal.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Goal deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task', error: err });

  }
   });

router.post('/addGoal', async (req, res, next) => {
    try {
    const newGoal = new Goal({
      name: req.body.name,
      description: req.body.description
    });
    await newGoal.save();
    res.status(200).json({ message: 'Goal added successfully', goal: newGoal });
  } catch (err) {
    res.status(400).json({ message: 'Name and description are required' });
  }
});

module.exports = router;