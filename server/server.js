const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const app = express();
const { unlink } = require("node:fs");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./uploads/");
  },
  filename: (req, file, callBack) => {
    callBack(null, `${Date.now()}-${file.originalname}`);
  },
});
let upload = multer({ storage: storage });
let currentFile = "";

const generatorRouter = require("./routes/generator.router");

app.use(cors({ origin: "http://localhost:3000" })); //DONT LEAVE IT LIKE THIS

app.use(morgan("short"));
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "build")));

app.use("/generator", generatorRouter);

app.post("/upload", upload.single("file"), (req, res, next) => {
  if (currentFile) {
    unlink(`./uploads/${currentFile}`, (err) => {
      console.log(err ? err : `deleted ${currentFile}`);
    });
  }

  const file = req.file;
  currentFile = file.filename;
  console.log(file.filename);
  if (!file) {
    const error = new Error("No File");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file.filename);
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
