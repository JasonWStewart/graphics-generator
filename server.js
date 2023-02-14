const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const generatorRouter = require("./routes/generator.router");
app.use(cors({ origin: "http://localhost:3000" }));
app.use(morgan("short"));
app.use(express.json());

app.use("/generator", generatorRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
