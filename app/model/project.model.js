//importingthe get and the all method.
const methods = require("./db");

//Query for inserting the single row in the project table.
exports.insert = (insert_data) => {
  const insertQuery =
    "INSERT INTO project (name,color,is_favourite) VALUES (?,?,?)";
  return methods.runMethod(insertQuery, insert_data);
};

//Query for selecting all the rows in the project table.
exports.findAll = (queries) => {
  let Selectquery = "SELECT * FROM project";
  console.log(queries.name);
  let placeholder = [];
  if (queries.name !== undefined) {
    Selectquery = `SELECT * FROM project WHERE name LIKE ? `;
    placeholder.push(queries.name);
  }
  return methods.allMethod(Selectquery, placeholder);
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
exports.updateOne = (data, id) => {
  const updateQuery =
    "UPDATE project SET name=?,color=?,is_favourite=? WHERE id=?";
  const placeholders = [data.name, data.color, data.is_favourite, id];
  return methods.runMethod(updateQuery, placeholders);
};
