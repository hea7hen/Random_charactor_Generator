const sqlite3 = require('sqlite3').verbose();

// Create a new database instance and open the database
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Error opening database', err.message);
        return;
    }
    console.log('Connected to the SQLite database.');
});

// Create tables
db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);`, (err) => {
    if (err) {
        console.error('Error creating table', err.message);
    } else {
        console.log("Table 'users' created or already exists.");
    }
});

// Close the database connection
db.close((err) => {
    if (err) {
        console.error('Error closing database', err.message);
    }
    console.log('Closed the database connection.');
});