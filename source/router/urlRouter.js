const { Router } = require("express");
const UrlModel = require("../models/urlModel");

const router = Router();

router.get("/:shortenedUrl", async (req, res) => {
  const param = req.params.shortenedUrl;
  const targetUrl = await UrlModel.findOne({ shortenedUrl: param });
  if (!targetUrl) {
    return res.status(404).json({
      message: "Corresponding redirect not found",
    });
  }
  res.status(200).redirect(targetUrl.url);
});

module.exports = router;
