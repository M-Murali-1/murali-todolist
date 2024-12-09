const express = require("express");
const project = require("./app/routes/project.route");
const task = require("./app/routes/task.route");
const app = express();


//Using the Middleware for the getting body data
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Using the Project Route
app.use("/project",project);
//Using the Tasks Route
app.use("/task",task);

const PORT = 5000;
app.listen(PORT);