const sqlite3 = require("sqlite3");
const db = require("../config/db");

//Query for inserting the single row in the project table.
exports.insert = (insert_data, callback) => {
  const insertQuery =
    "INSERT INTO project (name,color,is_favourite) VALUES (?,?,?)";
  db.run(insertQuery, insert_data, function (err) {
    if (err) {
      callback(err, null);
      return;
    }
    console.log(this.lastID);

    callback(null, this.lastID);
  });
};

//Query for selecting all the rows in the project table.
exports.findAll = (queries, callback) => {
  let Selectquery = "SELECT * FROM project";
  console.log(queries.name);
  let placeholder = [];
  if (queries.name !== undefined) {
    Selectquery = `SELECT * FROM project WHERE name LIKE ? `;
    placeholder.push(queries.name);
  }
  db.all(Selectquery, placeholder, (err, data) => {
    if (err) {
      callback(err, null);
    }
    console.log(data);

    callback(null, data);
  });
};

// Query for finding the particular row in the project table based on the id.
exports.findOne = (id, callback) => {
  const Selectquery = `SELECT * FROM project WHERE id=? `;
  db.all(Selectquery, [id], (err, rows) => {
    if (err) {
      callback(err, null);
    }
    callback(null, rows);
  });
};

// Query for deleting the particular row from the project table based on the id.
exports.deleteOne = (id,callback)=>{
  const deleteQuery = "DELETE FROM project WHERE id =?";
  db.run(deleteQuery,[id],function (err) {
    if(err) {
      callback(err,null);
    }
    console.log(this.changes);
    callback(null,this.changes);
  })
}

// Query for deleting the complete project table.
exports.deleteAll = (callback)=>{
  const deleteQuery = "DELETE FROM project";
  db.run(deleteQuery,[],function (err) {
    if(err) {
      callback(err,null);
    }
    callback(null,"All rows are deleted successfuly..!")
  })
}

// Query for updating the particular row based on the id in the project table
exports.updateOne=(data,id,callback)=>{
const updateQuery = "UPDATE project SET name=?,color=?,is_favourite=? WHERE id=?";
db.run(updateQuery,[data.name,data.color,data.is_favourite,id],function (err) {
  if(err) {
    callback(err,null);
  }
  callback(null,this.changed);
})

}