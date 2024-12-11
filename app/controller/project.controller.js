const express = require("express");

//Importing the project model here.
const project = require("../model/project.model");

// Logic for getting all the Projects.
exports.getAll = async (req, res) => {
  try {
    const rows = await project.findAll(req.query);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({
      message: err || "Error while fetching the data from the database..!",
    });
  }
};

//Logic for inserting the single row in the Project table.
exports.insertOne = async (req, res) => {
  try {
    let insert_data = {
      name: req.body.name,
      color: req.body.color,
      is_favourite: req.body.is_favourite || 0,
      user_id:req.body.user_id
    };
    const data = await project.insert(Object.values(insert_data));
    res.json({ id: data.lastID, ...insert_data });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

//Logic for getting the particular row based on the id from the project table.
exports.getOne = async (req, res) => {
  try {
    let id = Number(req.params.id);
    const data = await project.findOne(id);
    res.send(data);
  } catch (err) {
    res.status(500).json({
      message: err || "Error while fetching the data from the database..!",
    });
  }
};

// Logic for deleting the particular based on the id from the project table.
exports.deleteOne = async (req, res) => {
  try {
    let id = Number(req.params.id);
    const data = await project.deleteOne(id);
    if (data.changes === 0) {
      return res
        .status(404)
        .json({ message: "No project found with the given ID" });
    } else {
      res.status(200).json({ message: "Project deleted successfully" });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || "Error while deleting the data from the database..!",
    });
  }
};

//Logic for deleting all the rows from the project table.
exports.deleteAll = async (req, res) => {
  try {
    const data = await project.deleteAll();
    res.status(200).json({ message: `No.of rows projects deleted ${data}` });
  } catch (err) {
    res.status(500).json({
      message: err || "Error while deleting the data from the database..!",
    });
  }
};

//Logic for updating the particular based on the id from the project table.
exports.updateOne = async (req, res) => {
  try {
    let id = Number(req.params.id);
    let insert_data = {
      name: req.body.name,
      color: req.body.color,
      is_favourite: req.body.is_favourite || 0,
      user_id:req.body.user_id
    };
    const data = project.updateOne(insert_data, id);
    if (data.changes === 0) {
      return res
        .status(404)
        .json({ message: "No project found with the given ID" });
    }
    res.status(200).json({ message: "Project updated successfully" });
  } catch (err) {
    res.status(500).json({
      message: err || "Error while updating the data from the database..!",
    });
  }
};
