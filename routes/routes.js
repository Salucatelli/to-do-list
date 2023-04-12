//Consts
const routes = require("express").Router();
const taskController = require("../controller/TaskController")



//Rotas GET
routes.get("/", taskController.getAllTasks);
routes.get("/getById/:id", taskController.getById);
routes.get("/deleteOne/:id", taskController.deleteTask);
routes.get("/deleteConfirm/:id", taskController.confirmDeleteTask);
routes.get("/check/:id", taskController.taskCheck);





//Rotas POST
routes.post("/create", taskController.createTask);
routes.post("/updateOne/:id", taskController.updateTask)



//Export
module.exports = routes;