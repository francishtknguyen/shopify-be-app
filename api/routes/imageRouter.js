const router = require("express").Router();
const { getFileStream, uploadFile } = require("../services/s3");

const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/", (req, res) => {
  // Get all images
  res.end("image route");
});
router.get("/:username", (req, res) => {
  // Get all images
  res.end("image route");
});

router.get("/:key", (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  const readStream = getFileStream(key);
  readStream.pipe(res);
});

router.post("/", upload.array("image", 10), async (req, res) => {
  const files = await req.files;
  console.log(files);
  const complete = [];
  files.forEach(async (file) => {
    const result = await uploadFile(file);
    complete.push(result);
    await unlinkFile(file.path);
    // Add to db
  });
  res.send(complete);
});

module.exports = router;
