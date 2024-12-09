const sqlite3 = require("sqlite3");
const dbPath = require("../config/db").databasename;

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error while connecting the Database..!");
  } else {
    console.log("Connected to the database Successfully..!");
  }
});


// Finding all the rows and the particular row based on the name as query
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
    // console.log(data);

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
    // if (rows.length === 0) {
    //   callback(new Error("No row is present with the given id..!"), null);
    // }
    callback(null, rows);
  });
};


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


exports.findOne = (id, callback) => {
  const Selectquery = `SELECT * FROM tasks WHERE id=? `;
  db.all(Selectquery, [id], (err, rows) => {
    if (err) {
      callback(err, null);
    }
    // if (rows.length === 0) {
    //   callback(new Error("No row is present with the given id..!"), null);
    // }
    callback(null, rows);
  });
};



exports.deleteOne = (id,callback)=>{
  const deleteQuery = "DELETE FROM tasks WHERE id =?";
  db.run(deleteQuery,[id],function (err) {
    if(err) {
      callback(err,null);
    }
    // console.log(this.changes);
    callback(null,this.changes);
  })
}

exports.deleteAll = (callback)=>{
  const deleteQuery = "DELETE FROM tasks";
  db.run(deleteQuery,[],function (err) {
    if(err) {
      callback(err,null);
    }
    callback(null,"All rows are deleted successfuly..!")
  })
}


exports.updateOne=(data,id,callback)=>{
  const updateQuery = "UPDATE tasks SET content=?,description=?,due_date=?,project_id=?,is_completed=? WHERE id=?";
  db.run(updateQuery,[data.content,data.description,data.due_date,data.project_id,data.is_completed,id],function (err) {
    if(err) {
      callback(err,null);
    }
    callback(null,this.changed);
  })
  
  }