const express = require("express");
const project = require("../controller/project.controller");
const router = express.Router();
const app = express();
app.use(express.json());


router.get("/",project.getAll);

// Inserting the Project into the Projects table.
router.post("/",project.insertOne);

//Getting all the projects present in the database
router.get("/",project.getAll);

//Getting the project based on it id.
router.get("/:id",project.getOne);

//Deleting the particular row based on the id
router.delete("/:id",project.deleteOne);

//Deleting all the projects
router.delete("/",project.deleteAll);

//Updating the existing projects
router.put("/:id",project.updateOne);
module.exports = router;