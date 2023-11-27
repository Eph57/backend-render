require("dotenv").config();

const express = require("express");
const port = 8080;
const app = express();

// Define router
const locationsRouter = express.Router();
locationsRouter.use(express.json());

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

const server = app
  .listen(port, () => {
    console.log(`SERVER: listening on port ${port}.`);
    //console.log(process.env); // ADD THIS!!
  })
  .on("error", (err) => {
    console.error("SERVER: Error starting server: ", err);
    process.exit(1);
  });

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/api/locations", locationsRouter);
locationsRouter.get("/", (req, res) => {
  connection.query(`SELECT * FROM locations`, (err, locations) => {
    if (err) {
      console.log(err);
    }
    res.send(locations);
  });
});
