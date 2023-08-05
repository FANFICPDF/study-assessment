const Task = require('../models/taskModel');

const taskController = {};

taskController.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({});
    res.locals.tasks = tasks;
    return next();
  } catch (err) {
    next({
      log: 'Express error caught in taskController.getTasks middleware',
      message: {
        err: `An error occurred in taskController.getTasks middleware: ${err}`,
      },
    });
  }
};

taskController.addTask = async (req, res, next) => {
  try {
    const { title, description, completed } = req.body; // add destructured properties
    const newTask = await Task.create({ title, description, completed }); // add destructured properties
    res.locals.newTask = newTask;
    return next();
  } catch (err) {
    next({
      log: 'Express error caught in taskController.addTask middleware',
      message: {
        err: `An error occurred in taskController.addTask middleware: ${err}`,
      },
    });
  }
};

taskController.updateTask = async (req, res, next) => {
  try {
    // const id = req.body._id;
    const { title, description, completed, _id } = req.body;
    const updatedTask = await Task.findOneAndUpdate(
      { _id },
      { title, description, completed }
    );
    res.locals.updatedTask = updatedTask;
    return next();
  } catch (err) {
    next({
      log: 'Express error caught in taskController.updateTask middleware',
      message: {
        err: `An error occurred in taskController.updateTask middleware: ${err}`,
      },
    });
  }
};

taskController.deleteTask = async (req, res, next) => {
  try {
    const id = req.body._id;
    const deletedTask = await Task.findOneAndDelete({ _id: id });
    res.locals.deletedTask = deletedTask;
    return next();
  } catch (err) {
    next({
      log: 'Express error caught in taskController.deleteTask middleware',
      message: {
        err: `An error occurred in taskController.deleteTask middleware: ${err}`,
      },
    });
  }
};

module.exports = taskController;
