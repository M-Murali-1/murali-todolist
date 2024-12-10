const express = require("express");

// Importing the task model here.
const task = require("../model/task.model.js");

// Logic for getting all the Tasks.
exports.getAll = async (req, res) => {
  try {
    const rows = await task.findAll(req.query);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({
      message: err || "Error while fetching the data from the database..!",
    });
  }
};

//Logic for inserting the single row in the tasks table.
exports.insertOne = async (req, res) => {
  try {
    let insert_data = {
      content: req.body.content,
      description: req.body.description,
      due_date: `${req.body.due_date} 00:00:00`,
      project_id: req.body.project_id,
      is_completed: req.body.is_completed || 0,
    };
    console.log(insert_data);
    
    const data = await task.findprojectID(req.body.project_id);
    console.log(data.length);
    
    if (data.length === 0) {
      res.status(404).json({ message: "Invalid Project ID" });
      return;
    }
    const data1 = await task.insert(Object.values(insert_data));
    res.send({id:data1.lastID,...insert_data});
  } catch (err) {
    res.status(404).json({ message: "Invalid Project ID" });
  }
};

//Logic for getting the particular row based on the id from the tasks table.
exports.getOne = async (req, res) => {
  try {
    let id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "Invalid ID Number" });
    }
    const data = await task.findOne(id);
    res.send(data);
  } catch (err) {
    res.status(500).json({
      message: err || "Error while fetching the data from the database..!",
    });
  }
};

// Logic for deleting the particular based on the id from the tasks table.
exports.deleteOne = async (req, res) => {
  try {
    let id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "Invalid ID Number" });
    }
    const data = await task.deleteOne(id);
    if (data.changed === 0) {
      return res
        .status(404)
        .json({ message: "No Tasks found with the given ID" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: err || "Error while deleting the data from the database..!",
    });
  }
};

//Logic for deleting all the rows from the tasks table.
exports.deleteAll = (req, res) => {
  try {
    const data = task.deleteAll();
    res.status(200).json({ message: "All rows are deleted successfuly..! " });
  } catch (err) {
    res.status(500).json({
      message: err || "Error while deleting the data from the database..!",
    });
  }
};

//Updating the particular based on the id from the tasks table.
exports.updateOne = (req, res) => {
  try {
    let id = Number(req.params.id);
    if (isNaN(id) || id <= 0) {
      return res.status(400).json({ message: "Invalid ID Number" });
    }
    let insert_data = {
      content: req.body.content,
      description: req.body.description,
      due_date: `${req.body.due_date} 00:00:00`,
      project_id: req.body.project_id,
      is_completed: req.body.is_completed || 0,
    };
    console.log(insert_data);
    
    const data = task.updateOne(insert_data, id);
    if (data.changed === 0) {
      return res
        .status(404)
        .json({ message: "No task found with the given ID" });
    } else {
      res.status(200).json({ message: "task updated successfully" });
    }
  } catch (err) {
    res.status(500).json({
      message: err || "Error while updating the data from the database..!",
    });
  }
};
