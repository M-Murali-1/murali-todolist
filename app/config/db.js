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

//Creating the Project table.
const projectTable = `CREATE TABLE IF NOT EXISTS project (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    color TEXT,
                    is_favourite BOOLEAN DEFAULT 0
)`;
db.run(projectTable, (err) => {
  if (err) {
    console.log("Error while creating the Project table..!");
  } else {
    console.log("Projects table created successfully..!");
  }
});

// Creating the task table.
const tasksTable = `CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    description TEXT,
    due_date DATETIME,
    is_completed BOOLEAN DEFAULT 0,
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

//Sending the path of the database.
//let required = path.join(__dirname, dbPath);
module.exports =db;
