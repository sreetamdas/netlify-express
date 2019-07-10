"use strict";
const express = require("express");
const serverless = require("serverless-http");
const app = express();
const bodyParser = require("body-parser");
const puppeteer = require("puppeteer");

const router = express.Router();
router.get("/", (req, res) => {
  console.log("//////");
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>Hello from Express.js! asdasdasda</h1>");
  res.end();
});
router.get("/another", (req, res) => {
  // res.json({ route: req.originalUrl })
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("<h1>Hello 2 from Express.js! qqweqweqwe</h1>");
  res.end();
});
router.get("/chrome", (req, res) => {
  const puppeteer = require("puppeteer");
  console.log("here");

  let scrape = async () => {
    console.log("here");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("http://microland.greythr.com");
    await page.click("#userNameInput");
    await page.waitFor(1000);

    const result = await page.evaluate(() => {
      let username = document.querySelector("#userNameInput").placeholder;

      return {
        username,
      };
    });

    browser.close();
    console.log({ result });
  };

  scrape().then(() => {
    console.log("qwe"); // Success!
    res.status(200).send(result);
  });
});
router.post("/", (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use("/.netlify/functions/server", router); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
