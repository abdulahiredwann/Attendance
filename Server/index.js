require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const http = require("http");
const employee = require("./router/Employee");
const hrmanager = require("./router/HRManager");

app.use(express.json());
const server = http.createServer(app);
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
const PORT = process.env.PORT || 4000;

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL database!");
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("Welcome to the Attendance  System API!");
});
app.use("/api/employee", employee);
app.use("/api/hrmanager", hrmanager);
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
