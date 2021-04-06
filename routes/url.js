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
    return res.status(401).json("Invalid base url");
  }

  // Create url code

  const urlCode = shortid.generate();

  // check original url

  if (validUrl.isUri(originalUrl)) {
    try {
      let url = await Url.findOne({ originalUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + "/" + urlCode;

        url = new Url({
          originalUrl,
          shortUrl,
          urlCode,
          date: new Date(),
        });

        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Server error");
    }
  } else {
    res.status(401).json({ Error: "Invalid original url" });
  }
});

module.exports = router;
