const express = require("express");
const comment = require("../controller/comment.controller.js");
const router = express.Router();
const validation = require("../middleware/validations");
const app = express();
app.use(express.json());


//Getting all the comments present in the database
router.get("/",comment.getAll);

//Getting the comment based on it id.
router.get("/:id",validation.validateId,comment.getOne);

// Inserting the new user into the comment table.
router.post("/",comment.insertOne);

//Deleting the particular row based on the id of the comments
router.delete("/:id",validation.validateId,comment.deleteOne);

//Updating the existing comment
router.put("/:id",validation.validateId,comment.updateOne);

//Deleting all the comments
router.delete("/",comment.deleteAll);
module.exports=router;