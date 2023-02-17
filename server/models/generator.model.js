const path = require("path");
const puppeteer = require("puppeteer");

const availableTemplates = [
  {
    templateId: 1,
    name: "Final Score",
    location: `file://${path.join(__dirname, "..", "templates", "final-score", "final-score.html")}`,
    setFunction: require(path.join(__dirname, "..", "templates", "final-score", "final-score.js")),
  },
  {
    templateId: 2,
    name: "Upcoming Match",
    location: `file://${path.join(__dirname, "..", "templates", "upcoming-match", "upcoming-match.html")}`,
    setFunction: require(path.join(__dirname, "..", "templates", "upcoming-match", "upcoming-match.js")),
  },
];

async function generateImage(templateId, input) {
  const template = availableTemplates.find((el) => el.templateId == templateId);
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome",
    headless: true,
    args: ["--no-sandbox"],
  });
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
