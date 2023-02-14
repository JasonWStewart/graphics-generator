const express = require("express");
const { handleGenerationRequest } = require("../controllers/generator.controller");

const generatorRouter = express.Router();

generatorRouter.post("/:templateId", handleGenerationRequest);

module.exports = generatorRouter;
