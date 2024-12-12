const express = require("express");

// Importing the comment model here.
const comment = require("../model/comment.model.js");


// Logic for getting all the comments.
exports.getAll = async (req, res) => {
  try {
    const rows = await comment.findAll();
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({
      message:
        err.message || "Error while fetching the data from the database..!",
    });
  }
};

//Logic for getting the particular row based on the id from the comments table.
exports.getOne = async (req, res) => {
  try {
    let id = Number(req.params.id);
    const data = await comment.findOne(id);
    res.send(data);
  } catch (err) {
    res.status(500).json({
      message: err || "Error while fetching the data from the database..!",
    });
  }
};


//Logic for inserting the single row in the comment table.
exports.insertOne = async (req, res) => {
  try {
    let insert_data = {
      content: req.body.content,
      project_id: req.body.project_id,
      task_id:req.body.task_id
    };
    const data = await comment.insert(Object.values(insert_data));
    res.send({ id: data.lastID, ...insert_data });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Logic for deleting the particular user based on the id from the user table.
exports.deleteOne = async (req, res) => {
  try {
    let id = Number(req.params.id);
    const data = await comment.deleteOne(id);
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
      const data = comment.deleteAll();
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
      let insert_data = {
        content: req.body.content,
        project_id: req.body.project_id,
        task_id:req.body.task_id
      };
      const data = comment.updateOne(insert_data, id);
      if (data.changed === 0) {
        return res
          .status(404)
          .json({ message: "No user found with the given ID" });
      } else {
        res.status(200).json({ message: "user updated successfully" });
      }
    } catch (err) {
      res.status(500).json({
        message: err || "Error while updating the data from the database..!",
      });
    }
  };