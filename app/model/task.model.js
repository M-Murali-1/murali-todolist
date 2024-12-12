//importing the get and the all method.
const methods = require("./db");

//Query for selecting all the rows in the tasks table.
exports.findAll = (findData) => {
  let Selectquery = "SELECT * FROM task";
  let placeholder = [];
  console.log(findData);
  for(itr=0;itr<findData.length;itr++) {
    placeholder.push(findData[itr][1]);
    if(itr==0) {
      Selectquery+=" WHERE";
    }
    Selectquery+=` ${findData[itr][0]}=?`;
    if(itr==findData.length-1) {
      continue;
    }
    Selectquery+=" AND ";
  }
  console.log(Selectquery,placeholder);
  
  

  // let value = Object.entries(queries);
  // console.log(value);
  // let taskColumns = [
  //   "content",
  //   "description",
  //   "due_date",
  //   "is_completed",
  //   "created_at",
  //   "project_id",
  // ];
  // if (value.length !== 0) {
  //   Selectquery = `SELECT * FROM tasks WHERE `;
  //   console.log(Selectquery);
  //   let itr = 0;
  //   for (itr = 0; itr < value.length - 1; itr++) {
  //     if (taskColumns.includes(value[itr][0])) {
  //       Selectquery += value[itr][0] + "=? AND ";
  //     }
  //     //console.log(value[itr][0].join("=? AND"));
  //   }
  //   Selectquery += value[itr][0] + "=?;";
  //   console.log(Selectquery);

    // placeholder=value;
  // }
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
exports.updateOne = (data, id) => {
  const updateQuery =
    "UPDATE task SET ";
  const updateData = Object.entries(data);
  console.log(updateData.length);
  
  let placeholder = [];
  console.log(updateData);
  for(itr=0;itr<updateData.length;itr++) {
    updateQuery+=` ${updateData[itr][0]}=?`;
    placeholder.push(updateData[itr][1]);
    if(itr==updateData.length-1) {
      updateQuery+=" WHERE id=?";
      continue;
    }
    updateQuery+=" , ";
    
  console.log(updateQuery);
    
  }
  return methods.runMethod(updateQuery, placeholders);
};
