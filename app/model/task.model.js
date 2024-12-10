const sqlite3 = require("sqlite3");
const db = require("../config/db");

//Query for selecting all the rows in the tasks table.
exports.findAll = (queries, callback) => {
  let Selectquery = "SELECT * FROM tasks";
  // console.log(queries.name);
  let placeholder = [];
  if (queries.name !== undefined) {
    Selectquery = `SELECT * FROM tasks WHERE name LIKE ? `;
    placeholder.push(queries.name);
  }
  db.all(Selectquery, placeholder, (err, data) => {
    if (err) {
      callback(err, null);
    }
    callback(null, data);
  });
};

//Finding whether the particular Project ID is present in the project table.
exports.findprojectID = (id, callback) => {
  const Selectquery = `SELECT * FROM project WHERE id=? `;
  db.all(Selectquery, [id], (err, rows) => {
    if (err) {
      callback(err, null);
    }
    callback(null, rows);
  });
};

//Query for inserting the single row in the tasks table.
exports.insert = (insert_data, callback) => {
  const insertQuery =
    "INSERT INTO tasks (content,description,due_date,project_id,is_completed) VALUES (?,?,?,?,?)";
  db.run(insertQuery, insert_data, function (err) {
    if (err) {
      callback(err, null);
      return;
    }
    // console.log(this.lastID);

    callback(null, this.lastID);
  });
};

// Query for finding the particular row in the tasks table based on the id.
exports.findOne = (id, callback) => {
  const Selectquery = `SELECT * FROM tasks WHERE id=? `;
  db.all(Selectquery, [id], (err, rows) => {
    if (err) {
      callback(err, null);
    }
    callback(null, rows);
  });
};

// Query for deleting the particular row from the tasks table based on the id.
exports.deleteOne = (id, callback) => {
  const deleteQuery = "DELETE FROM tasks WHERE id =?";
  db.run(deleteQuery, [id], function (err) {
    if (err) {
      callback(err, null);
    }
    callback(null, this.changes);
  });
};


// Query for deleting the complete tasks table.
exports.deleteAll = (callback) => {
  const deleteQuery = "DELETE FROM tasks";
  db.run(deleteQuery, [], function (err) {
    if (err) {
      callback(err, null);
    }
    callback(null, "All rows are deleted successfuly..!");
  });
};


// Query for updating the particular row based on the id in the tasks table.
exports.updateOne = (data, id, callback) => {
  const updateQuery =
    "UPDATE tasks SET content=?,description=?,due_date=?,project_id=?,is_completed=? WHERE id=?";
  db.run(
    updateQuery,
    [
      data.content,
      data.description,
      data.due_date,
      data.project_id,
      data.is_completed,
      id,
    ],
    function (err) {
      if (err) {
        callback(err, null);
      }
      callback(null, this.changed);
    }
  );
};
