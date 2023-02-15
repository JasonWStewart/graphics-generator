const { generateImage } = require("../models/generator.model");

async function handleGenerationRequest(req, res) {
  const templateId = req.params.templateId;
  const input = req.body;

  const generatedImage = await generateImage(templateId, input);
  console.log(`\nRecieved a generation request with body ${JSON.stringify(input)}.\n`);
  res.set("Content-Type", "image/png");
  res.send(generatedImage);
}

module.exports = {
  handleGenerationRequest,
};
