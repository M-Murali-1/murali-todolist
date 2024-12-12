const express = require("express");
const task = require("../controller/task.controller");
const router = express.Router();
const validation = require("../middleware/validations");
const app = express();
app.use(express.json());

// Inserting the Project into the Projects table.
router.post("/",validation.validateTaskInsertion,task.insertOne);

//Getting all the projects present in the database
router.get("/",validation.validateTaskSelect,task.getAll);

//Getting the task based on it id.
router.get("/:id",validation.validateId,task.getOne);

//Deleting the particular row based on the id
router.delete("/:id",validation.validateId,task.deleteOne);

//Deleting all the projects
router.delete("/",task.deleteAll);

//Updating the existing tasks
router.put("/:id",validation.validateId,validation.validateTaskSelect,task.updateOne);
module.exports = router;