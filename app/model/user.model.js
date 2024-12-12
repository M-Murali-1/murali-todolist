//importing the get and the all method.
const methods = require("./db");

//Query for selecting all the rows in the user table.
exports.findAll = () => {
  let Selectquery = "SELECT * FROM user";
  return methods.allMethod(Selectquery, []);
};

// Query for finding the particular row in the user table based on the id.
exports.findOne = (id) => {
  const Selectquery = `SELECT * FROM user WHERE id=? `;
  return methods.allMethod(Selectquery, [id]);
};

//Query for inserting the single row in the tasks table.
exports.insert = (insert_data) => {
  const insertQuery = "INSERT INTO user (name,email) VALUES (?,?)";
  return methods.runMethod(insertQuery, insert_data);
};

// Query for deleting the particular row from the user table based on the id.
exports.deleteOne = (id) => {
  const deleteQuery = "DELETE FROM user WHERE id =?";
  return methods.runMethod(deleteQuery, [id]);
};

exports.updateOne = (data, id) => {
  const updateQuery = "UPDATE user SET name=?,email=? WHERE id=?";
  const placeholders = [data.name, data.email, id];
  console.log(placeholders);
  
  return methods.runMethod(updateQuery, placeholders);
};

// Query for deleting the complete tasks table.
exports.deleteAll = () => {
    const deleteQuery = "DELETE FROM user";
    return methods.runMethod(deleteQuery, []);
  };