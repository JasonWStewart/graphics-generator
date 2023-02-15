const path = require("path");
const puppeteer = require("puppeteer");

const availableTemplates = [
  {
    templateId: 1,
    name: "Final Score",
    location: `file://${path.join(__dirname, "..", "templates", "final-score", "final-score.html")}`,
    setFunction: require(path.join(__dirname, "..", "templates", "final-score", "final-score.js")),
  },
];

async function generateImage(templateId, input) {
  const template = availableTemplates.find((el) => el.templateId == templateId);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(template.location);
  await page.evaluate(template.setFunction, input);
  const clipContainer = await page.$("#clip-container");
  const clip = await clipContainer.boundingBox();
  const imageBuffer = await page.screenshot({ clip, type: "png", encoding: "binary" });
  await browser.close();
  return imageBuffer;
}

module.exports = {
  availableTemplates,
  generateImage,
};
