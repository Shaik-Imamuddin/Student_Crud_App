const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Your_SQL_Password",
  database: "studentregdb"
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected");
});

app.get("/api/students",(req,res)=>{
  const { search, branch } = req.query;

  let sql = "SELECT * FROM students WHERE 1=1";

  if (search) sql += ` AND name LIKE '%${search}%'`;
  if (branch) sql += ` AND department='${branch}'`;

  db.query(sql,(err,result)=>{
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

app.get("/api/students/:regno",(req,res)=>{
  const sql = "SELECT * FROM students WHERE regno=?";
  db.query(sql, [req.params.regno], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result[0]);
  });
});

app.post("/api/students",(req,res)=>{
  const {regno,name,email,department} = req.body;
  const sql = "INSERT INTO students (regno, name, email, department) VALUES (?,?,?,?)";

  db.query(sql,[regno,name,email,department],(err)=>{
    if (err) return res.status(500).send(err);
    res.send({ message: "Student added" });
  });
});

app.put("/api/students/:regno",(req,res)=>{
  const {name,email,department} = req.body;
  const sql = "UPDATE students SET name=?, email=?, department=? WHERE regno=?";

  db.query(sql,[name, email, department, req.params.regno],(err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Student updated" });
  });
});


app.delete("/api/students/:regno",(req,res)=>{
  const sql = "DELETE FROM students WHERE regno=?";
  db.query(sql,[req.params.regno],(err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Student deleted" });
  });
});

app.listen(2000, () => console.log("Server running on port 2000"));