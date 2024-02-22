const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./db");
const Image = require("./schema");

const PORT = 4000;

app.use(express.json());

app.use(cors({ origin: "http://localhost:80" }));

const avatarsStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads", "avatars"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const apartmentsStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "uploads", "apartments"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadAvatar = multer({ storage: avatarsStorage }).single("avatar"); // Allow single upload for avatars
const uploadApartmentImages = multer({ storage: apartmentsStorage }).array(
  "images",
  5
); // Allow multiple uploads for apartment images (up to 5 images)

app.post("/upload/avatar", (req, res) => {
 uploadAvatar(req, res, async (err) => {
    if (err) {
      return res.json(500).send(err.message);
    }

    const image = await Image.create({
      filename:req.file.filename,
      path:req.file.path
    })
    res.send(image);

  });
});

app.post("/upload/apartment", (req, res) => {
  uploadApartmentImages(req, res, (err) => {
    if (err) {
      return res.json(500).send(err.message);
    }

    let image;
    const uploadedFiles = req.files.map(async (file) => (
      image = await Image.create({
        filename:file.filename,
        path:req.file.path
      })
    ));

    res.send(uploadedFiles);
  });
});

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`File server listening on port ${PORT}`);
  });
}

start();
