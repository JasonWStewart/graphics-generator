const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const app = express();

const generatorRouter = require("./routes/generator.router");

app.use(cors({ origin: "http://localhost:3000" })); //DONT LEAVE IT LIKE THIS

app.use(morgan("short"));
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "build")));

app.use("/generator", generatorRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
