const express = require("express");
const user = require("../controller/user.controller.js");
const router = express.Router();
const validation = require("../middleware/validations");
const app = express();
app.use(express.json());



//Getting all the users present in the database
router.get("/",user.getAll);

//Getting the user based on it id.
router.get("/:id",validation.validateId,user.getOne);

// Inserting the new user into the user table.
router.post("/",user.insertOne);

//Deleting the particular row based on the id of the user
router.delete("/:id",validation.validateId,user.deleteOne);

//Updating the existing user
router.put("/:id",validation.validateId,user.updateOne);

//Deleting all the users
router.delete("/",user.deleteAll);

module.exports = router;