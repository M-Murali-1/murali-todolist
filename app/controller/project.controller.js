const express = require("express");

//Importing the project model here.
const project = require("../model/project.model");

// Logic for getting all the Projects.
exports.getAll = (req, res) => {
  project.findAll(req.query, (err, data) => {
    if (err) {
      res.status(500).json({
        message: err || "Error while fetching the data from the database..!",
      });
      return;
    }
    res.send(data);
  });
};

//Logic for inserting the single row in the Project table.
exports.insertOne = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Name of the project is required..!" });
  }
  let insert_data = {
    name: req.body.name,
    color: req.body.color,
    is_favourite: req.body.is_favourite || 0,
  };
  project.insert(Object.values(insert_data), (err, data) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ id: data, ...insert_data });
  });
};

//Logic for getting the particular row based on the id from the project table.
exports.getOne = (req, res) => {
  let id = Number(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ message: "Invalid ID Number" });
  }
  project.findOne(id, (err, data) => {
    if (err) {
      res.status(500).json({
        message: err || "Error while fetching the data from the database..!",
      });
      return;
    }
    res.send(data);
  });
};

// Logic for deleting the particular based on the id from the project table.
exports.deleteOne = (req, res) => {
  let id = Number(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ message: "Invalid ID Number" });
  }
  project.deleteOne(id, (err, data) => {
    if (err) {
      res.status(500).json({
        message: err || "Error while deleting the data from the database..!",
      });
      return;
    }
    if (data === 0) {
      return res
        .status(404)
        .json({ message: "No project found with the given ID" });
    } else {
      res.status(200).json({ message: "Project deleted successfully" });
    }
  });
};

//Logic for deleting all the rows from the project table.
exports.deleteAll = (req, res) => {
  project.deleteAll((err, data) => {
    if (err) {
      res.status(500).json({
        message: err || "Error while deleting the data from the database..!",
      });
      return;
    }
    res.status(200).json({ message: data });
  });
};

//Logic for updating the particular based on the id from the project table.
exports.updateOne = (req, res) => {
  let id = Number(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ message: "Invalid ID Number" });
  }
  if (!req.body.name) {
    res.status(400).send({ message: "Name of the project is required..!" });
  }
  let insert_data = {
    name: req.body.name,
    color: req.body.color,
    is_favourite: req.body.is_favourite || 0,
  };
  project.updateOne(insert_data, id, (err, data) => {
    if (err) {
      res.status(500).json({
        message: err || "Error while updating the data from the database..!",
      });
      return;
    }
    if (data === 0) {
      return res
        .status(404)
        .json({ message: "No project found with the given ID" });
    } else {
      res.status(200).json({ message: "Project updated successfully" });
    }
  });
};
