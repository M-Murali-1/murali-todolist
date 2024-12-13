//importingthe get and the all method.
const methods = require("./db");

//Query for inserting the single row in the project table.
exports.insert = (insert_data) => {
  const insertQuery =
    "INSERT INTO project (name,color,is_favourite,user_id) VALUES (?,?,?,?)";
  return methods.runMethod(insertQuery, insert_data);
};

//Query for selecting all the rows in the project table.
exports.findAll = (findData) => {
  let SelectQuery = "SELECT * FROM project";
  //Dynamically constructing the select query
  let data = methods.constructSelectQuery(SelectQuery,findData);
  return methods.allMethod(data.SelectQuery, data.placeholder);
};

// Query for finding the particular row in the project table based on the id.
exports.findOne = (id) => {
  const Selectquery = `SELECT * FROM project WHERE id=? `;
  return methods.allMethod(Selectquery, [id]);
};

// Query for deleting the particular row from the project table based on the id.
exports.deleteOne = (id) => {
  const deleteQuery = "DELETE FROM project WHERE id =?";
  return methods.runMethod(deleteQuery, [id]);
};

// Query for deleting the complete project table.
exports.deleteAll = () => {
  const deleteQuery = "DELETE FROM project";
  return methods.runMethod(deleteQuery, []);
};

// Query for updating the particular row based on the id in the project table
exports.updateOne = (array_data, id) => {
  let updateQuery = "UPDATE project SET ";
  let data = methods.constructUpdateQuery(updateQuery, array_data);
  data.placeholders.push(id);
  //console.log(updateQuery,placeholders);
  return methods.runMethod(data.updateQuery, data.placeholders);
};
