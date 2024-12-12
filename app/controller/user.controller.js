const express = require("express");

// Importing the user model here.
const user = require("../model/user.model.js");

// Logic for getting all the Tasks.
exports.getAll = async (req, res) => {
  try {
    const rows = await user.findAll();
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({
      message:
        err.message || "Error while fetching the data from the database..!",
    });
  }
};

//Logic for getting the particular row based on the id from the user table.
exports.getOne = async (req, res) => {
  try {
    let id = Number(req.params.id);
    const data = await user.findOne(id);
    res.send(data);
  } catch (err) {
    res.status(500).json({
      message: err || "Error while fetching the data from the database..!",
    });
  }
};

//Logic for inserting the single row in the user table.
exports.insertOne = async (req, res) => {
  try {
    let insert_data = {
      name: req.body.name,
      email: req.body.email,
    };
    const data = await user.insert(Object.values(insert_data));
    res.send({ id: data.lastID, ...insert_data });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// Logic for deleting the particular user based on the id from the user table.
exports.deleteOne = async (req, res) => {
  try {
    let id = Number(req.params.id);
    const data = await user.deleteOne(id);
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

//Updating the particular based on the id from the tasks table.
exports.updateOne = (req, res) => {
  try {
    let id = Number(req.params.id);
    let insert_data = {
      name: req.body.name,
      email: req.body.email
    };
    const data = user.updateOne(insert_data, id);
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
 //Logic for deleting all the rows from the tasks table.
exports.deleteAll = (req, res) => {
    try {
      const data = user.deleteAll();
      res.status(200).json({ message: "All rows are deleted successfuly..! " });
    } catch (err) {
      res.status(500).json({
        message: err || "Error while deleting the data from the database..!",
      });
    }
  };