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


function runMethod(query,placeholder) {
    return new Promise((resolve, reject) => {
        db.run(query,placeholder,function(err) {
            if(err) {
                return reject(err);
            }
            resolve(this);
        })
    })
}
module.exports = { allMethod,runMethod };
