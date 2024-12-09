const express = require("express");

// Importing the task model here.
const task = require("../model/task.model.js");

// Logic for getting all the Tasks.
exports.getAll = (req, res) => {
  task.findAll(req.query, (err, data) => {
    if (err) {
      res.status(500).json({
        message: err || "Error while fetching the data from the database..!",
      });
      return;
    }
    res.send(data);
  });
};

//Logic for inserting the single row in the tasks table.
exports.insertOne = (req, res) => {
  let insert_data = {
    content: req.body.content,
    description: req.body.description,
    due_date: `${req.body.due_date} 00:00:00`,
    project_id: req.body.project_id,
    is_completed: req.body.is_completed || 0,
  };
  task.findprojectID(req.body.project_id, (err, data) => {
    if (data.length == 0) {
      res.status(404).json({ message: "Invalid Project ID" });
      return;
    } else {
      task.insert(Object.values(insert_data), (err, data) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
        task.findOne(data, (err, rows) => {
          res.send(rows);
        });
      });
    }
  });
};

//Logic for getting the particular row based on the id from the tasks table.
exports.getOne = (req, res) => {
  let id = Number(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ message: "Invalid ID Number" });
  }
  task.findOne(id, (err, data) => {
    if (err) {
      res.status(500).json({
        message: err || "Error while fetching the data from the database..!",
      });
      return;
    }
    res.send(data);
  });
};

// Logic for deleting the particular based on the id from the tasks table.
exports.deleteOne = (req, res) => {
  let id = Number(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ message: "Invalid ID Number" });
  }
  task.deleteOne(id, (err, data) => {
    if (err) {
      res.status(500).json({
        message: err || "Error while deleting the data from the database..!",
      });
      return;
    }
    if (data === 0) {
      return res
        .status(404)
        .json({ message: "No Tasks found with the given ID" });
    } else {
      res.status(200).json({ message: "Task deleted successfully" });
    }
  });
};


//Logic for deleting all the rows from the tasks table.
exports.deleteAll = (req, res) => {
  task.deleteAll((err, data) => {
    if (err) {
      res.status(500).json({
        message: err || "Error while deleting the data from the database..!",
      });
      return;
    }
    res.status(200).json({ message: data });
  });
};

//Updating the particular based on the id from the tasks table.
exports.updateOne = (req, res) => {
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
  task.updateOne(insert_data, id, (err, data) => {
    if (err) {
      res.status(500).json({
        message: err || "Error while updating the data from the database..!",
      });
      return;
    }
    if (data === 0) {
      return res
        .status(404)
        .json({ message: "No task found with the given ID" });
    } else {
      res.status(200).json({ message: "task updated successfully" });
    }
  });
};
