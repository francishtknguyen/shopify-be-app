const router = require("express").Router();
const { getFileStream, uploadFile } = require("../services/s3");

const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.get("/", (req, res) => {
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
  files.forEach(async (file) => {
    const result = await uploadFile(file);
    console.log(result);
    await unlinkFile(file.path);
  });
  // const description = req.body.description;
  // res.send({ imagePath: `/images/${result.Key}` });
});

module.exports = router;
