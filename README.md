# Student_Crud_App
Crud_App using React.js, node.js, Express.js and SQL

Frontend:

create react_app:

npx create-react-app frontend
cd frontend

libraries need to install:

npm install react-router-dom


Run the frontend using below command:

npm start




backend:

libraries need to install:

npm install express mysql2 cors

To run the project:

git clone <your-repo-url>
cd <project-folder>


Update sql password in sql connection

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Your_SQL_Password",
  database: "studentregdb"
});


start the server using below command
node server.js


Schema:

Database:

CREATE DATABASE studentregdb;
USE studentregdb;

Table:

CREATE TABLE students(
  regno INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100),
  department VARCHAR(50)
);