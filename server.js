const express = require("express");
const project = require("./app/routes/project.route");
const task = require("./app/routes/task.route");
const user = require("./app/routes/user.route");
const comment = require("./app/routes/comment.route");
const app = express();


//Using the Middleware for the getting body data
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Using the Project Route
app.use("/project",project);
//Using the Tasks Route
app.use("/task",task);
//Using the user routes
app.use("/user",user);
//Using the comment routes
app.use("/comment",comment);
const PORT = 5000;
app.listen(PORT);