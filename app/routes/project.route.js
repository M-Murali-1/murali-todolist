const express = require("express");
const validation = require("../middleware/validations");
const project = require("../controller/project.controller");
const router = express.Router();
const app = express();
app.use(express.json());

// Inserting the Project into the Projects table.
router.post("/",validation.validateProjectInsertion,project.insertOne);

//Getting all the projects present in the database
router.get("/",project.getAll);

//Getting the project based on it id.
router.get("/:id",validation.validateId,project.getOne);

//Deleting the particular row based on the id
router.delete("/:id",validation.validateId,project.deleteOne);

//Deleting all the projects
router.delete("/",project.deleteAll);

//Updating the existing projects
router.put("/:id",validation.validateId,project.updateOne);
module.exports = router;