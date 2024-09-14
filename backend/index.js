const express = require("express");
const cors = require("cors");
const connectDB = require("./database/db"); 
require('dotenv').config();
const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


connectDB();


const authRouter = require("./routes/auth");
app.use("/api/auth", authRouter);
const tasksRouter = require("./routes/tasks");
app.use("/api", tasksRouter);


app.get("/", (req, res) => {
  res.send("Backend is running");
});

const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
