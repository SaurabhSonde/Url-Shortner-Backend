require("dotenv").config();
const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortid = require("shortid");
//Url model
const Url = require("../models/Url");

// @route POST /api/url/shorten
// @desc Create short URL

router.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;
  const baseUrl = process.env.BASE_URL;

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json({ error: "Invalid base url" });
  }

  // Create url code

  const urlCode = shortid.generate();

  // checking if input field is empty or not

  if (!originalUrl) {
    return res.status(400).json({ error: "Please enter your link!" });
  }

  // check original url

  if (validUrl.isUri(originalUrl)) {
    try {
      let url = await Url.findOne({ originalUrl });

      if (url) {
        return res.json(url.shortUrl);
      } else {
        const shortUrl = baseUrl + "/" + urlCode;

        url = new Url({
          originalUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });

        await url.save();
        return res.json(url.shortUrl);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  } else {
    return res.status(401).json({ error: "Invalid original url" });
  }
});

module.exports = router;
