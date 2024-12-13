//importing the get and the all method.
const methods = require("./db");

//Query for selecting all the rows in the tasks table.
exports.findAll = (findData) => {
  let SelectQuery = "SELECT * FROM task";
  //Dynamically constructing the select query
  let data = methods.constructSelectQuery(SelectQuery, findData);
  return methods.allMethod(data.SelectQuery, data.placeholder);
};

//Finding whether the particular Project ID is present in the project table.
exports.findprojectID = (id) => {
  const Selectquery = `SELECT * FROM project WHERE id=? `;
  return methods.allMethod(Selectquery, [id]);
};

//Query for inserting the single row in the tasks table.
exports.insert = (insert_data) => {
  const insertQuery =
    "INSERT INTO task (content,description,due_date,project_id,is_completed) VALUES (?,?,?,?,?)";
  return methods.runMethod(insertQuery, insert_data);
};

// Query for finding the particular row in the tasks table based on the id.
exports.findOne = (id) => {
  const Selectquery = `SELECT * FROM task WHERE id=? `;
  return methods.allMethod(Selectquery, [id]);
};

// Query for deleting the particular row from the tasks table based on the id.
exports.deleteOne = (id) => {
  const deleteQuery = "DELETE FROM task WHERE id =?";
  return methods.runMethod(deleteQuery, [id]);
};

// Query for deleting the complete tasks table.
exports.deleteAll = () => {
  const deleteQuery = "DELETE FROM task";
  return methods.runMethod(deleteQuery, []);
};

// Query for updating the particular row based on the id in the tasks table.
exports.updateOne = (array_data, id) => {
  let updateQuery = "UPDATE task SET ";
  let data = methods.constructUpdateQuery(updateQuery, array_data);
  console.log("Hello:", data);
  data.placeholders.push(id);
  return methods.runMethod(data.updateQuery, data.placeholders);
};
