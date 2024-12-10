//importing the get and the all method.
const methods = require("./db");

//Query for selecting all the rows in the tasks table.
exports.findAll = (queries) => {
  let Selectquery = "SELECT * FROM tasks";
  let placeholder = [];
  if (queries.name !== undefined) {
    Selectquery = `SELECT * FROM tasks WHERE name LIKE ? `;
    placeholder.push(queries.name);
  }
  return methods.allMethod(Selectquery, placeholder);
};

//Finding whether the particular Project ID is present in the project table.
exports.findprojectID = (id) => {
  const Selectquery = `SELECT * FROM project WHERE id=? `;
  return methods.allMethod(Selectquery, [id]);
};

//Query for inserting the single row in the tasks table.
exports.insert = (insert_data) => {
  const insertQuery =
    "INSERT INTO tasks (content,description,due_date,project_id,is_completed) VALUES (?,?,?,?,?)";
  return methods.runMethod(insertQuery, insert_data);
};

// Query for finding the particular row in the tasks table based on the id.
exports.findOne = (id) => {
  const Selectquery = `SELECT * FROM tasks WHERE id=? `;
  return methods.allMethod(Selectquery, [id]);
};

// Query for deleting the particular row from the tasks table based on the id.
exports.deleteOne = (id) => {
  const deleteQuery = "DELETE FROM tasks WHERE id =?";
  return methods.runMethod(deleteQuery, [id]);
};

// Query for deleting the complete tasks table.
exports.deleteAll = () => {
  const deleteQuery = "DELETE FROM tasks";
  return methods.runMethod(deleteQuery, []);
};

// Query for updating the particular row based on the id in the tasks table.
exports.updateOne = (data, id) => {
  const updateQuery =
    "UPDATE tasks SET content=?,description=?,due_date=?,project_id=?,is_completed=? WHERE id=?";
  const placeholders = [
    data.content,
    data.description,
    data.due_date,
    data.project_id,
    data.is_completed,
    id,
  ];
  return methods.runMethod(updateQuery, placeholders);
};
