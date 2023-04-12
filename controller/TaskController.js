const Task = require("../models/Task");
let obs = { tasksList: null, task: null, deleteId: null, noTask: false, message: "", type: "" };

//Show tasks
const getAllTasks = async (req, res) => {
  try {

    setTimeout(() => {
      obs.message = "";
    }, 5000)
    const tasksList = await Task.find();
    obs.tasksList = tasksList;
    obs.deleteId = null;
    obs.task = null;
    return res.render("index", { obs });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


//Create new task
const createTask = async (req, res) => {
  const task = req.body;
  obs.task = task
  if (!obs.task.task) {
    obs.message = "Enter text before adding the task!";
    obs.type = "danger";
    return res.redirect("/");
  }

  try {
    await Task.create(obs.task);
    obs.message = "Task created successfully!";
    obs.type = "success";
    return res.redirect("/");
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

//Get by id
const getById = async (req, res) => {

  try {
    const task = await Task.findOne({ _id: req.params.id });
    const tasksList = await Task.find();
    obs.task = task;
    obs.tasksList = tasksList;
    obs.message = "";
    res.render("index", { obs });
  } catch (error) {
    console.log({ error: error.message });
  }
}

//Update
const updateTask = async (req, res) => {

  try {
    const task = req.body;
    obs.task = task;
    await Task.updateOne({ _id: req.params.id }, obs.task);
    obs.message = "Task Updated successfully!";
    obs.type = "success";
    res.redirect("/");
  } catch (error) {
    console.log({ error: error.message });
  }
}

//Confirm delete
const confirmDeleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id });
    const tasksList = await Task.find();
    obs.task = task;
    obs.tasksList = tasksList;
    obs.deleteId = req.params.id;
    obs.message = "";
    res.render("index", { obs });
  } catch (error) {
    console.log({ error: error.message });
  }

}

//Deleting tasks
const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete({ _id: req.params.id });
    obs.message = "Task deleted successfully!";
    obs.type = "success";
    res.redirect("/");
  } catch (error) {
    console.log({ error: error.message });
  }
}

//Chcking tasks
const taskCheck = async (req, res) => {
  try {
    let task = await Task.findOne({ _id: req.params.id });
    const tasksList = await Task.find();
    obs.tasksList = tasksList;

    if (task.check) {
      task.check = false;
    } else {
      task.check = true;
    }

    await Task.updateOne({ _id: req.params.id }, task);

    res.redirect("/");

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}



module.exports = { getAllTasks, createTask, getById, updateTask, confirmDeleteTask, deleteTask, taskCheck };
