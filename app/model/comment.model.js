//importing the get and the all method.
const methods = require("./db");

//Query for selecting all the rows in the comment table.
exports.findAll = () => {
  let Selectquery = "SELECT * FROM comment";
  return methods.allMethod(Selectquery, []);
};

// Query for finding the particular row in the user table based on the id.
exports.findOne = (id) => {
  const Selectquery = `SELECT * FROM comment WHERE id=? `;
  return methods.allMethod(Selectquery, [id]);
};

//Query for inserting the single row in the tasks table.
exports.insert = (insert_data) => {
  const insertQuery = "INSERT INTO comment (content,project_id,task_id) VALUES (?,?,?)";
  return methods.runMethod(insertQuery, insert_data);
};

// Query for deleting the particular row from the user table based on the id.
exports.deleteOne = (id) => {
  const deleteQuery = "DELETE FROM comment WHERE id =?";
  return methods.runMethod(deleteQuery, [id]);
};

exports.updateOne = (data, id) => {
  const updateQuery = "UPDATE comment SET content=?,project_id=?,task_id=? WHERE id=?";
  const placeholders = [data.content, data.project_id,data.task_id, id];
  console.log(placeholders);
  
  return methods.runMethod(updateQuery, placeholders);
};


// Query for deleting the complete tasks table.
exports.deleteAll = () => {
    const deleteQuery = "DELETE FROM comment";
    return methods.runMethod(deleteQuery, []);
  };