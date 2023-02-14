const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const app = express();

const generatorRouter = require("./routes/generator.router");
app.use(cors({ origin: "http://127.0.0.1:5173" }));
app.use(morgan("short"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "build")));
app.use("/generator", generatorRouter);
app.get("/*", (req, res) => {
  res.sendFile(__dirname, "..", "build", "index.html");
});
app.listen(3000, () => {
  console.log("Server running on port 3000");
});