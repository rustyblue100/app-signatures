const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const uri = process.env.ATLAS_URI;
mongoose.connect(process.env.MONGODB_URI || uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const employesRouter = require("./routes/employes");
const usersRouter = require("./routes/userRouter");

app.use("/employes", employesRouter);
app.use("/users", usersRouter);

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

app.timeout = 5000;
