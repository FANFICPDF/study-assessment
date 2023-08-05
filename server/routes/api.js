const express = require('express');

const taskController = require('../controllers/taskController');

const router = express.Router();

router.get('/tasks', taskController.getTasks, (req, res) =>
  res.status(200).json(res.locals.tasks)
);

router.post('/tasks', taskController.addTask, (req, res) =>
  res.status(200).json(res.locals.newTask)
);

router.patch('/tasks', taskController.updateTask, (req, res) =>
  res.status(200).json(res.locals.updatedTask)
);

router.delete('/tasks', taskController.deleteTask, (req, res) =>
  res.status(200).json(res.locals.deletedTask)
);

module.exports = router;
