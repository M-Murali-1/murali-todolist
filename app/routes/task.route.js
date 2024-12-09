const express = require("express");
const task = require("../controller/task.controller");
const router = express.Router();
const app = express();
app.use(express.json());

// Inserting the Project into the Projects table.
router.post("/",task.insertOne);

//Getting all the projects present in the database
router.get("/",task.getAll);

//Getting the task based on it id.
router.get("/:id",task.getOne);

//Deleting the particular row based on the id
router.delete("/:id",task.deleteOne);

//Deleting all the projects
router.delete("/",task.deleteAll);

//Updating the existing tasks
router.put("/:id",task.updateOne);
module.exports = router;