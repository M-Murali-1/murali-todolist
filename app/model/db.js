const sqlite3 = require("sqlite3");
const db = require("../config/db");

function allMethod(query, placeholders) {
  return new Promise((resolve, reject) => {
    db.all(query, placeholders, function (err, data) {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
}

function runMethod(query, placeholder) {
  return new Promise((resolve, reject) => {
    db.run(query, placeholder, function (err) {
      if (err) {
        return reject(err);
      }
      resolve(this);
    });
  });
}

function constructUpdateQuery(updateQuery,array_data) {
  let placeholders=[];
  for(let i=0;i<array_data.length;i++) {
    console.log(`${array_data[i][0]}=?`);
    placeholders.push(array_data[i][1]);
    updateQuery+=`${array_data[i][0]}=?`;
    if(i==array_data.length-1) {
      updateQuery+=" WHERE id=?";
      continue;
    }
    updateQuery+=`,`
  }
  console.log(updateQuery,placeholders);
  
  return {updateQuery,placeholders};
}
function constructSelectQuery(SelectQuery,findData) {
  let placeholder=[];
  for (itr = 0; itr < findData.length; itr++) {
    placeholder.push(findData[itr][1]);
    if (itr == 0) {
      SelectQuery += " WHERE";
    }
    SelectQuery += ` ${findData[itr][0]}=?`;
    if (itr == findData.length - 1) {
      continue;
    }
    SelectQuery += " AND ";
  }
  return {SelectQuery,placeholder};

}
module.exports = { allMethod, runMethod,constructUpdateQuery,constructSelectQuery };
