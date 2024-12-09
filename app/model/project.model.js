const sqlite3 = require("sqlite3");
const dbPath = require("../config/db").databasename;

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error while connecting the Database..!");
  } else {
    console.log("Connected to the database Successfully..!");
  }
});

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
// Finding all the rows and the particular row based on the name as query
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

exports.findOne = (id, callback) => {
  const Selectquery = `SELECT * FROM project WHERE id=? `;
  db.all(Selectquery, [id], (err, rows) => {
    if (err) {
      callback(err, null);
    }
    callback(null, rows);
  });
};

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

exports.deleteAll = (callback)=>{
  const deleteQuery = "DELETE FROM project";
  db.run(deleteQuery,[],function (err) {
    if(err) {
      callback(err,null);
    }
    callback(null,"All rows are deleted successfuly..!")
  })
}

exports.updateOne=(data,id,callback)=>{
const updateQuery = "UPDATE project SET name=?,color=?,is_favourite=? WHERE id=?";
db.run(updateQuery,[data.name,data.color,data.is_favourite,id],function (err) {
  if(err) {
    callback(err,null);
  }
  callback(null,this.changed);
})

}