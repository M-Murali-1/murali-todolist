const sqlite3 = require("sqlite3");
const path = require("path");

// Define the absolute path to the database file
const dbPath = path.resolve(__dirname, "../config/database.db");
console.log(dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    //console.log("Error while creating the database..!");
  } else {
    console.log("Database had been created successfully..!");
    // Enabling the Foreign keys or the table projects
    db.run("PRAGMA foreign_keys = ON;", (err) => {
      if (err) {
        console.error("Failed to enable foreign keys:", err.message);
      } else {
        console.log("Foreign keys are enabled.");
      }
    });
  }
});

//Creating the User table.
const userTable = `CREATE TABLE IF NOT EXISTS user (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL,
                    UNIQUE(name,email)
  )`;
db.run(userTable, (err) => {
  if (err) {
    console.log("Error while creating the user table..!");
  } else {
    console.log("User table created successfully..!");
  }
});

//Creating the Project table.
const projectTable = `CREATE TABLE IF NOT EXISTS project (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    color TEXT,
                    is_favourite BOOLEAN DEFAULT FALSE,
                    user_id INTEGER,
                    FOREIGN KEY(user_id) REFERENCES user(id) ON DELETE CASCADE
)`;
db.run(projectTable, (err) => {
  if (err) {
    console.log("Error while creating the Project table..!");
  } else {
    console.log("Projects table created successfully..!");
  }
});

// Creating the task table.
const tasksTable = `CREATE TABLE IF NOT EXISTS task (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    description TEXT,
    due_date DATETIME,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    project_id INTEGER,
    FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE
)`;

db.run(tasksTable, (err) => {
  if (err) {
    console.log("Error while creating the tasks table..!");
    return;
  }
  console.log("Tasks table had been created successfully..!");
});
const commentTable = `CREATE TABLE IF NOT EXISTS comment (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content TEXT,
  posted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  project_id INTEGER,
  task_id INTEGER,
  FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE,
  FOREIGN KEY (task_id) REFERENCES task(id) ON DELETE CASCADE
)`;
db.run(commentTable,(err)=>{
  if(err) {
    console.log("Error while creating the comments table..!",err.message);
  }
  else {
    console.log("comments table had been created successfully..!");    
  }
})
// db.run(`INSERT INTO user (name, email) VALUES (?, ?)`,
//   ["Murali", "Murali@example.com"],(err)=>{
//   if(err) {
//     console.log("Error occured while inserting the data..!",err.message);
//   }
//   else {
//     console.log("Data inserted..!");
    
//   }
// } )
//Sending the path of the database.
//let required = path.join(__dirname, dbPath);
module.exports = db;
